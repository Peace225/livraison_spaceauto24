import { createClient } from '@/lib/supabase/server';
import { DeliveryMissionManager } from '../dmm';
import type { MissionStatus } from '@/types';

/**
 * REQ-WFE-002: Toutes les transitions sont validées avant d'être exécutées.
 * Définition stricte de la machine à états de Delivery V1.
 */
const ALLOWED_TRANSITIONS: Record<MissionStatus, MissionStatus[]> = {
  'MISSION_CREATED': ['WAITING_PARTNER', 'MISSION_CANCELLED'],
  'WAITING_PARTNER': ['PARTNER_ACCEPTED', 'PARTNER_TIMEOUT', 'MISSION_CANCELLED'],
  'PARTNER_ACCEPTED': ['WAITING_DRIVER', 'PARTNER_REJECTED'],
  'WAITING_DRIVER': ['DRIVER_ASSIGNED', 'PARTNER_TIMEOUT'],
  'DRIVER_ASSIGNED': ['DRIVER_EN_ROUTE_VENDOR', 'DRIVER_REJECTED'],
  'DRIVER_EN_ROUTE_VENDOR': ['PACKAGE_PICKED_UP', 'PACKAGE_NOT_READY', 'MISSION_CANCELLED'],
  'PACKAGE_PICKED_UP': ['DRIVER_EN_ROUTE_CUSTOMER', 'PACKAGE_DAMAGED'],
  'DRIVER_EN_ROUTE_CUSTOMER': ['DELIVERED', 'CUSTOMER_ABSENT', 'ADDRESS_NOT_FOUND', 'DELIVERY_FAILED'],
  'DELIVERED': ['CUSTOMER_CONFIRMED', 'CUSTOMER_REFUSED'],
  'CUSTOMER_CONFIRMED': ['MISSION_COMPLETED'],
  'MISSION_COMPLETED': [], // État final
  'MISSION_CANCELLED': [], // État final
  'DELIVERY_FAILED': [], // État final
};

export class WorkflowEngine {
  /**
   * REQ-WFE-001: Aucun changement d'état ne peut contourner le Workflow Engine.
   * Traite un événement métier et exécute la transition si elle est valide.
   */
  static async processTransition(
    missionId: string,
    targetStatus: MissionStatus,
    actorType: 'System' | 'SuperAdmin' | 'OPS' | 'Partner' | 'Driver',
    reason?: string
  ): Promise<{ success: boolean; message: string }> {
    const supabase = createClient();

    // 1. Récupération de l'état actuel
    const { data: mission, error } = await supabase
      .from('delivery_missions')
      .select('Status')
      .eq('MissionID', missionId)
      .single();

    if (error || !mission) {
      return { success: false, message: 'Mission introuvable pour le Workflow Engine.' };
    }

    const currentStatus = mission.Status as MissionStatus;

    // 2. Vérification de la transition (Pas de saut d'état autorisé)[cite: 1]
    const allowedTargets = ALLOWED_TRANSITIONS[currentStatus] || [];
    if (!allowedTargets.includes(targetStatus)) {
      
      // REQ-WFE-003: Une transition refusée est enregistrée dans le journal[cite: 1].
      await supabase.from('delivery_audit_logs').insert({
        Module: 'WorkflowEngine',
        Action: 'TRANSITION_DENIED',
        Entity: 'Mission',
        EntityID: missionId,
        OldValue: currentStatus,
        NewValue: targetStatus,
        Reason: `Transition non autorisée par la machine à états depuis ${currentStatus}.`
      });

      return { 
        success: false, 
        message: `Impossible de terminer cette action. La transition de ${currentStatus} vers ${targetStatus} est interdite.`[cite: 1]
      };
    }

    // 3. Exécution de la transition via le Delivery Mission Manager (DMM)[cite: 1]
    const updateResult = await DeliveryMissionManager.updateMissionStatus(
      missionId,
      targetStatus,
      actorType,
      reason
    );

    if (!updateResult.success) {
      return updateResult;
    }

    // 4. Déclenchement des processus asynchrones (Event Bus simulé)[cite: 1]
    await this.triggerPostTransitionEvents(missionId, currentStatus, targetStatus);

    return { success: true, message: `Transition vers ${targetStatus} validée et exécutée.` };
  }

  /**
   * REQ-WFE-004: Les notifications sont déclenchées uniquement après validation de la transition[cite: 1].
   */
  private static async triggerPostTransitionEvents(
    missionId: string,
    oldStatus: string,
    newStatus: string
  ) {
    const supabase = createClient();

    // Mise à jour de la Timeline fonctionnelle (Mission Timeline)[cite: 1]
    await supabase.from('delivery_timelines').insert({
      MissionID: missionId,
      Event: `Changement de statut vers ${newStatus}`,
      OldStatus: oldStatus,
      NewStatus: newStatus,
      Actor: 'Workflow Engine'
    });

    // Exemple de routage des actions collatérales en fonction du nouveau statut
    switch (newStatus) {
      case 'PARTNER_ACCEPTED':
        // Notifier l'OPS et le Partenaire, préparer le SLA Engine pour l'affectation livreur[cite: 1]
        console.log(`[Event] PARTNER_ACCEPTED: Notification envoyée, attente livreur.`);
        break;

      case 'PACKAGE_PICKED_UP':
        // Informer le Client + Marketplace que le colis est récupéré[cite: 1]
        console.log(`[Event] PACKAGE_PICKED_UP: Notification Client et Marketplace déclenchée.`);
        break;

      case 'CUSTOMER_CONFIRMED':
        // OTP Validé, la Marketplace est notifiée, clôture de la mission[cite: 1]
        console.log(`[Event] CUSTOMER_CONFIRMED: Envoi de la confirmation de paiement à Marketplace.`);
        break;

      case 'DELIVERY_FAILED':
      case 'PACKAGE_DAMAGED':
      case 'CUSTOMER_ABSENT':
        // Toute anomalie crée automatiquement une entrée dans l'OPS Queue[cite: 1]
        await supabase.from('ops_queue').insert({
          Type: newStatus,
          MissionID: missionId,
          Priority: newStatus === 'PACKAGE_DAMAGED' ? 'Critique' : 'Haute',
          Status: 'À traiter'
        });
        break;
    }
    
    // Recalcul du Delivery Health Score (DHS) après un changement significatif[cite: 1]
    // await HealthScoreService.recalculate();
  }
}