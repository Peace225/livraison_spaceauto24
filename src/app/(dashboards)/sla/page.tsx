'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Clock, 
  AlertTriangle, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  CheckCircle2, 
  Plus,
  TrendingUp,
  MoreVertical
} from 'lucide-react';

interface SlaItem {
  id: string;
  indicateur: string;
  partenaire: string;
  objectif: string;
  actuel: string;
  conformite: string;
  statut: 'Conforme' | 'Attention' | 'Critique';
}

const SLA_LIST: SlaItem[] = [
  { id: 'SLA-01', indicateur: 'Délai de prise en charge', partenaire: 'Express CI', objectif: '< 15 min', actuel: '12 min', conformite: '98.5%', statut: 'Conforme' },
  { id: 'SLA-02', indicateur: 'Délai de livraison global', partenaire: 'Moto Top', objectif: '< 60 min', actuel: '45 min', conformite: '96.2%', statut: 'Conforme' },
  { id: 'SLA-03', indicateur: 'Taux de réussite des livraisons', partenaire: 'Speed Livreur', objectif: '> 95%', actuel: '93.0%', conformite: '93.0%', statut: 'Attention' },
  { id: 'SLA-04', indicateur: 'Temps de réponse aux propositions', partenaire: 'Liva Auto', objectif: '< 5 min', actuel: '8 min', conformite: '88.4%', statut: 'Critique' },
];

export default function SlaPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-5 text-slate-800 text-xs">
      
      {/* En-tête de la page */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900">Suivi des SLA</h1>
          <p className="text-xs text-slate-500">Contrôle des engagements de niveau de service (SLA) des partenaires logistiques</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5">
          <Plus className="w-3.5 h-3.5" />
          <span>+ Configurer un SLA</span>
        </button>
      </div>

      {/* Cartes KPI SLA */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-emerald-100 bg-emerald-50/20 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] text-emerald-600 font-bold uppercase tracking-wider">Taux de réussite global</span>
            <div className="text-2xl font-black text-emerald-700 mt-1">96.0%</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Objectif cible V1</span>
            <div className="text-2xl font-black text-slate-900 mt-1">95.0%</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-red-100 bg-red-50/20 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] text-red-600 font-bold uppercase tracking-wider">Indicateurs en alerte</span>
            <div className="text-2xl font-black text-red-700 mt-1">1 Critique</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher par indicateur ou partenaire..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
          />
        </div>

        <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-lg text-slate-700 font-medium hover:bg-slate-50">
          <Download className="w-3.5 h-3.5" />
          <span>Exporter le rapport</span>
        </button>
      </div>

      {/* Tableau des SLA */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase">
                <th className="py-3 px-4"># ID</th>
                <th className="py-3 px-3">Indicateur de service</th>
                <th className="py-3 px-3">Partenaire</th>
                <th className="py-3 px-3">Objectif SLA</th>
                <th className="py-3 px-3">Valeur actuelle</th>
                <th className="py-3 px-3">Conformité</th>
                <th className="py-3 px-3">Statut</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium">
              {SLA_LIST.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{item.id}</td>
                  <td className="py-3.5 px-3 text-slate-900 font-extrabold">{item.indicateur}</td>
                  <td className="py-3.5 px-3 text-blue-600 font-medium">{item.partenaire}</td>
                  <td className="py-3.5 px-3 text-slate-700 font-bold">{item.objectif}</td>
                  <td className="py-3.5 px-3 text-slate-800">{item.actuel}</td>
                  <td className="py-3.5 px-3 text-emerald-600 font-bold">{item.conformite}</td>
                  <td className="py-3.5 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      item.statut === 'Conforme' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      item.statut === 'Attention' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                      'bg-red-50 text-red-700 border-red-200'
                    }`}>
                      {item.statut}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-[11px] shadow-xs transition-colors">
                      Détails
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-slate-500 text-[11px]">
          <span>1-4 sur 4 indicateurs SLA suivis</span>
          <div className="flex items-center gap-1 font-bold">
            <span className="px-2 py-1 bg-blue-600 text-white rounded">1</span>
          </div>
        </div>
      </div>

    </div>
  );
}