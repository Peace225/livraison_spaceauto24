'use client';

import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  ShieldCheck, 
  Plus,
  Phone,
  FileText,
  MapPin,
  Star,
  MoreVertical,
  Activity,
  Clock // <--- Make sure Clock is included here
} from 'lucide-react';

interface PartnerRecord {
  id: string;
  name: string;
  code: string;
  type: 'Standard' | 'Pro' | 'Premium';
  zones: string;
  missionsCount: number;
  tauxReussite: string;
  statut: 'Actif' | 'En veille' | 'Suspendu';
  capacite: string;
}

const PARTNERS_LIST: PartnerRecord[] = [
  { id: 'EXP-001', name: 'Express CI', code: 'EXP-001', type: 'Standard', zones: 'Marcory, Cocody, Plateau', missionsCount: 128, tauxReussite: '98%', statut: 'Actif', capacite: '8 / 10' },
  { id: 'MT-002', name: 'Moto Top', code: 'MT-002', type: 'Standard', zones: 'Yopougon, Adjamé', missionsCount: 86, tauxReussite: '95%', statut: 'Actif', capacite: '5 / 8' },
  { id: 'SL-003', name: 'Speed Livreur', code: 'SL-003', type: 'Pro', zones: 'Treichville, Koumassi', missionsCount: 72, tauxReussite: '93%', statut: 'Actif', capacite: '6 / 10' },
  { id: 'LA-004', name: 'Liva Auto', code: 'LA-004', type: 'Premium', zones: 'Koumassi, Port-Bouët, Marcory', missionsCount: 65, tauxReussite: '96%', statut: 'Actif', capacite: '7 / 12' },
  { id: 'AV-005', name: 'Auto Vrac', code: 'AV-005', type: 'Standard', zones: 'Port-Bouët, Vridi', missionsCount: 42, tauxReussite: '88%', statut: 'En veille', capacite: '0 / 6' },
  { id: 'RD-006', name: 'Rapid Delivery', code: 'RD-006', type: 'Pro', zones: 'Abobo, Anyama', missionsCount: 38, tauxReussite: '92%', statut: 'Actif', capacite: '4 / 8' },
  { id: 'CIE-007', name: 'CI Express', code: 'CIE-007', type: 'Standard', zones: 'Plateau, Cocody', missionsCount: 35, tauxReussite: '90%', statut: 'Actif', capacite: '3 / 8' },
  { id: 'TC-008', name: 'Top Chrono', code: 'TC-008', type: 'Pro', zones: 'Yopougon, Abobo, Adjamé', missionsCount: 28, tauxReussite: '91%', statut: 'Actif', capacite: '4 / 8' },
  { id: 'FL-009', name: 'Flash Livreur', code: 'FL-009', type: 'Standard', zones: 'Treichville, Marcory', missionsCount: 24, tauxReussite: '87%', statut: 'Actif', capacite: '3 / 6' },
  { id: 'MC-010', name: 'Move CI', code: 'MC-010', type: 'Premium', zones: 'Toute la zone Abidjan', missionsCount: 18, tauxReussite: '96%', statut: 'Suspendu', capacite: '0 / 10' },
];

export default function PartenairesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPartner, setSelectedPartner] = useState<PartnerRecord>(PARTNERS_LIST[0]);
  const [activeRightTab, setActiveRightTab] = useState<'apercu' | 'zones' | 'livreurs' | 'missions' | 'documents'>('apercu');

  return (
    <div className="flex flex-col xl:flex-row gap-5 items-start text-xs text-slate-800">
      
      {/* COLONNE GAUCHE / CENTRALE : KPI, FILTRES ET TABLEAU */}
      <div className="flex-1 min-w-0 w-full space-y-4">
        
        {/* En-tête titre + Bouton nouveau partenaire */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div>
            <h1 className="text-xl font-extrabold text-slate-900">Partenaires</h1>
            <p className="text-xs text-slate-500">Gestion des partenaires de livraison</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5">
            <Plus className="w-3.5 h-3.5" />
            <span>+ Nouveau partenaire</span>
          </button>
        </div>

        {/* 1. LES 4 CARTES KPI PRINCIPALES (Guide 05.01)[cite: 347] */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] text-slate-500 font-semibold block">Total partenaires</span>
              <div className="text-xl font-black text-slate-900 mt-1">15 <span className="text-[10px] text-emerald-600 font-bold">↑ +2</span></div>
              <span className="text-[10px] text-slate-400">Sur la plateforme</span>
            </div>
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] text-slate-500 font-semibold block">Actifs</span>
              <div className="text-xl font-black text-slate-900 mt-1">12 <span className="text-[10px] text-emerald-600 font-bold">↑ +1</span></div>
              <span className="text-[10px] text-slate-400">Capacité disponible</span>
            </div>
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] text-slate-500 font-semibold block">En veille</span>
              <div className="text-xl font-black text-slate-900 mt-1">2</div>
              <span className="text-[10px] text-amber-600 font-bold">Temporairement fermés</span>
            </div>
            <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] text-slate-500 font-semibold block">Suspendus</span>
              <div className="text-xl font-black text-red-600 mt-1">1</div>
              <span className="text-[10px] text-red-500 font-bold">Non conformes</span>
            </div>
            <div className="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Barre de filtres et recherche */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
          <div className="relative flex-1 max-w-xs">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un partenaire..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium">
              <option>Tous les statuts</option>
            </select>
            <select className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium">
              <option>Toutes les zones</option>
            </select>
            <select className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium">
              <option>Tous les types</option>
            </select>
            <select className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium">
              <option>Taux de réussite</option>
            </select>
            <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-lg text-slate-700 font-medium hover:bg-slate-50">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span>Filtres avancés</span>
            </button>
          </div>
        </div>

        {/* 3. TABLEAU DES PARTENAIRES (Guide 05.01)[cite: 347] */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase">
                  <th className="py-2.5 px-3 w-8"><input type="checkbox" /></th>
                  <th className="py-2.5 px-3">Partenaire</th>
                  <th className="py-2.5 px-3">Type</th>
                  <th className="py-2.5 px-3">Zone(s) couvertes</th>
                  <th className="py-2.5 px-3">Missions</th>
                  <th className="py-2.5 px-3">Taux de réussite</th>
                  <th className="py-2.5 px-3">Statut</th>
                  <th className="py-2.5 px-3">Capacité</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-medium">
                {PARTNERS_LIST.map((ptn) => {
                  const isSelected = selectedPartner.id === ptn.id;
                  return (
                    <tr
                      key={ptn.id}
                      onClick={() => setSelectedPartner(ptn)}
                      className={`cursor-pointer transition-colors ${isSelected ? 'bg-blue-50/60' : 'hover:bg-slate-50'}`}
                    >
                      <td className="py-3 px-3" onClick={(e) => e.stopPropagation()}><input type="checkbox" /></td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-red-600 text-white font-black text-[10px] flex items-center justify-center shrink-0">
                            {ptn.name.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <strong className="text-slate-900 block">{ptn.name}</strong>
                            <span className="text-[10px] text-slate-400">{ptn.code}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold text-[10px] border border-slate-200">
                          {ptn.type}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-700 truncate max-w-xs">{ptn.zones}</td>
                      <td className="py-3 px-3 font-bold text-slate-900">{ptn.missionsCount}</td>
                      <td className="py-3 px-3 text-emerald-600 font-bold">{ptn.tauxReussite}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                          ptn.statut === 'Actif' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                          ptn.statut === 'En veille' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                          'bg-red-50 text-red-700 border-red-200'
                        }`}>
                          {ptn.statut}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-bold text-slate-800">{ptn.capacite}</td>
                      <td className="py-3 px-3 text-right">
                        <div className="inline-flex items-center gap-1">
                          <button className="p-1 text-slate-500 hover:text-blue-600"><Eye className="w-3.5 h-3.5" /></button>
                          <button className="p-1 text-slate-400 hover:text-slate-700"><MoreVertical className="w-3.5 h-3.5" /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-slate-500 text-[11px]">
            <span>1-10 sur 15 partenaires</span>
            <div className="flex items-center gap-1 font-bold">
              <span className="px-2 py-1 bg-blue-600 text-white rounded">1</span>
              <span className="px-2 py-1 hover:bg-slate-200 rounded cursor-pointer">2</span>
            </div>
          </div>
        </div>

        {/* 4. BLOCS GRAPHIQUES INFÉRIEURS (Répartition par statut, Performance par zone, Types de partenaires) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
            <h2 className="font-bold text-slate-800 text-xs">Répartition par statut</h2>
            <div className="h-36 flex items-center justify-between px-2">
              <div className="relative w-24 h-24 rounded-full border-7 border-emerald-500 border-t-amber-500 border-r-red-500 flex items-center justify-center text-center font-extrabold text-slate-800 text-sm">
                15
              </div>
              <div className="space-y-1 text-[11px] font-semibold text-slate-600">
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Actifs 12 (80%)</div>
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500" /> En veille 2 (13%)</div>
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500" /> Suspendus 1 (7%)</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
            <h2 className="font-bold text-slate-800 text-xs">Performance par zone</h2>
            <div className="space-y-1.5 pt-1 text-[11px]">
              {[{ zone: 'Marcory', pct: '98%' }, { zone: 'Cocody', pct: '95%' }, { zone: 'Koumassi', pct: '92%' }, { zone: 'Treichville', pct: '90%' }].map((z) => (
                <div key={z.zone} className="space-y-0.5">
                  <div className="flex justify-between font-semibold text-slate-700">
                    <span>{z.zone}</span><span>{z.pct}</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full" style={{ width: z.pct }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
            <h2 className="font-bold text-slate-800 text-xs">Types de partenaires</h2>
            <div className="h-36 flex items-center justify-between px-2">
              <div className="relative w-24 h-24 rounded-full border-7 border-blue-600 border-t-purple-500 border-r-amber-400 flex items-center justify-center text-center font-extrabold text-slate-800 text-sm">
                15
              </div>
              <div className="space-y-1 text-[11px] font-semibold text-slate-600">
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-600" /> Standard 8 (53%)</div>
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-purple-500" /> Pro 4 (27%)</div>
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400" /> Premium 3 (20%)</div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 5. PANNEAU LATÉRAL DROIT : DÉTAILS DU PARTENAIRE (Guide 05.01)[cite: 347] */}
      <aside className="w-full xl:w-96 bg-white rounded-xl border border-slate-200 shadow-xs shrink-0 overflow-hidden p-4 space-y-4">
        
        {/* En-tête panneau latéral */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-red-600 text-white font-black text-xs flex items-center justify-center shrink-0">
              {selectedPartner.name.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <span className="font-extrabold text-slate-900 block text-sm">{selectedPartner.name}</span>
              <span className="text-[10px] text-slate-400">{selectedPartner.code} • Partenaire Standard</span>
            </div>
          </div>
          <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full font-bold text-[10px] border border-emerald-200 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Actif
          </span>
        </div>

        {/* Onglets du panneau droit */}
        <div className="grid grid-cols-5 border-b border-slate-200 text-[11px] font-bold text-center">
          {(['apercu', 'zones', 'livreurs', 'missions', 'documents'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setActiveRightTab(t)}
              className={`py-2 border-b-2 capitalize transition-colors ${activeRightTab === t ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
            >
              {t}
            </button>
          ))}
        </div>

        {activeRightTab === 'apercu' && (
          <div className="space-y-4">
            
            {/* Informations générales */}
            <div className="space-y-2">
              <span className="font-bold text-slate-700 block">Informations générales</span>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex justify-between items-center"><span className="text-slate-500 flex items-center gap-1"><Users className="w-3.5 h-3.5" /> Contact principal :</span><strong className="text-slate-800">Koffi Jean</strong></div>
                <div className="flex justify-between items-center"><span className="text-slate-500 flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> Téléphone :</span><strong className="text-blue-600">07 12 34 56 78</strong></div>
                <div className="flex justify-between items-center"><span className="text-slate-500">Email :</span><strong className="text-slate-800">expressci@gmail.com</strong></div>
                <div className="flex justify-between items-center"><span className="text-slate-500 flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> Adresse :</span><strong className="text-slate-800">Marcory, Zone 4, Abidjan</strong></div>
                <div className="flex justify-between items-center"><span className="text-slate-500">Date d'inscription :</span><strong className="text-slate-800">12/01/2020</strong></div>
              </div>
            </div>

            {/* KPI & Performance */}
            <div className="space-y-2 border-t border-slate-100 pt-3">
              <span className="font-bold text-slate-700 block">KPI & Performance</span>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-base font-black text-slate-900">128</span>
                  <span className="text-[9px] text-slate-500 block">Missions</span>
                </div>
                <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-base font-black text-emerald-600">98%</span>
                  <span className="text-[9px] text-slate-500 block">Taux de réussite</span>
                </div>
                <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-base font-black text-red-600">2</span>
                  <span className="text-[9px] text-slate-500 block">Incidents</span>
                </div>
                <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-base font-black text-amber-500 flex items-center justify-center gap-0.5">4.8 <Star className="w-3 h-3 fill-amber-500 text-amber-500" /></span>
                  <span className="text-[9px] text-slate-500 block">Satisfaction</span>
                </div>
              </div>
            </div>

            {/* Capacité actuelle */}
            <div className="space-y-2 border-t border-slate-100 pt-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700">Capacité actuelle</span>
                <span className="font-bold text-slate-900">80%</span>
              </div>
              <div className="flex justify-between text-[11px] font-semibold text-slate-600">
                <span>8 / 10 livreurs disponibles</span>
                <span className="text-emerald-600">Optimal</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '80%' }} />
              </div>
            </div>

            {/* Zones couvertes */}
            <div className="space-y-2 border-t border-slate-100 pt-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700">Zones couvertes</span>
                <span className="text-blue-600 font-semibold cursor-pointer hover:underline">Modifier</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {['Marcory', 'Cocody', 'Plateau', 'Treichville'].map((z) => (
                  <span key={z} className="px-2.5 py-1 bg-slate-100 rounded-md font-medium text-slate-700 border border-slate-200">
                    {z}
                  </span>
                ))}
              </div>
            </div>

            {/* Documents */}
            <div className="space-y-2 border-t border-slate-100 pt-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700">Documents</span>
                <span className="text-blue-600 font-semibold cursor-pointer hover:underline">Voir tous</span>
              </div>
              <div className="space-y-1.5 text-[11px]">
                {[
                  { name: 'Registre de commerce', status: 'Validé' },
                  { name: 'Assurance', status: 'Validé' },
                  { name: 'Pièce d’identité', status: 'Validé' },
                  { name: 'Contrat partenaire', status: 'Signé' },
                ].map((doc) => (
                  <div key={doc.name} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="font-medium text-slate-700 flex items-center gap-1.5"><FileText className="w-3.5 h-3.5 text-slate-400" /> {doc.name}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">{doc.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeRightTab !== 'apercu' && (
          <div className="py-10 text-center text-slate-400 text-xs">
            Contenu de l'onglet <strong className="capitalize">{activeRightTab}</strong> en cours de chargement...
          </div>
        )}

        {/* Boutons d'action rapide en bas du panneau droit */}
        <div className="pt-3 border-t border-slate-200 grid grid-cols-2 gap-2">
          <button className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shadow-xs transition-colors flex items-center justify-center gap-1.5">
            <Phone className="w-3.5 h-3.5" />
            <span>Contacter</span>
          </button>
          <button className="px-3 py-2 bg-red-50 text-red-700 border border-red-200 rounded-lg font-bold hover:bg-red-100 transition-colors flex items-center justify-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Suspendre</span>
          </button>
        </div>

      </aside>

    </div>
  );
}