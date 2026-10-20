'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Calendar, 
  BarChart3, 
  TrendingUp, 
  ShieldCheck, 
  Filter, 
  Search,
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';

interface ReportItem {
  id: string;
  titre: string;
  type: string;
  periode: string;
  genereLe: string;
  format: 'PDF' | 'CSV' | 'Excel';
  statut: 'Disponible' | 'En cours';
}

const REPORTS_LIST: ReportItem[] = [
  { id: 'REP-001', titre: 'Rapport d’activité logistique hebdomadaire', type: 'Opérations', periode: '17 Juil. 2026 - 23 Juil. 2026', genereLe: '23 Juil. 2026 à 23:59', format: 'PDF', statut: 'Disponible' },
  { id: 'REP-002', titre: 'Bilan des performances SLA par partenaire', type: 'Performance', periode: '17 Juil. 2026 - 23 Juil. 2026', genereLe: '23 Juil. 2026 à 23:59', format: 'Excel', statut: 'Disponible' },
  { id: 'REP-003', titre: 'Rapport des incidents et résolutions OPS', type: 'Incidents', periode: '17 Juil. 2026 - 23 Juil. 2026', genereLe: '23 Juil. 2026 à 23:59', format: 'PDF', statut: 'Disponible' },
  { id: 'REP-004', titre: 'Synthèse des livraisons par zone (Abidjan)', type: 'Géographie', periode: '01 Juil. 2026 - 23 Juil. 2026', genereLe: '23 Juil. 2026 à 23:59', format: 'CSV', statut: 'Disponible' },
];

export default function RapportsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-5 text-slate-800 text-xs">
      
      {/* En-tête de la page */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900">Rapports & Analyses</h1>
          <p className="text-xs text-slate-500">Génération et consultation des rapports d'activité logistique, de performance SLA et d'incidents</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5" />
          <span>+ Générer un rapport</span>
        </button>
      </div>

      {/* Cartes KPI Rapports */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Rapports générés (Ce mois)</span>
            <div className="text-2xl font-black text-slate-900 mt-1">24 Rapports</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-emerald-100 bg-emerald-50/20 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] text-emerald-600 font-bold uppercase tracking-wider">Taux de conformité global</span>
            <div className="text-2xl font-black text-emerald-700 mt-1">96.0%</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Volume total analysé</span>
            <div className="text-2xl font-black text-slate-900 mt-1">456 Missions</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
            <BarChart3 className="w-5 h-5" />
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
            placeholder="Rechercher un rapport par titre ou type..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Juillet 2026</span>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-lg text-slate-700 font-medium hover:bg-slate-50">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span>Filtres</span>
          </button>
        </div>
      </div>

      {/* Tableau des Rapports */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase">
                <th className="py-3 px-4"># ID</th>
                <th className="py-3 px-3">Titre du rapport</th>
                <th className="py-3 px-3">Type</th>
                <th className="py-3 px-3">Période couverte</th>
                <th className="py-3 px-3">Généré le</th>
                <th className="py-3 px-3">Format</th>
                <th className="py-3 px-3">Statut</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium">
              {REPORTS_LIST.map((rep) => (
                <tr key={rep.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{rep.id}</td>
                  <td className="py-3.5 px-3 text-slate-900 font-extrabold">{rep.titre}</td>
                  <td className="py-3.5 px-3">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold text-[10px] border border-slate-200">
                      {rep.type}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-slate-700">{rep.periode}</td>
                  <td className="py-3.5 px-3 text-slate-500">{rep.genereLe}</td>
                  <td className="py-3.5 px-3">
                    <span className="font-bold text-blue-600">{rep.format}</span>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold border bg-emerald-50 text-emerald-700 border-emerald-200">
                      {rep.statut}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-[11px] shadow-xs transition-colors flex items-center gap-1 ml-auto">
                      <Download className="w-3 h-3" />
                      <span>Télécharger</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-slate-500 text-[11px]">
          <span>1-4 sur 4 rapports disponibles</span>
          <div className="flex items-center gap-1 font-bold">
            <span className="px-2 py-1 bg-blue-600 text-white rounded">1</span>
          </div>
        </div>
      </div>

    </div>
  );
}