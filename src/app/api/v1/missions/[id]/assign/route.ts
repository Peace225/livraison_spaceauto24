import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { WorkflowEngine } from '@/modules/workflow-engine';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient();
    const missionId = params.id;
    const body = await request.json();
    
    const { driverId } = body;

    if (!driverId) {
      return NextResponse.json({ 
        success: false, 
        error: { message: 'L\'ID du livreur (driverId) est requis pour l\'assignation.' } 
      }, { status: 400 });
    }

    // 1. Vérifier l'existence et la disponibilité du livreur
    const { data: driver, error: driverError } = await supabase
      .from('delivery_drivers')
      .select('Availability')
      .eq('DriverID', driverId)
      .single();

    if (driverError || !driver) {
      return NextResponse.json({ 
        success: false, 
        error: { message: 'Livreur introuvable dans la base de données.' } 
      }, { status: 404 });
    }

    if (driver.Availability !== 'Disponible' && driver.Availability !== 'En ligne') {
      return NextResponse.json({ 
        success: false, 
        error: { message: 'Ce livreur n\'est actuellement pas disponible pour une nouvelle mission.' } 
      }, { status: 400 });
    }

    // 2. Affecter physiquement le livreur à la mission dans Supabase
    const { error: updateError } = await supabase
      .from('delivery_missions')
      .update({ DriverID: driverId })
      .eq('MissionID', missionId);

    if (updateError) {
      return NextResponse.json({ 
        success: false, 
        error: { message: 'Erreur SQL lors de l\'affectation du livreur à la mission.' } 
      }, { status: 500 });
    }

    // 3. Valider la transition d'état avec le Workflow Engine
    // On passe du statut WAITING_DRIVER (ou PARTNER_ACCEPTED) à DRIVER_ASSIGNED
    const transitionResult = await WorkflowEngine.processTransition(
      missionId,
      'DRIVER_ASSIGNED',
      'Partner',
      `Le partenaire a manuellement assigné la mission au livreur ${driverId}`
    );

    if (!transitionResult.success) {
      return NextResponse.json({ 
        success: false, 
        error: { message: transitionResult.message } 
      }, { status: 400 });
    }

    // 4. Mettre à jour le statut du livreur pour éviter les doubles assignations
    await supabase
      .from('delivery_drivers')
      .update({ Availability: 'En mission' })
      .eq('DriverID', driverId);

    return NextResponse.json({
      success: true,
      message: 'Mission assignée avec succès. Le livreur recevra une notification sur son application.',
      data: { status: 'DRIVER_ASSIGNED', driverId }
    });

  } catch (error: any) {
    console.error('Erreur API Assignation Livreur:', error);
    return NextResponse.json({ 
      success: false, 
      error: { message: 'Erreur interne du serveur lors de l\'assignation.' } 
    }, { status: 500 });
  }
}