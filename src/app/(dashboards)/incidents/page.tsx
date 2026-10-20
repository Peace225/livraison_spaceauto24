'use client';

import React, { useState } from 'react';
import { 
  AlertTriangle, 
  AlertOctagon, 
  CheckCircle2, 
  Clock, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  ShieldAlert, 
  RotateCcw,
  TrendingUp,
  PieChart,
  BarChart3,
  Calendar
} from 'lucide-react';

interface IncidentItem {
  id: string;
  missionId: string;
  type: string;
  description: string;
  zone: string;
  priorite: 'Critique' | 'Haute' | 'Normale';
  statut: 'Ouvert' | 'En cours' | 'Résolu';
  signalePar: string;
  date: string;
}

const MOCK_INCIDENTS: IncidentItem[] = [
  { id: 'INC-2026-000128', missionId: 'DLV-2026-001242', type: 'Retard de récupération', description: 'Le livreur est arrivé chez le vendeur à 14:00, mais le magasin est fermé.', zone: 'Marcory', priorite: 'Haute', statut: 'Ouvert', signalePar: 'Ops Manager', date: '23/07/2026 14:10' },
  { id: 'INC-2026-000127', missionId: 'DLV-2026-001241', type: 'Problème véhicule', description: 'Panne de moto de livraison', zone: 'Cocody', priorite: 'Haute', statut: 'En cours', signalePar: 'Koffi A.', date: '23/07/2026 13:40' },
  { id: 'INC-2026-000126', missionId: 'DLV-2026-001240', type: 'Client absent', description: 'Client injoignable', zone: 'Yopougon', priorite: 'Critique', statut: 'Ouvert', signalePar: 'Client final', date: '23/07/2026 13:10' },
  { id: 'INC-2026-000125', missionId: 'DLV-2026-001239', type: 'Problème adresse', description: 'Adresse incorrecte', zone: 'Treichville', priorite: 'Normale', statut: 'En cours', signalePar: 'Jean K.', date: '23/07/2026 12:10' },
  { id: 'INC-2026-000124', missionId: 'DLV-2026-001238', type: 'Incident client', description: 'Refus du colis', zone: 'Koumassi', priorite: 'Normale', statut: 'Résolu', signalePar: 'Abou B.', date: '23/07/2026 11:00' },
];

export default function IncidentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statutFilter, setStatutFilter] = useState('ALL');

  return (
    <div className="space-y-4 text-slate-800 text-xs">
      
      {/* 1. EN-TÊTE DE LA PAGE */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900">Incidents</h1>
          <p className="text-xs text-slate-500">Suivi et résolution des incidents de livraison</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-xs shadow-xs transition-colors">
          + Déclarer un incident
        </button>
      </div>

      {/* 2. LES 4 INDICATEURS CLÉS (KPI) DE LA MAQUETTE OFFICIELLE */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block">Incidents ouverts</span>
            <div className="text-xl font-extrabold text-slate-900 mt-1">8</div>
            <span className="text-[10px] text-amber-600 font-bold">↑ +2 • À traiter par l'OPS</span>
          </div>
          <div className="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
            <AlertTriangle className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block">En cours de traitement</span>
            <div className="text-xl font-extrabold text-slate-900 mt-1">4</div>
            <span className="text-[10px] text-blue-600 font-bold">En attente de résolution</span>
          </div>
          <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block">Résolus aujourd'hui</span>
            <div className="text-xl font-extrabold text-emerald-600 mt-1">12</div>
            <span className="text-[10px] text-emerald-600 font-bold">↑ +33% • Sur la période</span>
          </div>
          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block">Incidents critiques</span>
            <div className="text-xl font-extrabold text-red-600 mt-1">3</div>
            <span className="text-[10px] text-red-500 font-bold">Nécessitent une action immédiate</span>
          </div>
          <div className="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
            <ShieldAlert className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* 3. TROIS GRAPHIQUES DE SUPERVISION (Évolution, Répartition par type, Répartition par statut) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        
        {/* Évolution des incidents */}
        <div className="lg:col-span-5 bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between font-bold text-slate-700">
            <span>Évolution des incidents</span>
            <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-500">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> Ouverts</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500" /> En cours</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Résolus</span>
            </div>
          </div>
          <div className="h-32 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-center text-center p-2">
            <TrendingUp className="w-6 h-6 text-blue-500 mr-2" />
            <span className="text-slate-500 text-[11px]">Graphique d'évolution chronologique</span>
          </div>
        </div>

        {/* Répartition par type */}
        <div className="lg:col-span-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between font-bold text-slate-700">
            <span>Répartition par type</span>
            <span className="text-slate-900">27 Total</span>
          </div>
          <div className="h-32 flex items-center justify-between bg-slate-50 rounded-lg border border-slate-200 px-3">
            <div className="relative w-20 h-20 rounded-full border-6 border-blue-500 border-t-emerald-500 border-r-amber-500 flex items-center justify-center font-extrabold text-slate-800 text-xs">
              27
            </div>
            <div className="space-y-0.5 text-[10px] font-semibold text-slate-600">
              <div>Client absent (37%)</div>
              <div>Problème adresse (29%)</div>
              <div>Retard vendeur (34%)</div>
            </div>
          </div>
        </div>

        {/* Répartition par statut */}
        <div className="lg:col-span-4 bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between font-bold text-slate-700">
            <span>Répartition par statut</span>
            <span className="text-slate-900">27 Total</span>
          </div>
          <div className="h-32 flex items-center justify-between bg-slate-50 rounded-lg border border-slate-200 px-3">
            <div className="relative w-20 h-20 rounded-full border-6 border-amber-500 border-t-blue-500 border-r-emerald-500 flex items-center justify-center font-extrabold text-slate-800 text-xs">
              27
            </div>
            <div className="space-y-0.5 text-[10px] font-semibold text-slate-600">
              <div>Ouverts 30%</div>
              <div>En cours 26%</div>
              <div>Résolus 44%</div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. BARRE DE RECHERCHE ET FILTRES AVANCÉS */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un incident..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select value={statutFilter} onChange={(e) => setStatutFilter(e.target.value)} className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium">
            <option value="ALL">Tous les statuts</option>
            <option value="Ouvert">Ouvert</option>
            <option value="En cours">En cours</option>
            <option value="Résolu">Résolu</option>
          </select>
          <select className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium">
            <option>Tous les types</option>
          </select>
          <select className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium">
            <option>Toutes les zones</option>
          </select>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>17/07/2026 - 23/07/2026</span>
          </div>
          <button className="flex items-center gap-1 px-3 py-1.5 border border-slate-200 rounded-lg text-slate-700 font-medium hover:bg-slate-50">
            <Download className="w-3.5 h-3.5" />
            <span>Exporter</span>
          </button>
        </div>
      </div>

      {/* 5. ONGLETS DE STATUTS RAPIDES (Guide 04) */}
      <div className="flex flex-wrap items-center gap-2 font-bold">
        {[
          { id: 'tous', label: 'Tous (27)' },
          { id: 'ouverts', label: 'Ouverts (8)' },
          { id: 'en_cours', label: 'En cours (4)' },
          { id: 'resolus', label: 'Résolus (12)' },
        ].map((tab, idx) => (
          <button
            key={tab.id}
            className={`px-3.5 py-2 rounded-lg transition-colors ${
              idx === 0
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 6. TABLEAU CENTRAL DES INCIDENTS */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase">
                <th className="py-3 px-3 w-8"><input type="checkbox" /></th>
                <th className="py-3 px-3"># Incident</th>
                <th className="py-3 px-3">Mission</th>
                <th className="py-3 px-3">Type</th>
                <th className="py-3 px-3">Description</th>
                <th className="py-3 px-3">Zone</th>
                <th className="py-3 px-3">Statut</th>
                <th className="py-3 px-3">Priorité</th>
                <th className="py-3 px-3">Signalé le</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium">
              {MOCK_INCIDENTS.map((inc) => (
                <tr key={inc.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-3"><input type="checkbox" /></td>
                  <td className="py-3 px-3 font-bold text-slate-900">{inc.id}</td>
                  <td className="py-3 px-3 text-blue-600 font-bold">{inc.missionId}</td>
                  <td className="py-3 px-3 text-slate-800 font-bold">{inc.type}</td>
                  <td className="py-3 px-3 text-slate-600 truncate max-w-xs">{inc.description}</td>
                  <td className="py-3 px-3 text-slate-700">{inc.zone}</td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      inc.statut === 'Ouvert' ? 'bg-red-50 text-red-700 border-red-200' :
                      inc.statut === 'En cours' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                      'bg-emerald-50 text-emerald-700 border-emerald-200'
                    }`}>
                      {inc.statut}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      inc.priorite === 'Critique' ? 'bg-red-50 text-red-700 border border-red-200' :
                      inc.priorite === 'Haute' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {inc.priorite}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-500">{inc.date}</td>
                  <td className="py-3 px-3 text-right">
                    <div className="inline-flex items-center gap-1">
                      <button className="p-1 text-slate-500 hover:text-blue-600"><Eye className="w-3.5 h-3.5" /></button>
                      <button className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded font-bold text-[10px]">Traiter</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-slate-500 text-[11px]">
          <span>Affichage 10 par page • 1-5 sur 27 incidents</span>
          <div className="flex items-center gap-1 font-bold">
            <span className="px-2 py-1 bg-blue-600 text-white rounded">1</span>
            <span className="px-2 py-1 hover:bg-slate-200 rounded cursor-pointer">2</span>
            <span className="px-2 py-1 hover:bg-slate-200 rounded cursor-pointer">3</span>
          </div>
        </div>
      </div>

    </div>
  );
}