'use client';

import { useEffect } from 'react';
import { useCommandCenterStore } from './store';
import { createClient } from '@/lib/supabase/client';
import { Clock, AlertCircle, CheckCircle, Package } from 'lucide-react';
import type { Mission } from '@/types';

export default function CommandCenterPage() {
  const { 
    missions,
    setMissions,
    updateMissionStatus,
    activeMissionsCount, 
    availablePartnersCount, 
    criticalIncidentsCount 
  } = useCommandCenterStore();

  const supabase = createClient();

  useEffect(() => {
    // 1. Chargement initial des données
    const fetchInitialData = async () => {
      const { data, error } = await supabase
        .from('delivery_missions')
        .select('*');
      
      if (!error && data) {
        setMissions(data as Mission[]);
      }
    };

    fetchInitialData();

    // 2. Souscription aux événements en temps réel
    const commandCenterChannel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*', // Écoute INSERT, UPDATE, DELETE
          schema: 'public',
          table: 'delivery_missions',
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newMission = payload.new as Mission;
            setMissions([...useCommandCenterStore.getState().missions, newMission]);
          } 
          else if (payload.eventType === 'UPDATE') {
            const updatedMission = payload.new as Mission;
            updateMissionStatus(updatedMission.MissionID, updatedMission.Status);
          }
        }
      )
      .subscribe();

    // Nettoyage à la destruction du composant
    return () => {
      supabase.removeChannel(commandCenterChannel);
    };
  }, [supabase, setMissions, updateMissionStatus]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Missions Actives</p>
            <p className="text-2xl font-bold text-gray-900">{activeMissionsCount}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="p-3 bg-green-100 text-green-600 rounded-lg">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Partenaires Disponibles</p>
            <p className="text-2xl font-bold text-gray-900">{availablePartnersCount}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-red-100 flex items-center space-x-4">
          <div className="p-3 bg-red-100 text-red-600 rounded-lg">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-red-600">Incidents Critiques</p>
            <p className="text-2xl font-bold text-red-700">{criticalIncidentsCount}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-orange-100 flex items-center space-x-4">
          <div className="p-3 bg-orange-100 text-orange-600 rounded-lg">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-orange-600">Alertes SLA</p>
            <p className="text-2xl font-bold text-orange-700">0</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Missions Récentes (Abidjan & Environs)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                <tr>
                  <th className="px-4 py-3">ID Mission</th>
                  <th className="px-4 py-3">Statut</th>
                  <th className="px-4 py-3">Priorité</th>
                </tr>
              </thead>
              <tbody>
                {missions.slice(-5).reverse().map((mission) => (
                  <tr key={mission.MissionID} className="border-b">
                    <td className="px-4 py-3 font-medium text-gray-900">{mission.MissionID}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-semibold">
                        {mission.Status.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-3">{mission.Priority}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {missions.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Aucune mission active pour le moment.
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">État des Livreurs</h2>
          <div className="space-y-4">
             <div className="flex justify-between items-center text-sm">
               <span className="text-gray-600">Disponibles</span>
               <span className="font-semibold text-green-600">0</span>
             </div>
             <div className="flex justify-between items-center text-sm">
               <span className="text-gray-600">En mission</span>
               <span className="font-semibold text-blue-600">0</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}