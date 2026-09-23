import { createClient } from '@/lib/supabase/server';

export class PricingEngine {
  /**
   * Calcule automatiquement le coût de livraison.
   * En V1 : Tarification par zones (Départ -> Arrivée) sans aucun calcul GPS.
   */
  static async calculateDeliveryCost(
    pickupZoneId: string, 
    deliveryZoneId: string, 
    isExpress: boolean = false
  ): Promise<{ success: boolean; price?: number; message?: string }> {
    const supabase = createClient();
    
    // 1. Recherche du tarif croisé dans la grille configurée par le Super Admin
    const { data: tariff, error } = await supabase
      .from('delivery_tariffs')
      .select('BasePrice, ExpressMultiplier')
      .eq('DepartureZoneID', pickupZoneId)
      .eq('ArrivalZoneID', deliveryZoneId)
      .single();

    if (error || !tariff) {
      return { 
        success: false, 
        message: 'Aucun tarif défini pour ce trajet. Zone non couverte.' 
      };
    }

    // 2. Application de la majoration si livraison express
    let finalPrice = tariff.BasePrice;
    if (isExpress && tariff.ExpressMultiplier) {
      finalPrice = Math.round(finalPrice * tariff.ExpressMultiplier);
    }

    return { 
      success: true, 
      price: finalPrice 
    };
  }
}