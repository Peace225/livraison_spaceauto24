import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const supabase = createClient();
  const body = await request.json();

  // 1. Validation des données issues du contrat d'intégration (Chapitre 21)
  const {
    orderId,
    vendorId,
    customerId,
    pickupZoneId,
    deliveryZoneId,
    packageCount,
    totalWeight,
    totalVolume,
    fragile,
    priority
  } = body;

  if (!orderId || !vendorId || !customerId || !pickupZoneId || !deliveryZoneId) {
    return NextResponse.json({
      success: false,
      error: { code: 'INVALID_DELIVERY_REQUEST', message: 'Paramètres obligatoires manquants pour la création de la mission.' }
    }, { status: 400 });
  }

  // 2. Création de la mission via le Delivery Mission Manager (DMM)
  const { data: mission, error: insertError } = await supabase
    .from('delivery_missions')
    .insert({
      OrderID: orderId,
      VendorID: vendorId,
      CustomerID: customerId,
      PickupZoneID: pickupZoneId,
      DeliveryZoneID: deliveryZoneId,
      Status: 'MISSION_CREATED',
      Priority: priority || 'Moyenne',
      PackageCount: packageCount || 1,
      TotalWeight: totalWeight || 0,
      TotalVolume: totalVolume || 0,
      Fragile: fragile || false,
    })
    .select()
    .single();

  if (insertError) {
    return NextResponse.json({
      success: false,
      error: { code: 'DATABASE_ERROR', message: insertError.message }
    }, { status: 500 });
  }

  // 3. Enregistrement initial dans le Status History (Chapitre 20)
  await supabase
    .from('delivery_status_history')
    .insert({
      MissionID: mission.MissionID,
      PreviousStatus: null,
      NewStatus: 'MISSION_CREATED',
      ChangedByType: 'System',
      Reason: 'Réception de la Delivery Request de la Marketplace'
    });

  return NextResponse.json({
    success: true,
    message: 'Mission de livraison créée avec succès',
    data: {
      missionId: mission.MissionID,
      orderId: mission.OrderID,
      status: mission.Status,
      createdAt: mission.CreatedAt
    }
  }, { status: 201 });
}