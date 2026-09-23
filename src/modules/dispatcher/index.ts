import { createClient } from '@/lib/supabase/server';
import type { Mission, Partner } from '@/types';

export class DispatcherService {
  /**
   * Recherche le meilleur partenaire éligible pour une mission donnée.
   * Critères V1 : Actif, Validé, Disponible, Couvre la zone, Capacité non atteinte.
   */
  static async findEligiblePartner(pickupZoneId: string): Promise<Partner | null> {
    const supabase = createClient();

    // 1. Récupérer les partenaires couvrant la zone de retrait (via la table de liaison partner_zone)
    const { data: partnersInZone, error: zoneError } = await supabase
      .from('partner_zone')
      .select('PartnerID')
      .eq('ZoneID', pickupZoneId);

    if (zoneError || !partnersInZone || partnersInZone.length === 0) {
      return null;
    }

    const partnerIds = partnersInZone.map(pz => pz.PartnerID);

    // 2. Filtrer selon les règles d'éligibilité strictes
    const { data: eligiblePartners, error: partnerError } = await supabase
      .from('delivery_partners')
      .select('*')
      .in('PartnerID', partnerIds)
      .eq('Status', 'Validé')
      .eq('AvailabilityStatus', 'Disponible')
      .filter('CurrentLoad', 'lt', 'Capacity'); // Capacité opérationnelle non saturée[cite: 1]

    if (partnerError || !eligiblePartners || eligiblePartners.length === 0) {
      return null;
    }

    // 3. Modèle de rotation (V1) : on privilégie le partenaire ayant le plus de marge sur sa capacité[cite: 1]
    const sortedPartners = eligiblePartners.sort((a, b) => {
      const marginA = a.Capacity - a.CurrentLoad;
      const marginB = b.Capacity - b.CurrentLoad;
      return marginB - marginA; // Ordre décroissant de la marge
    });

    return sortedPartners[0] as Partner;
  }

  /**
   * Tente d'attribuer une mission en attente à un partenaire.
   */
  static async dispatchMission(missionId: string): Promise<{ success: boolean; message: string }> {
    const supabase = createClient();

    // 1. Récupération de la mission
    const { data: mission, error: fetchError } = await supabase
      .from('delivery_missions')
      .select('*')
      .eq('MissionID', missionId)
      .single();

    if (fetchError || !mission) {
      return { success: false, message: 'Mission introuvable.' };
    }

    if (mission.Status !== 'MISSION_CREATED' && mission.Status !== 'PARTNER_TIMEOUT') {
      return { success: false, message: 'La mission n\'est pas dans un état éligible pour le dispatch.' };
    }

    // 2. Recherche du partenaire
    const partner = await this.findEligiblePartner(mission.PickupZoneID);

    if (!partner) {
      // Aucun partenaire trouvé, création d'une alerte dans l'OPS Queue[cite: 1]
      await supabase.from('ops_queue').insert({
        Type: 'Mission sans partenaire',
        MissionID: missionId,
        Priority: 'Haute',
        Status: 'À traiter'
      });
      return { success: false, message: 'Aucun partenaire éligible trouvé. Alerte OPS générée.' };
    }

    // 3. Proposition de la mission au partenaire
    const { error: updateError } = await supabase
      .from('delivery_missions')
      .update({
        Status: 'WAITING_PARTNER',
        PartnerID: partner.PartnerID,
        UpdatedAt: new Date().toISOString()
      })
      .eq('MissionID', missionId);

    if (updateError) {
      return { success: false, message: 'Erreur lors de la mise à jour de la mission.' };
    }

    // 4. Historisation officielle[cite: 1]
    await supabase.from('delivery_status_history').insert({
      MissionID: missionId,
      PreviousStatus: mission.Status,
      NewStatus: 'WAITING_PARTNER',
      ChangedByType: 'System',
      Reason: `Mission proposée au partenaire ${partner.CompanyName}`
    });

    // 5. Déclenchement de la notification (via trigger Supabase ou appel au Notification Service)[cite: 1]
    // TODO: NotificationService.notifyPartner(partner.PartnerID, missionId);

    return { success: true, message: `Mission proposée avec succès au partenaire ${partner.PartnerID}.` };
  }
}