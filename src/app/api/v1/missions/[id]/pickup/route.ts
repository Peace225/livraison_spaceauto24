import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createClient();
  const missionId = params.id;

  // 1. Récupérer l'état actuel de la mission
  const { data: mission, error: fetchError } = await supabase
    .from('delivery_missions')
    .select('Status')
    .eq('MissionID', missionId)
    .single();

  if (fetchError || !mission) {
    return NextResponse.json({
      success: false,
      error: { code: 'MISSION_NOT_FOUND', message: 'Mission introuvable' }
    }, { status: 404 });
  }

  // 2. Validation stricte de la machine à états (Le Workflow Engine)
  if (mission.Status !== 'DRIVER_EN_ROUTE_VENDOR') {
    return NextResponse.json({
      success: false,
      error: { 
        code: 'INVALID_TRANSITION', 
        message: 'Impossible de valider la récupération. Le livreur doit être en route vers le vendeur.' 
      }
    }, { status: 400 });
  }

  // 3. Passage au statut de récupération du colis
  const { error: updateError } = await supabase
    .from('delivery_missions')
    .update({ 
      Status: 'PACKAGE_PICKED_UP',
      UpdatedAt: new Date().toISOString()
    })
    .eq('MissionID', missionId);

  if (updateError) throw updateError;

  // 4. Traçabilité officielle (Status History)
  await supabase
    .from('delivery_status_history')
    .insert({
      MissionID: missionId,
      PreviousStatus: 'DRIVER_EN_ROUTE_VENDOR',
      NewStatus: 'PACKAGE_PICKED_UP',
      ChangedByType: 'Driver',
      Reason: 'Colis vérifié et récupéré auprès du vendeur'
    });

  return NextResponse.json({
    success: true,
    message: 'Colis récupéré avec succès. En route vers le client.',
    data: { missionId, newStatus: 'PACKAGE_PICKED_UP' }
  });
}