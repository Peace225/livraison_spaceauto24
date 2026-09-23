import { createClient } from '@/lib/supabase/server';
import { DispatcherService } from '../dispatcher';

export class SLAEngine {
  /**
   * Fonction principale exécutée par un Cron Job (ex: toutes les minutes).
   * Elle scanne les missions pour détecter les dépassements de délais.
   */
  static async checkDeadlines() {
    console.log('SLA Engine: Vérification des délais en cours...');
    
    await this.checkPartnerTimeouts();
    await this.checkDeliveryDelays();
  }

  /**
   * Vérifie si des partenaires n'ont pas répondu dans le délai imparti (ex: 3 minutes).
   */
  private static async checkPartnerTimeouts() {
    const supabase = createClient();
    
    // Récupérer le délai configuré (par défaut 3 minutes)
    const timeoutMinutes = 3; 
    const timeLimit = new Date(Date.now() - timeoutMinutes * 60000).toISOString();

    // Chercher les missions en WAITING_PARTNER dont l'heure de mise à jour est antérieure à la limite
    const { data: expiredMissions, error } = await supabase
      .from('delivery_missions')
      .select('MissionID, PartnerID')
      .eq('Status', 'WAITING_PARTNER')
      .lte('UpdatedAt', timeLimit);

    if (error || !expiredMissions) return;

    for (const mission of expiredMissions) {
      // 1. Passer la mission en statut PARTNER_TIMEOUT[cite: 1]
      await supabase
        .from('delivery_missions')
        .update({ 
          Status: 'PARTNER_TIMEOUT',
          UpdatedAt: new Date().toISOString()
        })
        .eq('MissionID', mission.MissionID);

      // 2. Historiser l'événement[cite: 1]
      await supabase.from('delivery_status_history').insert({
        MissionID: mission.MissionID,
        PreviousStatus: 'WAITING_PARTNER',
        NewStatus: 'PARTNER_TIMEOUT',
        ChangedByType: 'System',
        Reason: `Le partenaire ${mission.PartnerID} n'a pas répondu dans les ${timeoutMinutes} minutes.`
      });

      // 3. Relancer le Dispatcher pour trouver un autre partenaire automatiquement[cite: 1]
      await DispatcherService.dispatchMission(mission.MissionID);
    }
  }

  /**
   * Vérifie si des livraisons en cours dépassent le temps maximum prévu[cite: 1].
   */
  private static async checkDeliveryDelays() {
    const supabase = createClient();
    
    // Exemple : 60 minutes pour la livraison après récupération du colis[cite: 1]
    const maxDeliveryMinutes = 60;
    const timeLimit = new Date(Date.now() - maxDeliveryMinutes * 60000).toISOString();

    const { data: delayedMissions, error } = await supabase
      .from('delivery_missions')
      .select('MissionID')
      .eq('Status', 'DRIVER_EN_ROUTE_CUSTOMER')
      .lte('UpdatedAt', timeLimit);

    if (error || !delayedMissions) return;

    for (const mission of delayedMissions) {
      // Vérifier si une alerte existe déjà pour éviter les doublons
      const { data: existingAlert } = await supabase
        .from('ops_queue')
        .select('QueueID')
        .eq('MissionID', mission.MissionID)
        .eq('Type', 'Livraison en retard')
        .eq('Status', 'À traiter')
        .single();

      if (!existingAlert) {
        // Créer une alerte SLA dans l'OPS Queue[cite: 1]
        await supabase.from('ops_queue').insert({
          Type: 'Livraison en retard',
          MissionID: mission.MissionID,
          Priority: 'Haute',
          Status: 'À traiter'
        });
      }
    }
  }
}