'use client';

import { useState } from 'react';
import { 
  Send, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertTriangle, 
  RefreshCw, 
  MoreVertical,
  Calendar,
  Filter,
  Check
} from 'lucide-react';

type OpsQueueTab = 'toutes' | 'en_attente' | 'acceptees' | 'refusees' | 'expirees' | 'intervention';

interface ProposalItem {
  id: string;
  mission: string;
  commande: string;
  itineraire: string;
  destinataire: string;
  categorie: string;
  propositionStatut: 'En attente' | 'Acceptée' | 'Refusée' | 'Expirée';
  delai: string;
}

const MOCK_PROPOSITIONS: ProposalItem[] = [
  { id: '1', mission: 'DLV-2026-001289', commande: 'CMD-001612', itineraire: 'Marcory → Treichville', destinataire: 'Kouassi Jean', categorie: 'Affilié • Auto', propositionStatut: 'En attente', delai: '4 min' },
  { id: '2', mission: 'DLV-2026-001288', commande: 'CMD-001611', itineraire: 'Cocody → Angré', destinataire: 'Moussa Diabaté', categorie: 'Indépendant', propositionStatut: 'En attente', delai: '5 min' },
  { id: '3', mission: 'DLV-2026-001287', commande: 'CMD-001610', itineraire: 'Yopougon → Port-Bouët', destinataire: 'Express CI', categorie: 'Partenaire • Manuel', propositionStatut: 'En attente', delai: '8 min' },
  { id: '4', mission: 'DLV-2026-001280', commande: 'CMD-001603', itineraire: 'Angré → Cocody', destinataire: 'Rapide CI', categorie: 'Partenaire • Manuel', propositionStatut: 'En attente', delai: '7 min' },
];

export default function OpsDashboardPage() {
  const [activeTab, setActiveTab] = useState<OpsQueueTab>('en_attente');
  const [selectedPeriode, setSelectedPeriode] = useState('23/07/2026');
  const [selectedStatut, setSelectedStatut] = useState('En attente');
  const [selectedCategorie, setSelectedCategorie] = useState('Toutes');
  const [selectedMode, setSelectedMode] = useState('Tous');
  const [selectedZone, setSelectedZone] = useState('Toutes');

  return (
    <div className="space-y-5 text-slate-800 text-xs">
      
      {/* 1. EN-TÊTE ET BOUTON ACTUALISER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900">OPS Queue</h1>
          <p className="text-xs text-slate-500">Supervision des propositions automatiques et manuelles</p>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-xs shadow-xs transition-colors">
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Actualiser</span>
        </button>
      </div>

      {/* 2. LES 5 CARTES KPI SUPÉRIEURES (Guide 03) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">Propositions<br/>en attente</span>
            <div className="text-2xl font-black text-slate-900 mt-1">12</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <Send className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">Acceptées<br/>aujourd'hui</span>
            <div className="text-2xl font-black text-slate-900 mt-1">28</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">Refusées<br/>aujourd'hui</span>
            <div className="text-2xl font-black text-slate-900 mt-1">6</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
            <XCircle className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">Expirées<br/>aujourd'hui</span>
            <div className="text-2xl font-black text-slate-900 mt-1">4</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between col-span-2 sm:col-span-1">
          <div>
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">Interventions<br/>requises</span>
            <div className="text-2xl font-black text-red-600 mt-1">8</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
            <AlertTriangle className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* 3. BARRE DE FILTRAGE AVANCÉE */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div>
          <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Période</label>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <input type="text" value={selectedPeriode} onChange={(e) => setSelectedPeriode(e.target.value)} className="bg-transparent w-full outline-none" />
          </div>
        </div>

        <div>
          <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Statut</label>
          <select value={selectedStatut} onChange={(e) => setSelectedStatut(e.target.value)} className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium">
            <option value="En attente">En attente</option>
            <option value="Acceptée">Acceptée</option>
            <option value="Refusée">Refusée</option>
            <option value="Expirée">Expirée</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Catégorie</label>
          <select value={selectedCategorie} onChange={(e) => setSelectedCategorie(e.target.value)} className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium">
            <option value="Toutes">Toutes</option>
            <option value="Indépendant">Indépendant</option>
            <option value="Affilié">Affilié</option>
            <option value="Partenaire">Partenaire</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Mode</label>
          <select value={selectedMode} onChange={(e) => setSelectedMode(e.target.value)} className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium">
            <option value="Tous">Tous</option>
            <option value="Auto">Auto</option>
            <option value="Manuel">Manuel</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Zone</label>
          <select value={selectedZone} onChange={(e) => setSelectedZone(e.target.value)} className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium">
            <option value="Toutes">Toutes</option>
            <option value="Cocody">Cocody</option>
            <option value="Marcory">Marcory</option>
            <option value="Yopougon">Yopougon</option>
          </select>
        </div>
      </div>

      {/* 4. ONGLETS DE STATUTS RAPIDES */}
      <div className="flex flex-wrap items-center gap-2 font-bold">
        {[
          { id: 'toutes', label: 'Toutes (53)' },
          { id: 'en_attente', label: 'En attente (12)' },
          { id: 'acceptees', label: 'Acceptées (28)' },
          { id: 'refusees', label: 'Refusées (6)' },
          { id: 'expirees', label: 'Expirées (4)' },
          { id: 'intervention', label: 'Intervention requise (8)' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as OpsQueueTab)}
            className={`px-3.5 py-2 rounded-lg transition-colors ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 5. TABLEAU DES PROPOSITIONS OPS QUEUE */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase">
                <th className="py-3 px-4 w-8"><input type="checkbox" /></th>
                <th className="py-3 px-3">Mission</th>
                <th className="py-3 px-3">Commande</th>
                <th className="py-3 px-3">Itinéraire</th>
                <th className="py-3 px-3">Destinataire</th>
                <th className="py-3 px-3">Catégorie</th>
                <th className="py-3 px-3">Proposition</th>
                <th className="py-3 px-3">Délai</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium">
              {MOCK_PROPOSITIONS.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4"><input type="checkbox" /></td>
                  <td className="py-3.5 px-3 font-bold text-slate-900">{item.mission}</td>
                  <td className="py-3.5 px-3 text-blue-600">{item.commande}</td>
                  <td className="py-3.5 px-3 text-slate-700">{item.itineraire}</td>
                  <td className="py-3.5 px-3 text-slate-900 font-bold">{item.destinataire}</td>
                  <td className="py-3.5 px-3 text-slate-600">{item.categorie}</td>
                  <td className="py-3.5 px-3">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                      En attente
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-slate-600 font-bold">{item.delai}</td>
                  <td className="py-3.5 px-3 text-right">
                    <button className="p-1 text-slate-400 hover:text-slate-700">
                      <MoreVertical className="w-4 h-4 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-slate-500 text-[11px]">
          <span>Affichage 10 par page • 1–4 sur 12 propositions en attente</span>
          <div className="flex items-center gap-1 font-bold">
            <span className="px-2 py-1 bg-blue-600 text-white rounded">1</span>
            <span className="px-2 py-1 hover:bg-slate-200 rounded cursor-pointer">2</span>
          </div>
        </div>
      </div>

      {/* 6. BANDEAU DE NOTIFICATION INFORMATIF (Guide 03) */}
      <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-emerald-900">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5" />
          </div>
          <div>
            <strong className="block text-xs font-extrabold">Proposition annulée avec succès</strong>
            <span className="text-[11px] text-emerald-700">PROP-2026-007534 • Konan Yao — réservation libérée. Mission DLV-2026-001279 toujours « À assigner »[cite: 165].</span>
          </div>
        </div>
      </div>

    </div>
  );
}