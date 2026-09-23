import React from 'react';
import { MapPin, Package, Clock } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import type { Mission } from '@/types';

interface MissionCardProps {
  mission: Mission;
  onActionClick?: (missionId: string) => void;
  actionLabel?: string;
}

export function MissionCard({ mission, onActionClick, actionLabel }: MissionCardProps) {
  const isUrgent = mission.Priority === 'Critique' || mission.Priority === 'Haute';

  return (
    <div className={`bg-white rounded-xl shadow-sm border p-5 transition-colors ${
      isUrgent ? 'border-red-200' : 'border-gray-100 hover:border-blue-200'
    }`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <StatusBadge status={mission.Status} />
          <h3 className="text-lg font-bold text-gray-900 mt-2">{mission.MissionID}</h3>
        </div>
        {isUrgent && (
          <span className="bg-red-50 text-red-600 px-3 py-1 rounded-lg text-xs font-bold uppercase">
            {mission.Priority}
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 bg-gray-50 p-3 rounded-lg">
        <div>
          <p className="text-xs text-gray-500 uppercase font-semibold flex items-center mb-1">
            <MapPin className="w-3 h-3 mr-1" /> Retrait
          </p>
          <p className="font-medium text-gray-900 text-sm">{mission.PickupZoneID}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase font-semibold flex items-center mb-1">
            <MapPin className="w-3 h-3 mr-1" /> Livraison
          </p>
          <p className="font-medium text-gray-900 text-sm">{mission.DeliveryZoneID}</p>
        </div>
      </div>

      <div className="flex justify-between items-center text-sm text-gray-600 mb-5">
        <div className="flex items-center space-x-1">
          <Package className="w-4 h-4" />
          <span>{mission.PackageCount} colis ({mission.TotalWeight}kg)</span>
        </div>
        <div className="flex items-center space-x-1">
          <Clock className="w-4 h-4" />
          <span>Créée à {new Date(mission.CreatedAt).toLocaleTimeString('fr-CI', { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>

      {onActionClick && actionLabel && (
        <button 
          onClick={() => onActionClick(mission.MissionID)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-semibold transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}