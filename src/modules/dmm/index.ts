import { createClient } from '@/lib/supabase/server';
import { DispatcherService } from '../dispatcher';
import type { Mission, MissionStatus } from '@/types';

// Payload d'une Delivery Request provenant de la Marketplace (Chapitre 21)[cite: 1]
export interface DeliveryRequest {
  orderId: string;
  vendorId: string;
  customerId: string;
  pickupZoneId: string;
  deliveryZoneId: string;
  packageCount: number;
  totalWeight: number;
  totalVolume: number;
  fragile: boolean;
  priority: 'Faible' | 'Moyenne' | 'Haute' | 'Critique';
}

export class DeliveryMissionManager {
  /**
   * Crée une nouvelle mission à partir d'une requête de la Marketplace[cite: 1].
   */
  static async createMission(request: DeliveryRequest): Promise<{ success: boolean; missionId?: string; message: string }> {
    const supabase = createClient();

    // 1. Création de la mission dans la base de données[cite: 1]
    const { data: mission, error: insertError } = await supabase
      .from('delivery_missions')
      .insert({
        OrderID: request.orderId,
        VendorID: request.vendorId,
        CustomerID: request.customerId,
        PickupZoneID: request.pickupZoneId,
        DeliveryZoneID: request.deliveryZoneId,
        Status: 'MISSION_CREATED',
        Priority: request.priority,
        PackageCount: request.packageCount,
        TotalWeight: request.totalWeight,
        TotalVolume: request.totalVolume,
        Fragile: request.fragile,
      })
      .select()
      .single();

    if (insertError || !mission) {
      return { success: false, message: `Erreur création mission: ${insertError?.message}` };
    }

    // 2. Historisation officielle de la création[cite: 1]
    await supabase.from('delivery_status_history').insert({
      MissionID: mission.MissionID,
      PreviousStatus: null,
      NewStatus: 'MISSION_CREATED',
      ChangedByType: 'System',
      Reason: 'Mission créée suite à une Delivery Request de la Marketplace'
    });

    // 3. Envoi automatique au Dispatcher pour trouver un partenaire[cite: 1]
    // En V1, le Dispatcher est appelé immédiatement après la création[cite: 1].
    await DispatcherService.dispatchMission(mission.MissionID);

    return { 
      success: true, 
      missionId: mission.MissionID, 
      message: 'Mission créée et envoyée au Dispatcher.' 
    };
  }

  /**
   * Met à jour le statut d'une mission après validation du Workflow Engine[cite: 1].
   */
  static async updateMissionStatus(
    missionId: string, 
    newStatus: MissionStatus, 
    actorType: 'System' | 'SuperAdmin' | 'OPS' | 'Partner' | 'Driver', 
    reason?: string
  ): Promise<{ success: boolean; message: string }> {
    const supabase = createClient();

    // Récupérer le statut actuel pour l'historique
    const { data: currentMission, error: fetchError } = await supabase
      .from('delivery_missions')
      .select('Status')
      .eq('MissionID', missionId)
      .single();

    if (fetchError || !currentMission) {
      return { success: false, message: 'Mission introuvable.' };
    }

    // 1. Mise à jour de la mission[cite: 1]
    const { error: updateError } = await supabase
      .from('delivery_missions')
      .update({ 
        Status: newStatus,
        UpdatedAt: new Date().toISOString(),
        ...(newStatus === 'MISSION_COMPLETED' ? { CompletedAt: new Date().toISOString() } : {})
      })
      .eq('MissionID', missionId);

    if (updateError) {
      return { success: false, message: 'Erreur lors de la mise à jour.' };
    }

    // 2. Historisation dans le Status History (Niveau 2 de traçabilité)[cite: 1]
    await supabase.from('delivery_status_history').insert({
      MissionID: missionId,
      PreviousStatus: currentMission.Status,
      NewStatus: newStatus,
      ChangedByType: actorType,
      Reason: reason || `Transition vers ${newStatus}`
    });

    return { success: true, message: 'Statut mis à jour avec succès.' };
  }

  /**
   * Annule une mission (Uniquement possible avant affectation définitive ou par l'OPS)[cite: 1].
   */
  static async cancelMission(missionId: string, reason: string, actor: 'Marketplace' | 'OPS'): Promise<{ success: boolean; message: string }> {
    return this.updateMissionStatus(missionId, 'MISSION_CANCELLED', actor === 'Marketplace' ? 'System' : 'OPS', reason);
  }
}