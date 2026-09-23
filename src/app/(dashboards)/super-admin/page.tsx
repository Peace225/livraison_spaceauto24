'use client';

import { useState } from 'react';
import { 
  Shield, 
  Map, 
  Users, 
  Settings, 
  Activity, 
  CheckCircle, 
  XCircle, 
  FileText 
} from 'lucide-react';

type AdminTab = 'health' | 'partners' | 'zones' | 'settings';

export default function SuperAdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('health');
  const [healthScore] = useState(96); // Simulation du Delivery Health Score[cite: 1]

  return (
    <div className="space-y-6">
      {/* Navigation Super Admin */}
      <div className="flex space-x-2 border-b border-gray-200 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveTab('health')}
          className={`px-4 py-2 text-sm font-semibold flex items-center space-x-2 rounded-t-lg transition-colors ${
            activeTab === 'health' ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Delivery Health Score</span>
        </button>
        <button
          onClick={() => setActiveTab('partners')}
          className={`px-4 py-2 text-sm font-semibold flex items-center space-x-2 rounded-t-lg transition-colors relative ${
            activeTab === 'partners' ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Validation Partenaires</span>
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <button
          onClick={() => setActiveTab('zones')}
          className={`px-4 py-2 text-sm font-semibold flex items-center space-x-2 rounded-t-lg transition-colors ${
            activeTab === 'zones' ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Map className="w-4 h-4" />
          <span>Zones & Tarifs</span>
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 text-sm font-semibold flex items-center space-x-2 rounded-t-lg transition-colors ${
            activeTab === 'settings' ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Configuration SLA</span>
        </button>
      </div>

      {/* Onglet 1 : Delivery Health Score (DHS)[cite: 1] */}
      {activeTab === 'health' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center flex flex-col items-center justify-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Santé Opérationnelle</h2>
            <div className="relative inline-flex items-center justify-center">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-100" />
                <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={377} strokeDashoffset={377 - (377 * healthScore) / 100} className="text-green-500 transition-all duration-1000" />
              </svg>
              <span className="absolute text-3xl font-black text-gray-900">{healthScore}%</span>
            </div>
            <p className="mt-4 font-bold text-green-600 flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>Excellent fonctionnement</span>
            </p>
          </div>
          
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
            <h3 className="font-semibold text-gray-800">Indicateurs de calcul du DHS</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Disponibilité des partenaires</span>
                <span className="font-bold text-green-600">98%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Respect des SLA (Délais)</span>
                <span className="font-bold text-green-600">95%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Taux de résolution des incidents</span>
                <span className="font-bold text-orange-500">88%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Onglet 2 : Validation des Partenaires[cite: 1] */}
      {activeTab === 'partners' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <h2 className="font-semibold text-gray-800">Dossiers en attente de validation</h2>
          </div>
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-white border-b">
              <tr>
                <th className="px-6 py-4">Entreprise</th>
                <th className="px-6 py-4">Responsable</th>
                <th className="px-6 py-4">Documents (RCCM/ID)</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="font-bold text-gray-900">Logistique Pro Abidjan</div>
                  <div className="text-xs text-gray-500">Capacité déclarée: 15 livreurs</div>
                </td>
                <td className="px-6 py-4">Jean Kouadio<br/><span className="text-xs text-gray-500">+225 0102030405</span></td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs flex items-center"><FileText className="w-3 h-3 mr-1"/> RCCM</span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs flex items-center"><FileText className="w-3 h-3 mr-1"/> CNI</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button className="px-3 py-1.5 bg-green-600 text-white rounded hover:bg-green-700 font-medium">Valider</button>
                  <button className="px-3 py-1.5 bg-red-100 text-red-700 rounded hover:bg-red-200 font-medium">Refuser</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Onglet 3 : Gestion des Zones et Tarifs (Sans GPS)[cite: 1] */}
      {activeTab === 'zones' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-semibold text-gray-800">Référentiel des Communes (Côte d'Ivoire)</h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">Ajouter une zone</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Zone Active */}
            <div className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-gray-900">Cocody</h3>
                <p className="text-xs text-gray-500">Abidjan - 14 Partenaires actifs</p>
              </div>
              <div className="flex items-center space-x-3">
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">ACTIVE</span>
                <button className="text-blue-600 text-sm font-medium hover:underline">Tarifs</button>
              </div>
            </div>
            {/* Zone Inactive */}
            <div className="border border-gray-200 rounded-lg p-4 flex justify-between items-center bg-gray-50">
              <div>
                <h3 className="font-bold text-gray-500">Bouaké</h3>
                <p className="text-xs text-gray-400">Région du Gbêkê - 0 Partenaire</p>
              </div>
              <div className="flex items-center space-x-3">
                <span className="px-2 py-1 bg-gray-200 text-gray-600 text-xs font-bold rounded">INACTIVE</span>
                <button className="text-blue-600 text-sm font-medium hover:underline">Activer</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Onglet 4 : Configuration SLA[cite: 1] */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-2xl">
          <h2 className="font-semibold text-gray-800 mb-6">Délais d'intervention (SLA)</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <div>
                <h4 className="font-medium text-gray-900">Délai d'acceptation partenaire</h4>
                <p className="text-xs text-gray-500">Temps avant que la mission retourne dans le Mission Pool</p>
              </div>
              <div className="flex items-center space-x-2">
                <input type="number" defaultValue={3} className="w-16 border border-gray-300 rounded p-1 text-center" />
                <span className="text-sm text-gray-600">minutes</span>
              </div>
            </div>
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <div>
                <h4 className="font-medium text-gray-900">Délai d'affectation livreur</h4>
                <p className="text-xs text-gray-500">Temps accordé au partenaire pour choisir un livreur</p>
              </div>
              <div className="flex items-center space-x-2">
                <input type="number" defaultValue={10} className="w-16 border border-gray-300 rounded p-1 text-center" />
                <span className="text-sm text-gray-600">minutes</span>
              </div>
            </div>
            <button className="mt-4 bg-gray-900 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
              Enregistrer les paramètres
            </button>
          </div>
        </div>
      )}
    </div>
  );
}