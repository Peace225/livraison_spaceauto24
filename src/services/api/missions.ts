import type { MissionStatus } from '@/types';

/**
 * Service utilitaire pour interagir avec l'API des missions depuis le frontend.
 */
export const MissionAPI = {
  /**
   * Accepte une mission (Action du Partenaire)[cite: 1]
   */
  async acceptMission(missionId: string) {
    const response = await fetch(`/api/v1/missions/${missionId}/accept`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    return response.json();
  },

  /**
   * Le livreur déclare avoir récupéré le colis (Action du Livreur)[cite: 1]
   */
  async pickupPackage(missionId: string) {
    const response = await fetch(`/api/v1/missions/${missionId}/pickup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    return response.json();
  },

  /**
   * Validation finale de la livraison avec OTP (Action du Livreur)[cite: 1]
   */
  async validateDelivery(missionId: string, otpCode: string, paymentMethod: string, amount: number) {
    const response = await fetch(`/api/v1/missions/${missionId}/customer-validation`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        otpCode,
        paymentMethod,
        deliveryFeeAmount: amount,
        isProductCompliant: true
      })
    });
    return response.json();
  }
};