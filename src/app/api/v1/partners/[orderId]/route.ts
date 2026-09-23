import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { MissionStatus } from '@/types';

// Dictionnaire de traduction des statuts (Chapitre 24)
const PUBLIC_STATUS_MAP: Record<MissionStatus, string> = {
  'MISSION_CREATED': 'Livraison en préparation',
  'WAITING_PARTNER': 'Livraison en préparation',
  'PARTNER_ACCEPTED': 'Transporteur confirmé',
  'WAITING_DRIVER': 'Transporteur confirmé',
  'DRIVER_ASSIGNED': 'Livreur affecté',
  'DRIVER_EN_ROUTE_VENDOR': 'Livreur arrivé chez le vendeur', // Simplification client
  'PACKAGE_PICKED_UP': 'Colis récupéré',
  'DRIVER_EN_ROUTE_CUSTOMER': 'En cours de livraison',
  'DELIVERED': 'Vérification du produit',
  'CUSTOMER_CONFIRMED': 'Paiement confirmé',
  'MISSION_COMPLETED': 'Livraison terminée',
  'MISSION_CANCELLED': 'Livraison annulée',
  'DELIVERY_FAILED': 'Retour en cours',
  // Traductions grand public pour les nouveaux statuts d'anomalies
  'PARTNER_TIMEOUT': 'Recherche de transporteur',
  'PARTNER_REJECTED': 'Recherche de transporteur',
  'DRIVER_REJECTED': 'Livreur en cours d\'affectation',
  'PACKAGE_NOT_READY': 'Colis en cours de préparation',
  'PACKAGE_DAMAGED': 'Anomalie signalée (Colis endommagé)',
  'CUSTOMER_ABSENT': 'Tentative de livraison (Client absent)',
  'ADDRESS_NOT_FOUND': 'Tentative de livraison (Adresse introuvable)',
  'CUSTOMER_REFUSED': 'Livraison refusée par le client'
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ orderId: string }> } // Correction Next.js 15
) {
  const supabase = createClient();
  
  // Résolution asynchrone
  const resolvedParams = await params;
  const orderId = resolvedParams.orderId;

  // 1. Récupération de la mission et de sa timeline associée
  const { data: mission, error: missionError } = await supabase
    .from('delivery_missions')
    .select(`
      MissionID,
      OrderID,
      Status,
      CreatedAt,
      delivery_status_history (
        NewStatus,
        CreatedAt
      )
    `)
    .eq('OrderID', orderId)
    .single();

  if (missionError || !mission) {
    return NextResponse.json({
      success: false,
      error: { code: 'ORDER_NOT_FOUND', message: 'Commande ou livraison introuvable' }
    }, { status: 404 });
  }

  // 2. Formatage de la timeline publique
  const publicTimeline = (mission.delivery_status_history as any[])
    .map(event => ({
      status: PUBLIC_STATUS_MAP[event.NewStatus as MissionStatus] || event.NewStatus,
      time: new Date(event.CreatedAt).toLocaleTimeString('fr-CI', { hour: '2-digit', minute: '2-digit' })
    }))
    // Déduplication visuelle si plusieurs statuts internes donnent le même statut public
    .filter((event, index, arr) => index === 0 || event.status !== arr[index - 1].status);

  // 3. Format de réponse standardisé
  return NextResponse.json({
    success: true,
    data: {
      order: mission.OrderID,
      delivery: mission.MissionID,
      status: PUBLIC_STATUS_MAP[mission.Status as MissionStatus],
      timeline: publicTimeline
    }
  });
}