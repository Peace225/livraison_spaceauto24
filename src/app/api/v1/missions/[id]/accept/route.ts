import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createClient();
  const missionId = params.id;

  // 1. Récupération de la mission courante
  const { data: mission, error: fetchError } = await supabase
    .from('delivery_missions')
    .select('Status, PartnerID')
    .eq('MissionID', missionId)
    .single();

  if (fetchError || !mission) {
    return NextResponse.json({ success: false, error: { code: 'MISSION_NOT_FOUND', message: 'Mission introuvable' } }, { status: 404 });
  }

  // 2. Vérification des règles métier du Workflow Engine[cite: 1]
  if (mission.Status !== 'WAITING_PARTNER') {
    return NextResponse.json({ 
      success: false, 
      error: { code: 'INVALID_TRANSITION', message: 'La mission ne peut pas être acceptée dans son état actuel.' } 
    }, { status: 400 });
  }

  // 3. Mise à jour du statut (Transaction simulée via RPC ou appels séquentiels)
  const { error: updateError } = await supabase
    .from('delivery_missions')
    .update({ 
      Status: 'PARTNER_ACCEPTED',
      UpdatedAt: new Date().toISOString()
    })
    .eq('MissionID', missionId);

  if (updateError) throw updateError;

  // 4. Enregistrement dans le Status History[cite: 1]
  await supabase
    .from('delivery_status_history')
    .insert({
      MissionID: missionId,
      PreviousStatus: 'WAITING_PARTNER',
      NewStatus: 'PARTNER_ACCEPTED',
      ChangedByType: 'Partner',
      Reason: 'Acceptation standard via Dashboard Partenaire'
    });

  return NextResponse.json({ 
    success: true, 
    message: 'Mission acceptée avec succès',
    data: { missionId, newStatus: 'PARTNER_ACCEPTED' }
  });
}