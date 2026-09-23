'use client';

import { useState } from 'react';
import { 
  Activity, 
  ListTodo, 
  AlertOctagon, 
  Clock, 
  Truck, 
  Users, 
  Package,
  ShieldAlert
} from 'lucide-react';

type OpsTab = 'dashboard' | 'queue';

export default function OpsDashboardPage() {
  const [activeTab, setActiveTab] = useState<OpsTab>('dashboard');

  return (
    <div className="space-y-6">
      {/* Navigation entre Supervision globale et File d'attente (OPS Queue)[cite: 1] */}
      <div className="flex space-x-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`pb-4 px-2 text-sm font-semibold flex items-center space-x-2 transition-colors ${
            activeTab === 'dashboard' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Activity className="w-5 h-5" />
          <span>Tableau de Bord OPS</span>
        </button>
        <button
          onClick={() => setActiveTab('queue')}
          className={`pb-4 px-2 text-sm font-semibold flex items-center space-x-2 transition-colors relative ${
            activeTab === 'queue' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <ListTodo className="w-5 h-5" />
          <span>OPS Queue (File d'attente)</span>
          <span className="ml-2 bg-red-100 text-red-600 py-0.5 px-2 rounded-full text-xs">
            3 critiques
          </span>
        </button>
      </div>

      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Panneaux d'affichage du Tableau de bord OPS[cite: 1] */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center space-x-3 mb-4 text-gray-700">
                <Package className="w-5 h-5" />
                <h3 className="font-semibold">Missions</h3>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between"><span className="text-gray-500">En attente</span><span className="font-bold">12</span></li>
                <li className="flex justify-between"><span className="text-gray-500">En cours</span><span className="font-bold">45</span></li>
                <li className="flex justify-between"><span className="text-gray-500">Terminées (Auj.)</span><span className="font-bold text-green-600">128</span></li>
              </ul>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center space-x-3 mb-4 text-gray-700">
                <Users className="w-5 h-5" />
                <h3 className="font-semibold">Partenaires</h3>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between"><span className="text-gray-500">Disponibles</span><span className="font-bold">8</span></li>
                <li className="flex justify-between"><span className="text-gray-500">Saturés</span><span className="font-bold text-orange-500">2</span></li>
                <li className="flex justify-between"><span className="text-gray-500">Fermés</span><span className="font-bold text-gray-400">1</span></li>
              </ul>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-red-50">
              <div className="flex items-center space-x-3 mb-4 text-red-700">
                <AlertOctagon className="w-5 h-5" />
                <h3 className="font-semibold">Incidents</h3>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between"><span className="text-gray-500">Ouverts</span><span className="font-bold">5</span></li>
                <li className="flex justify-between"><span className="text-gray-500">Critiques</span><span className="font-bold text-red-600">2</span></li>
                <li className="flex justify-between"><span className="text-gray-500">Résolus (Auj.)</span><span className="font-bold text-green-600">8</span></li>
              </ul>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-orange-50">
              <div className="flex items-center space-x-3 mb-4 text-orange-700">
                <Clock className="w-5 h-5" />
                <h3 className="font-semibold">Alertes SLA</h3>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between"><span className="text-gray-500">Préparation dépassée</span><span className="font-bold text-orange-600">3</span></li>
                <li className="flex justify-between"><span className="text-gray-500">Partenaire sans réponse</span><span className="font-bold">1</span></li>
                <li className="flex justify-between"><span className="text-gray-500">Livraison en retard</span><span className="font-bold text-red-600">1</span></li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'queue' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* En-tête de la file d'attente[cite: 1] */}
          <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
            <h2 className="font-semibold text-gray-800">Tâches en attente de traitement</h2>
            <div className="flex space-x-3 text-sm">
              <span className="px-2 py-1 bg-red-100 text-red-700 rounded-md font-medium">Critiques: 3</span>
              <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-md font-medium">Hautes: 7</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md font-medium">Moyennes: 11</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-white border-b">
                <tr>
                  <th className="px-6 py-4">Priorité</th>
                  <th className="px-6 py-4">Type d'alerte</th>
                  <th className="px-6 py-4">Mission / Contexte</th>
                  <th className="px-6 py-4">Temps écoulé</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {/* Exemple de tâche critique remontée par le système[cite: 1] */}
                <tr className="bg-red-50/30 hover:bg-red-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center space-x-1 text-red-700 font-bold">
                      <ShieldAlert className="w-4 h-4" />
                      <span>CRITIQUE</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    Mission refusée plusieurs fois
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-900 font-semibold">DLV-000542</div>
                    <div className="text-gray-500 text-xs">Retrait: Cocody / Livraison: Marcory</div>
                  </td>
                  <td className="px-6 py-4 font-medium text-red-600">
                    14 min
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                      Prendre en charge
                    </button>
                  </td>
                </tr>

                {/* Exemple d'alerte SLA[cite: 1] */}
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-orange-600 font-bold">HAUTE</span>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    Partenaire sans réponse (SLA)
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-900 font-semibold">DLV-000588</div>
                    <div className="text-gray-500 text-xs">Partenaire: Transport Express CI</div>
                  </td>
                  <td className="px-6 py-4 font-medium text-orange-600">
                    5 min
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                      Prendre en charge
                    </button>
                  </td>
                </tr>

                {/* Exemple de tâche de validation partenaire[cite: 1] */}
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-blue-600 font-bold">MOYENNE</span>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    Validation Nouveau Partenaire
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-900 font-semibold">Logistique Pro Abidjan</div>
                    <div className="text-gray-500 text-xs">Dossier complet en attente</div>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-600">
                    2 heures
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                      Prendre en charge
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}