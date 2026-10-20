'use client';

import React, { useState } from 'react';
import { 
  Activity, 
  Clock, 
  Search, 
  Filter, 
  Download, 
  CheckCircle2, 
  AlertTriangle, 
  Package,
  Calendar,
  RefreshCw
} from 'lucide-react';

interface TimelineEvent {
  id: string;
  date: string;
  heure: string;
  evenement: string;
  mission: string;
  commande: string;
  source: string;
  resultat: 'Succès' | 'Attention' | 'Échec';
}

const TIMELINE_DATA: TimelineEvent[] = [
  { id: 'EVT-01', date: '23 juil. 2026', heure: '17:36:08', evenement: 'Clôture automatique de la mission', mission: 'DLV-2026-001279', commande: 'CMD-001598', source: 'Système', resultat: 'Succès' },
  { id: 'EVT-02', date: '23 juil. 2026', heure: '17:35:46', evenement: 'Confirmation du destinataire enregistrée', mission: 'DLV-2026-001279', commande: 'CMD-001598', source: 'Application livreur', resultat: 'Succès' },
  { id: 'EVT-03', date: '23 juil. 2026', heure: '17:35:45', evenement: 'Livraison validée (Statut Livrée)', mission: 'DLV-2026-001279', commande: 'CMD-001598', source: 'Système', resultat: 'Succès' },
  { id: 'EVT-04', date: '23 juil. 2026', heure: '17:04:36', evenement: 'Preuve de récupération validée', mission: 'DLV-2026-001279', commande: 'CMD-001598', source: 'M. Traoré Ibrahim', resultat: 'Succès' },
  { id: 'EVT-05', date: '23 juil. 2026', heure: '16:23:08', evenement: 'Résolution d’escalade (Affectation confirmée)', mission: 'DLV-2026-001279', commande: 'CMD-001598', source: 'M. Traoré Ibrahim', resultat: 'Succès' },
];

export default function OperationsTimelinePage() {
  const [searchMission, setSearchMission] = useState('DLV-2026-001279');
  const [selectedDate, setSelectedDate] = useState('23 juil. 2026');

  return (
    <div className="space-y-5 text-slate-800 text-xs">
      
      {/* En-tête de la page */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900">Operations Timeline</h1>
          <p className="text-xs text-slate-500">Journal global des événements et traçabilité des opérations logistiques</p>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-xs shadow-xs transition-colors">
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Actualiser le journal</span>
        </button>
      </div>

      {/* Barre de recherche et filtres de la timeline */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <span className="font-bold text-slate-800 text-xs block">Filtres de recherche</span>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchMission}
              onChange={(e) => setSearchMission(e.target.value)}
              placeholder="Filtrer par mission..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium"
            />
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-transparent w-full outline-none"
            />
          </div>

          <select className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium">
            <option>Tous les événements</option>
            <option>Clôture de mission</option>
            <option>Validation OTP</option>
            <option>Résolution d'escalade</option>
          </select>

          <select className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium">
            <option>Toutes les sources</option>
            <option>Système</option>
            <option>Application livreur</option>
            <option>Superviseur OPS</option>
          </select>
        </div>
      </div>

      {/* Tableau des résultats du journal */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-3.5 bg-slate-50 border-b border-slate-200 font-bold text-slate-700 text-xs">
          Résultats du journal (1 événement de clôture et traçabilité pour {searchMission})
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase">
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-3">Heure</th>
                <th className="py-3 px-3">Événement</th>
                <th className="py-3 px-3">Mission</th>
                <th className="py-3 px-3">Commande</th>
                <th className="py-3 px-3">Source</th>
                <th className="py-3 px-3">Résultat</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium">
              {TIMELINE_DATA.map((evt) => (
                <tr key={evt.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{evt.date}</td>
                  <td className="py-3.5 px-3 font-mono text-slate-600">{evt.heure}</td>
                  <td className="py-3.5 px-3 font-bold text-slate-800">{evt.evenement}</td>
                  <td className="py-3.5 px-3 text-blue-600 font-bold">{evt.mission}</td>
                  <td className="py-3.5 px-3 text-slate-700">{evt.commande}</td>
                  <td className="py-3.5 px-3 text-slate-600">{evt.source}</td>
                  <td className="py-3.5 px-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold border bg-emerald-50 text-emerald-700 border-emerald-200">
                      {evt.resultat}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-[11px] shadow-xs transition-colors">
                      Consulter
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-slate-500 text-[11px]">
          <span>1-5 sur 5 événements enregistrés</span>
          <div className="flex items-center gap-1 font-bold">
            <span className="px-2 py-1 bg-blue-600 text-white rounded">1</span>
          </div>
        </div>
      </div>

    </div>
  );
}