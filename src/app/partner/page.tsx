'use client';

import { useState } from 'react';
import { Package, Truck, Clock, CheckCircle, Search, Filter } from 'lucide-react';

type Tab = 'MISSIONS' | 'LIVREURS';

export default function PartnerDashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>('MISSIONS');
  const [searchQuery, setSearchQuery] = useState('');

  const mockMissions = [
    { id: 'DLV-000245', status: 'WAITING_DRIVER', pickup: 'Marcory', delivery: 'Cocody', date: 'Aujourd\'hui, 10:30', priority: 'Haute' },
    { id: 'DLV-000246', status: 'DRIVER_EN_ROUTE_CUSTOMER', pickup: 'Plateau', delivery: 'Treichville', date: 'Aujourd\'hui, 11:15', priority: 'Moyenne' },
    { id: 'DLV-000247', status: 'MISSION_COMPLETED', pickup: 'Yopougon', delivery: 'Abobo', date: 'Hier, 16:45', priority: 'Faible' },
  ];

  const mockDrivers = [
    { id: 'DRV-01', name: 'Moussa K.', phone: '01 02 03 04 05', status: 'Actif', availability: 'En mission', vehicle: 'Moto' },
    { id: 'DRV-02', name: 'Ali B.', phone: '05 06 07 08 09', status: 'Actif', availability: 'Disponible', vehicle: 'Camionnette' },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-8">
      {/* Conteneur principal centré avec une largeur max élégante */}
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* En-tête et Statistiques */}
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Espace Partenaire</h1>
          <p className="text-sm text-slate-500 mt-1">Supervision de vos livraisons et de votre flotte</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center space-x-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Package className="w-6 h-6" /></div>
            <div>
              <p className="text-xs text-slate-500 font-semibold">Missions Actives</p>
              <p className="text-2xl font-black text-slate-900 mt-0.5">12</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center space-x-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><Clock className="w-6 h-6" /></div>
            <div>
              <p className="text-xs text-slate-500 font-semibold">À Assigner</p>
              <p className="text-2xl font-black text-slate-900 mt-0.5">3</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center space-x-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><CheckCircle className="w-6 h-6" /></div>
            <div>
              <p className="text-xs text-slate-500 font-semibold">Terminées (Aujourd'hui)</p>
              <p className="text-2xl font-black text-slate-900 mt-0.5">8</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center space-x-4">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl"><Truck className="w-6 h-6" /></div>
            <div>
              <p className="text-xs text-slate-500 font-semibold">Livreurs en ligne</p>
              <p className="text-2xl font-black text-slate-900 mt-0.5">5/8</p>
            </div>
          </div>
        </div>

        {/* Barre de navigation des onglets et contenu */}
        <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs">
          <div className="flex border-b border-slate-200 bg-slate-50/50">
            <button 
              onClick={() => setActiveTab('MISSIONS')}
              className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-colors ${
                activeTab === 'MISSIONS' ? 'bg-white text-blue-600 border-b-2 border-blue-600 shadow-2xs' : 'text-slate-500 hover:bg-slate-100/50'
              }`}
            >
              Gestion des Missions
            </button>
            <button 
              onClick={() => setActiveTab('LIVREURS')}
              className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-colors ${
                activeTab === 'LIVREURS' ? 'bg-white text-blue-600 border-b-2 border-blue-600 shadow-2xs' : 'text-slate-500 hover:bg-slate-100/50'
              }`}
            >
              Flotte de Livreurs
            </button>
          </div>

          {/* Filtres et Recherche */}
          <div className="p-4 border-b border-slate-100 flex gap-4 bg-white">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder={activeTab === 'MISSIONS' ? "Rechercher un ID de mission..." : "Rechercher un livreur..."}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-slate-50/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors bg-white">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span>Filtrer</span>
            </button>
          </div>

          {/* Contenu de l'onglet actif */}
          <div className="p-0">
            {activeTab === 'MISSIONS' ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="p-4">ID Mission</th>
                    <th className="p-4">Trajet</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Statut</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {mockMissions.map((mission) => (
                    <tr key={mission.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4 font-extrabold text-slate-900">{mission.id}</td>
                      <td className="p-4">
                        <div className="font-semibold text-slate-900">{mission.pickup} → {mission.delivery}</div>
                        {mission.priority === 'Haute' && <span className="text-[10px] text-red-600 font-bold bg-red-50 px-1.5 py-0.5 rounded border border-red-100 inline-block mt-0.5">Urgent</span>}
                      </td>
                      <td className="p-4 text-slate-500">{mission.date}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${
                          mission.status === 'WAITING_DRIVER' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                          mission.status === 'MISSION_COMPLETED' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                          'bg-blue-50 text-blue-700 border-blue-200'
                        }`}>
                          {mission.status.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        {mission.status === 'WAITING_DRIVER' ? (
                          <button className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-2xs">
                            Assigner
                          </button>
                        ) : (
                          <button className="px-4 py-2 text-blue-600 text-xs font-bold hover:underline">
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
                  <tr className="bg-slate-50/80 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="p-4">Livreur</th>
                    <th className="p-4">Contact</th>
                    <th className="p-4">Disponibilité</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {mockDrivers.map((driver) => (
                    <tr key={driver.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4">
                        <div className="font-extrabold text-slate-900">{driver.name}</div>
                        <div className="text-[11px] text-slate-400 font-medium">{driver.id} • {driver.vehicle}</div>
                      </td>
                      <td className="p-4 font-semibold text-slate-600">{driver.phone}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center space-x-1.5 text-xs font-bold ${
                          driver.availability === 'Disponible' ? 'text-emerald-600' : 'text-amber-600'
                        }`}>
                          <span className={`w-2 h-2 rounded-full ${driver.availability === 'Disponible' ? 'bg-emerald-600' : 'bg-amber-500'}`} />
                          <span>{driver.availability}</span>
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button className="px-4 py-2 text-blue-600 text-xs font-bold hover:underline">
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
    </div>
  );
}