'use client';

import React, { useState } from 'react';
import { 
  Truck, 
  Users, 
  CheckCircle2, 
  Clock, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  ShieldCheck, 
  Plus,
  Phone,
  MapPin,
  MoreVertical,
  AlertTriangle,
  Star,
  Activity,
  Send,
  UserX
} from 'lucide-react';

interface DriverRecord {
  id: string;
  name: string;
  code: string;
  phone: string;
  type: 'Affilié' | 'Indépendant';
  partenaire: string;
  zone: string;
  disponibilite: 'Disponible' | 'Occupé' | 'Indisponible' | 'Compte suspendu';
  mode: 'Auto' | 'Manuel' | 'N/A';
  missionActuelle?: {
    ref: string;
    trajet: string;
    statut: string;
  };
}

const DRIVERS_DATA: DriverRecord[] = [
  { id: 'DRV-0201', name: 'Kouassi Jean', code: 'DRV-0201', phone: '07 12 34 56 78', type: 'Affilié', partenaire: 'Express CI', zone: 'Marcory', disponibilite: 'Occupé', mode: 'Auto', missionActuelle: { ref: 'DLV-2026-001245', trajet: 'Marcory → Cocody', statut: 'En livraison' } },
  { id: 'DRV-0202', name: 'Diabaté Moussa', code: 'DRV-0202', phone: '07 08 76 54 32', type: 'Affilié', partenaire: 'Moto Top', zone: 'Cocody', disponibilite: 'Disponible', mode: 'Manuel' },
  { id: 'DRV-0203', name: 'Konan Yao', code: 'DRV-0203', type: 'Affilié', partenaire: 'Speed Livreur', zone: 'Yopougon', disponibilite: 'Occupé', mode: 'Auto', missionActuelle: { ref: 'DLV-2026-001241', trajet: 'Yopougon → Plateau', statut: 'En livraison' } },
  { id: 'DRV-0204', name: 'Traoré Ibrahim', code: 'DRV-0204', type: 'Affilié', partenaire: 'Liva Auto', zone: 'Treichville', disponibilite: 'Indisponible', mode: 'Manuel' },
  { id: 'DRV-0205', name: 'N\'Guessan Paul', code: 'DRV-0205', type: 'Affilié', partenaire: 'Auto Vrac', zone: 'Koumassi', disponibilite: 'Disponible', mode: 'Auto' },
  { id: 'DRV-0206', name: 'Koffi Blaise', code: 'DRV-0206', type: 'Affilié', partenaire: 'Express CI', zone: 'Plateau', disponibilite: 'Compte suspendu', mode: 'N/A' },
  { id: 'DRV-0207', name: 'Yao Christian', code: 'DRV-0207', type: 'Affilié', partenaire: 'Rapid Delivery', zone: 'Port-Bouët', disponibilite: 'Occupé', mode: 'Auto', missionActuelle: { ref: 'DLV-2026-001239', trajet: 'Port-Bouët → Marcory', statut: 'En livraison' } },
  { id: 'DRV-0208', name: 'Koné Mariam', code: 'DRV-0208', type: 'Affilié', partenaire: 'Moto Top', zone: 'Adjamé', disponibilite: 'Disponible', mode: 'Manuel' },
  { id: 'DRV-0209', name: 'Coulibaly Serge', code: 'DRV-0209', type: 'Affilié', partenaire: 'Move CI', zone: 'Abobo', disponibilite: 'Indisponible', mode: 'Auto' },
  { id: 'DRV-0210', name: 'Ibrahim Sory', code: 'DRV-0210', type: 'Indépendant', partenaire: 'Aucun (Direct)', zone: 'Treichville', disponibilite: 'Occupé', mode: 'N/A', missionActuelle: { ref: 'DLV-2026-001238', trajet: 'Treichville → Marcory', statut: 'En livraison' } },
];

export default function LivreursPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDriver, setSelectedDriver] = useState<DriverRecord>(DRIVERS_DATA[0]);
  const [rightTab, setRightTab] = useState<'apercu' | 'missions' | 'performances' | 'documents'>('apercu');

  return (
    <div className="flex flex-col xl:flex-row gap-5 items-start text-xs text-slate-800">
      
      {/* COLONNE GAUCHE / CENTRALE : KPI, FILTRES ET TABLEAU */}
      <div className="flex-1 min-w-0 w-full space-y-4">
        
        {/* En-tête titre + Bouton ajouter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div>
            <h1 className="text-xl font-extrabold text-slate-900">Livreurs</h1>
            <p className="text-xs text-slate-500">Gestion et suivi des livreurs sur la plateforme</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5">
            <Plus className="w-3.5 h-3.5" />
            <span>+ Ajouter un livreur</span>
          </button>
        </div>

        {/* 1. LES 5 CARTES KPI PRINCIPALES (Guide 06.01)[cite: 365] */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] text-slate-500 font-semibold block">Total livreurs</span>
              <div className="text-xl font-black text-slate-900 mt-1">48</div>
              <span className="text-[10px] text-slate-400">Sur la plateforme</span>
            </div>
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Truck className="w-4 h-4" />
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] text-slate-500 font-semibold block">Disponibles</span>
              <div className="text-xl font-black text-emerald-600 mt-1">22 <span className="text-[10px] font-normal text-slate-400">46%</span></div>
              <span className="text-[10px] text-slate-400">Prêts à recevoir une mission</span>
            </div>
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] text-slate-500 font-semibold block">Occupés</span>
              <div className="text-xl font-black text-blue-600 mt-1">18 <span className="text-[10px] text-red-500 font-bold">↑ +38%</span></div>
              <span className="text-[10px] text-slate-400">En cours de mission</span>
            </div>
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] text-slate-500 font-semibold block">Indisponibles</span>
              <div className="text-xl font-black text-amber-600 mt-1">5 <span className="text-[10px] font-normal text-slate-400">10%</span></div>
              <span className="text-[10px] text-slate-400">Indisponibles temporairement</span>
            </div>
            <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between col-span-2 sm:col-span-1">
            <div>
              <span className="text-[11px] text-slate-500 font-semibold block">Comptes suspendus</span>
              <div className="text-xl font-black text-red-600 mt-1">3 <span className="text-[10px] font-normal text-slate-400">6%</span></div>
              <span className="text-[10px] text-slate-400">Accès suspendus</span>
            </div>
            <div className="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
              <UserX className="w-4 h-4" />
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
              placeholder="Rechercher un livreur..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium">
              <option>Toutes les disponibilités</option>
            </select>
            <select className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium">
              <option>Tous les partenaires</option>
            </select>
            <select className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium">
              <option>Toutes les zones</option>
            </select>
            <select className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium">
              <option>Tous les types</option>
            </select>
            <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-lg text-slate-700 font-medium hover:bg-slate-50">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span>Filtres avancés</span>
            </button>
          </div>
        </div>

        {/* 2. TABLEAU DES LIVREURS (Guide 06.01)[cite: 365] */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase">
                  <th className="py-2.5 px-3 w-8"><input type="checkbox" /></th>
                  <th className="py-2.5 px-3">Livreur</th>
                  <th className="py-2.5 px-3">Partenaire / Type</th>
                  <th className="py-2.5 px-3">Zone(s)</th>
                  <th className="py-2.5 px-3">Disponibilité</th>
                  <th className="py-2.5 px-3">Mode</th>
                  <th className="py-2.5 px-3">Mission actuelle</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-medium">
                {DRIVERS_DATA.map((drv) => {
                  const isSelected = selectedDriver.id === drv.id;
                  return (
                    <tr
                      key={drv.id}
                      onClick={() => setSelectedDriver(drv)}
                      className={`cursor-pointer transition-colors ${isSelected ? 'bg-blue-50/60' : 'hover:bg-slate-50'}`}
                    >
                      <td className="py-3 px-3" onClick={(e) => e.stopPropagation()}><input type="checkbox" /></td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 font-bold text-[10px] flex items-center justify-center shrink-0">
                            {drv.name.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <strong className="text-slate-900 block">{drv.name}</strong>
                            <span className="text-[10px] text-slate-400">{drv.phone}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <span className="text-slate-800 font-semibold block">{drv.partenaire}</span>
                        <span className="text-[10px] text-slate-400">{drv.type === 'Affilié' ? 'Livreur affilié' : 'Indépendant'}</span>
                      </td>
                      <td className="py-3 px-3 text-slate-700">{drv.zone}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          drv.disponibilite === 'Disponible' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                          drv.disponibilite === 'Occupé' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                          drv.disponibilite === 'Compte suspendu' ? 'bg-red-50 text-red-700 border-red-200' :
                          'bg-slate-100 text-slate-600 border-slate-200'
                        }`}>
                          {drv.disponibilite}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-bold text-slate-700">{drv.mode}</td>
                      <td className="py-3 px-3">
                        {drv.missionActuelle ? (
                          <div>
                            <span className="text-blue-600 font-bold block">{drv.missionActuelle.ref}</span>
                            <span className="text-[10px] text-slate-500">{drv.missionActuelle.statut}</span>
                          </div>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <div className="inline-flex items-center gap-1">
                          <button className="p-1 text-slate-500 hover:text-blue-600"><Eye className="w-3.5 h-3.5" /></button>
                          <button className="p-1 text-slate-400 hover:text-slate-700"><Phone className="w-3.5 h-3.5" /></button>
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
            <span>Affichage 10 par page • 1-10 sur 48 livreurs</span>
            <div className="flex items-center gap-1 font-bold">
              <span className="px-2 py-1 bg-blue-600 text-white rounded">1</span>
              <span className="px-2 py-1 hover:bg-slate-200 rounded cursor-pointer">2</span>
              <span className="px-2 py-1 hover:bg-slate-200 rounded cursor-pointer">3</span>
            </div>
          </div>
        </div>

        {/* 3. BLOCS GRAPHIQUES INFÉRIEURS (Répartition par disponibilité, Activité, Missions par partenaire) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
            <h2 className="font-bold text-slate-800 text-xs">Répartition par disponibilité</h2>
            <div className="h-36 flex items-center justify-between px-2">
              <div className="relative w-24 h-24 rounded-full border-7 border-emerald-500 border-t-blue-500 border-r-amber-500 border-b-red-500 flex items-center justify-center text-center font-extrabold text-slate-800 text-sm">
                48
              </div>
              <div className="space-y-1 text-[11px] font-semibold text-slate-600">
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Disponibles 22 (46%)</div>
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500" /> Occupés 18 (38%)</div>
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500" /> Indisponibles 5 (10%)</div>
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500" /> Suspendus 3 (6%)</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
            <h2 className="font-bold text-slate-800 text-xs">Activité des livreurs (24h)</h2>
            <div className="h-36 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 text-[11px]">
              Histogramme d'activité horaire
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
            <h2 className="font-bold text-slate-800 text-xs">Missions par partenaire</h2>
            <div className="space-y-1.5 pt-1 text-[11px]">
              {[{ name: 'Express CI', count: 128 }, { name: 'Moto Top', count: 86 }, { name: 'Speed Livreur', count: 72 }, { name: 'Liva Auto', count: 65 }].map((p) => (
                <div key={p.name} className="space-y-0.5">
                  <div className="flex justify-between font-semibold text-slate-700">
                    <span>{p.name}</span><span>{p.count}</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-red-600 h-full rounded-full" style={{ width: `${(p.count / 140) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* 4. PANNEAU LATÉRAL DROIT : DÉTAILS DU LIVREUR (Guide 06.01)[cite: 365] */}
      <aside className="w-full xl:w-96 bg-white rounded-xl border border-slate-200 shadow-xs shrink-0 overflow-hidden p-4 space-y-4">
        
        {/* En-tête panneau latéral */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0">
              {selectedDriver.name.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <span className="font-extrabold text-slate-900 block text-sm">{selectedDriver.name}</span>
              <span className="text-[10px] text-slate-400">{selectedDriver.code} • {selectedDriver.partenaire}</span>
            </div>
          </div>
          <span className="px-2.5 py-1 bg-amber-50 text-amber-700 rounded-full font-bold text-[10px] border border-amber-200 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            {selectedDriver.disponibilite}
          </span>
        </div>

        {/* Évaluation / Avis */}
        <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
          <Star className="w-3.5 h-3.5 fill-amber-500" />
          <span>4.8 (128 avis)</span>
        </div>

        {/* Onglets du panneau droit */}
        <div className="grid grid-cols-4 border-b border-slate-200 text-[11px] font-bold text-center">
          {(['apercu', 'missions', 'performances', 'documents'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setRightTab(t)}
              className={`py-2 border-b-2 capitalize transition-colors ${rightTab === t ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
            >
              {t}
            </button>
          ))}
        </div>

        {rightTab === 'apercu' && (
          <div className="space-y-4">
            
            {/* Informations personnelles */}
            <div className="space-y-2">
              <span className="font-bold text-slate-700 block">Informations personnelles</span>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex justify-between items-center"><span className="text-slate-500">Nom complet :</span><strong className="text-slate-800">{selectedDriver.name}</strong></div>
                <div className="flex justify-between items-center"><span className="text-slate-500">Téléphone :</span><strong className="text-blue-600">{selectedDriver.phone}</strong></div>
                <div className="flex justify-between items-center"><span className="text-slate-500">WhatsApp :</span><strong className="text-slate-800">{selectedDriver.phone}</strong></div>
                <div className="flex justify-between items-center"><span className="text-slate-500">Email :</span><strong className="text-slate-800">kouassi.jean@gmail.com</strong></div>
                <div className="flex justify-between items-center"><span className="text-slate-500">Partenaire :</span><strong className="text-slate-800">{selectedDriver.partenaire}</strong></div>
                <div className="flex justify-between items-center"><span className="text-slate-500">Type :</span><strong className="text-slate-800">Livreur affilié</strong></div>
                <div className="flex justify-between items-center"><span className="text-slate-500">Mode d'affectation :</span><strong className="text-slate-800">{selectedDriver.mode}</strong></div>
                <div className="flex justify-between items-center"><span className="text-slate-500">Disponibilité :</span><strong className="text-amber-600">{selectedDriver.disponibilite}</strong></div>
              </div>
            </div>

            {/* Mission active */}
            <div className="space-y-2 border-t border-slate-100 pt-3">
              <span className="font-bold text-slate-700 block">Mission active</span>
              {selectedDriver.missionActuelle ? (
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5 text-[11px]">
                  <div className="flex justify-between"><span className="text-slate-500">Référence :</span><strong className="text-blue-600">{selectedDriver.missionActuelle.ref}</strong></div>
                  <div className="flex justify-between"><span className="text-slate-500">Trajet :</span><strong className="text-slate-800">{selectedDriver.missionActuelle.trajet}</strong></div>
                  <div className="flex justify-between"><span className="text-slate-500">Statut :</span><strong className="text-emerald-600">{selectedDriver.missionActuelle.statut}</strong></div>
                  <button className="w-full mt-2 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded font-bold text-[10px] shadow-xs">
                    Voir la mission
                  </button>
                </div>
              ) : (
                <p className="text-slate-400 italic">Aucune mission en cours</p>
              )}
            </div>

            {/* Statistiques (30 derniers jours) */}
            <div className="space-y-2 border-t border-slate-100 pt-3">
              <span className="font-bold text-slate-700 block">Statistiques (30 derniers jours)</span>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-base font-black text-slate-900">28</span>
                  <span className="text-[9px] text-slate-500 block">Missions</span>
                </div>
                <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-base font-black text-emerald-600">96%</span>
                  <span className="text-[9px] text-slate-500 block">Réussite</span>
                </div>
                <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-base font-black text-amber-500">4.8</span>
                  <span className="text-[9px] text-slate-500 block">Note client</span>
                </div>
                <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-base font-black text-slate-900">0</span>
                  <span className="text-[9px] text-slate-500 block">Incidents</span>
                </div>
              </div>
            </div>

            {/* Dernières activités */}
            <div className="space-y-2 border-t border-slate-100 pt-3">
              <span className="font-bold text-slate-700 block">Dernières activités</span>
              <div className="space-y-1 text-[10px] text-slate-600">
                <div className="flex justify-between py-1 border-b border-slate-100"><span>En livraison chez le client</span><span className="text-slate-400">il y a 5 min</span></div>
                <div className="flex justify-between py-1 border-b border-slate-100"><span>Colis récupéré chez le vendeur</span><span className="text-slate-400">il y a 18 min</span></div>
                <div className="flex justify-between py-1 border-b border-slate-100"><span>Arrivé chez le vendeur</span><span className="text-slate-400">il y a 25 min</span></div>
                <div className="flex justify-between py-1"><span>Mission assignée</span><span className="text-slate-400">il y a 28 min</span></div>
              </div>
            </div>
          </div>
        )}

        {rightTab !== 'apercu' && (
          <div className="py-10 text-center text-slate-400 text-xs">
            Contenu de l'onglet <strong className="capitalize">{rightTab}</strong> en cours de chargement...
          </div>
        )}

        {/* Boutons d'action rapide en bas du panneau droit */}
        <div className="pt-3 border-t border-slate-200 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <button className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shadow-xs transition-colors flex items-center justify-center gap-1.5">
              <Phone className="w-3.5 h-3.5" />
              <span>Appeler</span>
            </button>
            <button className="px-3 py-2 border border-slate-200 rounded-lg font-bold text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-1.5">
              <Send className="w-3.5 h-3.5" />
              <span>Envoyer un message</span>
            </button>
          </div>
          <button className="w-full px-3 py-2 bg-red-50 text-red-700 border border-red-200 rounded-lg font-bold hover:bg-red-100 transition-colors flex items-center justify-center gap-1.5">
            <UserX className="w-3.5 h-3.5" />
            <span>Suspendre le compte</span>
          </button>
        </div>

      </aside>

    </div>
  );
}