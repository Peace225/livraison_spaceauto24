import React from 'react';
import type { MissionStatus } from '@/types';

interface StatusBadgeProps {
  status: MissionStatus;
  className?: string;
}

const statusConfig: Record<MissionStatus, { label: string; colorClass: string }> = {
  MISSION_CREATED: { label: 'Créée', colorClass: 'bg-gray-100 text-gray-700' },
  WAITING_PARTNER: { label: 'En attente partenaire', colorClass: 'bg-orange-100 text-orange-700' },
  PARTNER_ACCEPTED: { label: 'Partenaire accepté', colorClass: 'bg-blue-100 text-blue-700' },
  WAITING_DRIVER: { label: 'En attente livreur', colorClass: 'bg-orange-100 text-orange-700' },
  DRIVER_ASSIGNED: { label: 'Livreur affecté', colorClass: 'bg-indigo-100 text-indigo-700' },
  DRIVER_EN_ROUTE_VENDOR: { label: 'En route (Vendeur)', colorClass: 'bg-purple-100 text-purple-700' },
  PACKAGE_PICKED_UP: { label: 'Colis récupéré', colorClass: 'bg-blue-100 text-blue-700' },
  DRIVER_EN_ROUTE_CUSTOMER: { label: 'En livraison', colorClass: 'bg-blue-100 text-blue-700' },
  DELIVERED: { label: 'Livrée (En vérification)', colorClass: 'bg-yellow-100 text-yellow-700' },
  CUSTOMER_CONFIRMED: { label: 'Paiement confirmé', colorClass: 'bg-green-100 text-green-700' },
  MISSION_COMPLETED: { label: 'Terminée', colorClass: 'bg-green-100 text-green-700' },
  MISSION_CANCELLED: { label: 'Annulée', colorClass: 'bg-gray-100 text-gray-500' },
  DELIVERY_FAILED: { label: 'Échouée / Retour', colorClass: 'bg-red-100 text-red-700' },
};

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const config = statusConfig[status] || { label: status, colorClass: 'bg-gray-100 text-gray-700' };

  return (
    <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide ${config.colorClass} ${className}`}>
      {config.label}
    </span>
  );
}