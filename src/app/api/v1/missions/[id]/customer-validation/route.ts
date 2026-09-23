import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { WorkflowEngine } from '@/modules/workflow-engine';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient();
    
    // Dans Next.js 14+, params doit être "awaité" s'il est utilisé dynamiquement, 
    // mais pour cette structure basique, on accède directement à l'ID.
    const missionId = params.id;
    const body = await request.json();
    
    const { otpCode, paymentMethod, deliveryFeeAmount, isProductCompliant } = body;

    // 1. Gestion du refus client (Le client inspecte et refuse le produit)
    if (!isProductCompliant) {
      const transition = await WorkflowEngine.processTransition(
        missionId, 
        'DELIVERY_FAILED', 
        'Driver', 
        'Produit refusé par le client après inspection sur place'
      );
      
      if (!transition.success) {
        return NextResponse.json({ success: false, error: { message: transition.message } }, { status: 400 });
      }

      // Création d'une alerte prioritaire pour le centre OPS (Retour Vendeur)
      await supabase.from('ops_queue').insert({
        Type: 'Refus de livraison',
        MissionID: missionId,
        Priority: 'Haute',
        Status: 'À traiter'
      });

      return NextResponse.json({ 
        success: true, 
        message: 'Produit refusé, procédure de retour initiée.' 
      });
    }

    // 2. Validation du code OTP fourni par la Marketplace
    // En production, ce code est vérifié par un appel sécurisé à l'API Marketplace.
    // Pour le développement (V1), on simule une validation réussie si le code a 6 chiffres.
    if (!otpCode || otpCode.length !== 6) {
      return NextResponse.json({ 
        success: false, 
        error: { message: 'Code OTP invalide. Veuillez vérifier le SMS du client.' } 
      }, { status: 400 });
    }

    // 3. Traçabilité financière (Frais de livraison uniquement)
    // Le livreur déclare avoir encaissé l'argent physique ou mobile money pour la course
    await supabase.from('delivery_timelines').insert({
      MissionID: missionId,
      Event: 'Paiement des frais de livraison confirmé',
      Actor: 'Driver',
      Comment: `Montant encaissé : ${deliveryFeeAmount} FCFA via ${paymentMethod}`
    });

    // 4. Transition d'état stricte via le Workflow Engine
    // On passe à CUSTOMER_CONFIRMED en attendant que la Marketplace valide de son côté le paiement du produit
    const transitionResult = await WorkflowEngine.processTransition(
      missionId, 
      'CUSTOMER_CONFIRMED', 
      'Driver', 
      'Inspection validée et frais de livraison confirmés par le livreur'
    );

    if (!transitionResult.success) {
      return NextResponse.json({ 
        success: false, 
        error: { message: transitionResult.message } 
      }, { status: 400 });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Livraison validée avec succès.',
      data: { status: 'CUSTOMER_CONFIRMED' }
    });

  } catch (error: any) {
    console.error('Erreur API Customer Validation:', error);
    return NextResponse.json({ 
      success: false, 
      error: { message: 'Erreur interne du serveur lors de la validation.' } 
    }, { status: 500 });
  }
}