'use client';

import { useState } from 'react';
import { Package, Truck, Clock, CheckCircle, Search, Filter } from 'lucide-react';

// Types simulés pour l'interface
type Tab = 'MISSIONS' | 'LIVREURS';

export default function PartnerDashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>('MISSIONS');
  const [searchQuery, setSearchQuery] = useState('');

  // Simulation des données provenant de Supabase (table delivery_missions)
  const mockMissions = [
    { id: 'DLV-000245', status: 'WAITING_DRIVER', pickup: 'Marcory', delivery: 'Cocody', date: 'Aujourd\'hui, 10:30', priority: 'Haute' },
    { id: 'DLV-000246', status: 'DRIVER_EN_ROUTE_CUSTOMER', pickup: 'Plateau', delivery: 'Treichville', date: 'Aujourd\'hui, 11:15', priority: 'Moyenne' },
    { id: 'DLV-000247', status: 'MISSION_COMPLETED', pickup: 'Yopougon', delivery: 'Abobo', date: 'Hier, 16:45', priority: 'Faible' },
  ];

  // Simulation des données (table delivery_drivers)
  const mockDrivers = [
    { id: 'DRV-01', name: 'Moussa K.', phone: '01 02 03 04 05', status: 'Actif', availability: 'En mission', vehicle: 'Moto' },
    { id: 'DRV-02', name: 'Ali B.', phone: '05 06 07 08 09', status: 'Actif', availability: 'Disponible', vehicle: 'Camionnette' },
  ];

  return (
    <div className="space-y-6">
      {/* En-tête et Statistiques */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Espace Partenaire</h1>
        <p className="text-sm text-gray-500 mt-1">Supervision de vos livraisons et de votre flotte</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg"><Package className="w-6 h-6" /></div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Missions Actives</p>
            <p className="text-2xl font-black text-gray-900">12</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-orange-50 text-orange-600 rounded-lg"><Clock className="w-6 h-6" /></div>
          <div>
            <p className="text-sm text-gray-500 font-medium">À Assigner</p>
            <p className="text-2xl font-black text-gray-900">3</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-lg"><CheckCircle className="w-6 h-6" /></div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Terminées (Aujourd'hui)</p>
            <p className="text-2xl font-black text-gray-900">8</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-lg"><Truck className="w-6 h-6" /></div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Livreurs en ligne</p>
            <p className="text-2xl font-black text-gray-900">5/8</p>
          </div>
        </div>
      </div>

      {/* Barre de navigation des onglets */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button 
            onClick={() => setActiveTab('MISSIONS')}
            className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors ${
              activeTab === 'MISSIONS' ? 'bg-gray-50 text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            Gestion des Missions
          </button>
          <button 
            onClick={() => setActiveTab('LIVREURS')}
            className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors ${
              activeTab === 'LIVREURS' ? 'bg-gray-50 text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            Flotte de Livreurs
          </button>
        </div>

        {/* Filtres et Recherche */}
        <div className="p-4 border-b border-gray-100 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder={activeTab === 'MISSIONS' ? "Rechercher un ID de mission..." : "Rechercher un livreur..."}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filtrer</span>
          </button>
        </div>

        {/* Contenu de l'onglet actif */}
        <div className="p-0">
          {activeTab === 'MISSIONS' ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase">ID Mission</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Trajet</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Date</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Statut</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {mockMissions.map((mission) => (
                  <tr key={mission.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-bold text-gray-900">{mission.id}</td>
                    <td className="p-4">
                      <div className="text-sm font-medium text-gray-900">{mission.pickup} → {mission.delivery}</div>
                      {mission.priority === 'Haute' && <span className="text-xs text-red-600 font-bold">Urgent</span>}
                    </td>
                    <td className="p-4 text-sm text-gray-500">{mission.date}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide ${
                        mission.status === 'WAITING_DRIVER' ? 'bg-orange-100 text-orange-700' :
                        mission.status === 'MISSION_COMPLETED' ? 'bg-green-100 text-green-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {mission.status.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      {mission.status === 'WAITING_DRIVER' ? (
                        <button className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-colors">
                          Assigner
                        </button>
                      ) : (
                        <button className="px-4 py-2 text-blue-600 text-sm font-bold hover:underline">
                          Détails
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Livreur</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Contact</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Disponibilité</th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {mockDrivers.map((driver) => (
                  <tr key={driver.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-gray-900">{driver.name}</div>
                      <div className="text-xs text-gray-500">{driver.id} • {driver.vehicle}</div>
                    </td>
                    <td className="p-4 text-sm font-medium text-gray-600">{driver.phone}</td>
                    <td className="p-4">
                      <span className={`flex items-center space-x-1 text-sm font-bold ${
                        driver.availability === 'Disponible' ? 'text-green-600' : 'text-orange-600'
                      }`}>
                        <span className={`w-2 h-2 rounded-full ${driver.availability === 'Disponible' ? 'bg-green-600' : 'bg-orange-600'}`} />
                        <span>{driver.availability}</span>
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button className="px-4 py-2 text-blue-600 text-sm font-bold hover:underline">
                        Gérer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}