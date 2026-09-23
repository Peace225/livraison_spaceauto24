import { createClient } from '@/lib/supabase/server';

type NotificationChannel = 'Interne' | 'WhatsApp' | 'SMS' | 'Email';
type RecipientType = 'Partner' | 'Driver' | 'Customer' | 'Vendor' | 'OPS';

interface NotificationPayload {
  missionId: string;
  recipientType: RecipientType;
  recipientId: string;
  channel: NotificationChannel;
  title: string;
  message: string;
}

export class NotificationService {
  /**
   * Envoie une notification et l'enregistre dans l'historique (Chapitre 19.8)[cite: 1].
   */
  static async send(payload: NotificationPayload): Promise<{ success: boolean }> {
    const supabase = createClient();

    // 1. Enregistrement dans la table officielle des notifications[cite: 1]
    const { error } = await supabase.from('delivery_notifications').insert({
      MissionID: payload.missionId,
      RecipientType: payload.recipientType,
      RecipientID: payload.recipientId,
      Channel: payload.channel,
      Title: payload.title,
      Message: payload.message,
      Status: 'Envoyé' // En production, ce serait 'En attente' puis mis à jour via webhook
    });

    if (error) {
      console.error('Erreur lors de l\'enregistrement de la notification:', error.message);
      return { success: false };
    }

    // 2. Routage vers le bon canal d'envoi (Simulation pour la V1)[cite: 1]
    switch (payload.channel) {
      case 'SMS':
        await this.sendSMS(payload.recipientId, payload.message);
        break;
      case 'WhatsApp':
        await this.sendWhatsApp(payload.recipientId, payload.message);
        break;
      case 'Email':
        await this.sendEmail(payload.recipientId, payload.title, payload.message);
        break;
      case 'Interne':
        // Géré automatiquement par Supabase Realtime côté frontend
        break;
    }

    return { success: true };
  }

  // --- Fonctions d'intégration tierces (Stubs) ---

  private static async sendSMS(phone: string, message: string) {
    // Intégration Twilio / Orange API ou autre fournisseur local en Côte d'Ivoire
    console.log(`[SMS envoyé à ${phone}]: ${message}`);
  }

  private static async sendWhatsApp(phone: string, message: string) {
    // Intégration WhatsApp Business API
    console.log(`[WhatsApp envoyé à ${phone}]: ${message}`);
  }

  private static async sendEmail(email: string, subject: string, message: string) {
    // Intégration Resend / SendGrid
    console.log(`[Email envoyé à ${email}] Sujet: ${subject}`);
  }
}