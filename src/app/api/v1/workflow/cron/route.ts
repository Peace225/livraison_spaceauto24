import { NextResponse } from 'next/server';
import { SLAEngine } from '@/modules/sla';

export async function GET(request: Request) {
  // Optionnel : Ajouter une vérification de token d'autorisation (CRON_SECRET) 
  // pour éviter que n'importe qui déclenche le moteur.
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ success: false, message: 'Non autorisé' }, { status: 401 });
  }

  try {
    await SLAEngine.checkDeadlines();
    return NextResponse.json({ success: true, message: 'SLA Engine exécuté avec succès.' });
  } catch (error) {
    console.error('Erreur SLA Engine:', error);
    return NextResponse.json({ success: false, message: 'Erreur lors de l\'exécution du SLA Engine.' }, { status: 500 });
  }
}