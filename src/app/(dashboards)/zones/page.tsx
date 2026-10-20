'use client';

import React, { useState } from 'react';
import { 
  MapPin, 
  DollarSign, 
  Layers, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  ShieldCheck, 
  Plus,
  Truck,
  MoreVertical
} from 'lucide-react';

interface ZoneItem {
  id: string;
  nom: string;
  communes: string;
  tarifBaseFcfa: number;
  delaiMoyen: string;
  partenairesActifs: number;
  statut: 'Active' | 'Saturée' | 'Maintenance';
}

const ZONES_LIST: ZoneItem[] = [
  { id: 'ZN-01', nom: 'Zone Nord (Cocody / Angré)', communes: 'Cocody, Bingerville, Abobo', tarifBaseFcfa: 2000, delaiMoyen: '45 min', partenairesActifs: 5, statut: 'Active' },
  { id: 'ZN-02', nom: 'Zone Sud (Marcory / Zone 4)', communes: 'Marcory, Treichville, Port-Bouët', tarifBaseFcfa: 1500, delaiMoyen: '30 min', partenairesActifs: 6, statut: 'Active' },
  { id: 'ZN-03', nom: 'Zone Ouest (Yopougon / Attécoubé)', communes: 'Yopougon, Attécoubé', tarifBaseFcfa: 2500, delaiMoyen: '60 min', partenairesActifs: 3, statut: 'Saturée' },
  { id: 'ZN-04', nom: 'Zone Centre (Plateau / Adjamé)', communes: 'Plateau, Adjamé', tarifBaseFcfa: 1500, delaiMoyen: '25 min', partenairesActifs: 4, statut: 'Active' },
  { id: 'ZN-05', nom: 'Zone Est (Koumassi)', communes: 'Koumassi', tarifBaseFcfa: 2000, delaiMoyen: '40 min', partenairesActifs: 3, statut: 'Active' },
];

export default function ZonesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-5 text-slate-800 text-xs">
      
      {/* En-tête de la page */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900">Zones & Tarifs</h1>
          <p className="text-xs text-slate-500">Configuration des secteurs géographiques d'Abidjan, des tarifs de livraison et des délais</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5">
          <Plus className="w-3.5 h-3.5" />
          <span>+ Nouvelle zone</span>
        </button>
      </div>

      {/* Cartes KPI Zones */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Zones Couvertes</span>
            <div className="text-2xl font-black text-slate-900 mt-1">5 Secteurs</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <MapPin className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-emerald-100 bg-emerald-50/20 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] text-emerald-600 font-bold uppercase tracking-wider">Tarif de base moyen</span>
            <div className="text-2xl font-black text-emerald-700 mt-1">1 900 FCFA</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Délai moyen global</span>
            <div className="text-2xl font-black text-slate-900 mt-1">40 minutes</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
            <Layers className="w-5 h-5" />
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
            placeholder="Rechercher une zone ou une commune..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
          />
        </div>

        <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-lg text-slate-700 font-medium hover:bg-slate-50">
          <Download className="w-3.5 h-3.5" />
          <span>Exporter les tarifs</span>
        </button>
      </div>

      {/* Tableau des Zones & Tarifs */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase">
                <th className="py-3 px-4"># ID</th>
                <th className="py-3 px-3">Nom de la zone</th>
                <th className="py-3 px-3">Communes rattachées</th>
                <th className="py-3 px-3">Tarif de base (FCFA)</th>
                <th className="py-3 px-3">Délai moyen</th>
                <th className="py-3 px-3">Partenaires actifs</th>
                <th className="py-3 px-3">Statut</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium">
              {ZONES_LIST.map((zone) => (
                <tr key={zone.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{zone.id}</td>
                  <td className="py-3.5 px-3 text-slate-900 font-extrabold">{zone.nom}</td>
                  <td className="py-3.5 px-3 text-slate-700">{zone.communes}</td>
                  <td className="py-3.5 px-3 text-blue-600 font-bold">{zone.tarifBaseFcfa.toLocaleString()} FCFA</td>
                  <td className="py-3.5 px-3 text-slate-800">{zone.delaiMoyen}</td>
                  <td className="py-3.5 px-3 font-bold text-slate-800">{zone.partenairesActifs} partenaires</td>
                  <td className="py-3.5 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      zone.statut === 'Active' 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                        : zone.statut === 'Saturée' 
                        ? 'bg-amber-50 text-amber-700 border-amber-200' 
                        : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}>
                      {zone.statut}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-[11px] shadow-xs transition-colors">
                      Configurer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-slate-500 text-[11px]">
          <span>1-5 sur 5 zones configurées à Abidjan</span>
          <div className="flex items-center gap-1 font-bold">
            <span className="px-2 py-1 bg-blue-600 text-white rounded">1</span>
          </div>
        </div>
      </div>

    </div>
  );
}