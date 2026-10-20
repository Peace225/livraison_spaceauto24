'use client';

import React, { useState, useMemo } from 'react';
import { MissionRecord, MissionOfficialStatus } from '@/types';
import {
  Filter,
  RotateCcw,
  Download,
  Columns,
  List,
  Map as MapIcon,
  Eye,
  MoreVertical,
  X,
  Phone,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  Clock,
  FileText,
  MessageSquare,
  Calendar,
  MapPin,
  Search
} from 'lucide-react';

const INITIAL_MISSIONS: MissionRecord[] = [
  {
    missionId: 'DLV-2026-001245',
    orderId: 'CMD-001458',
    pickupZone: 'Marcory',
    deliveryZone: 'Marcory Résidentiel',
    vendorName: 'AutoPièces Express',
    vendorAddress: 'Marcory Zone 4',
    customerName: 'K. Kouadio',
    customerAddress: 'Marcory Résidentiel, À côté de la pharmacie',
    partnerName: 'Express CI',
    driverName: 'Jean K.',
    driverCode: 'DRV-0102',
    circuitType: 'PARTNER_MANUAL',
    status: 'EN_COURS',
    priority: 'Normale',
    type: 'Standard',
    createdAt: '23 Juil. 2026 à 14:20',
    expectedAt: '23 Juil. 2026 à 16:00',
    deliveryFeeFcfa: 2000,
    paymentMethod: 'Espèces',
    instructions: 'Appeler le client 10 min avant l’arrivée.',
    articles: [
      { ref: 'FO-001', name: 'Filtre à huile', qty: 1 },
      { ref: 'PF-002', name: 'Plaquettes frein', qty: 1 },
      { ref: 'BT-003', name: 'Batterie 12V 70Ah', qty: 1 },
    ],
  },
  {
    missionId: 'DLV-2026-001244',
    orderId: 'CMD-001457',
    pickupZone: 'Cocody',
    deliveryZone: 'Angré',
    vendorName: 'Moto Top',
    vendorAddress: 'Cocody Riviera 2',
    customerName: 'S. Traoré',
    customerAddress: 'Cocody Angré 8e Tranche',
    partnerName: 'Moto Top',
    driverName: 'Koffi A.',
    driverCode: 'DRV-0143',
    circuitType: 'AFFILIATED_DRIVER_AUTO',
    status: 'A_ASSIGNER',
    priority: 'Haute',
    type: 'Standard',
    createdAt: '23 Juil. 2026 à 13:56',
    expectedAt: '23 Juil. 2026 à 15:30',
    deliveryFeeFcfa: 2500,
    paymentMethod: 'Wave',
    instructions: 'Colis fragile.',
    articles: [{ ref: 'AM-019', name: 'Amortisseur avant', qty: 2 }],
  },
  {
    missionId: 'DLV-2026-001243',
    orderId: 'CMD-001456',
    pickupZone: 'Yopougon',
    deliveryZone: 'Plateau',
    vendorName: 'Speed Livreur',
    vendorAddress: 'Yopougon Andokoi',
    customerName: 'A. Diarra',
    customerAddress: 'Plateau Immeuble Sciam',
    partnerName: 'Speed Livreur',
    driverName: 'Ibrahim T.',
    driverCode: 'DRV-0089',
    circuitType: 'PARTNER_MANUAL',
    status: 'ASSIGNEE',
    priority: 'Normale',
    type: 'Standard',
    createdAt: '23 Juil. 2026 à 13:42',
    expectedAt: '23 Juil. 2026 à 15:00',
    deliveryFeeFcfa: 2000,
    paymentMethod: 'Espèces',
    instructions: 'Remise contre signature.',
    articles: [{ ref: 'PL-005', name: 'Bougies d’allumage', qty: 4 }],
  },
  {
    missionId: 'DLV-2026-001242',
    orderId: 'CMD-001455',
    pickupZone: 'Treichville',
    deliveryZone: 'Marcory',
    vendorName: 'Express CI',
    vendorAddress: 'Treichville Arras',
    customerName: 'M. Koné',
    customerAddress: 'Marcory Zone 4C',
    partnerName: 'Express CI',
    driverName: 'Jean K.',
    driverCode: 'DRV-0102',
    circuitType: 'PARTNER_MANUAL',
    status: 'EN_COURS',
    priority: 'Normale',
    type: 'Retrait',
    createdAt: '23 Juil. 2026 à 12:18',
    expectedAt: '23 Juil. 2026 à 14:00',
    deliveryFeeFcfa: 1500,
    paymentMethod: 'Orange Money',
    instructions: 'Ras.',
    articles: [{ ref: 'FL-002', name: 'Filtre à air', qty: 1 }],
  },
  {
    missionId: 'DLV-2026-001241',
    orderId: 'CMD-001454',
    pickupZone: 'Koumassi',
    deliveryZone: 'Port-Bouët',
    vendorName: 'Liva Auto',
    vendorAddress: 'Koumassi Remblai',
    customerName: 'C. Bamba',
    customerAddress: 'Port-Bouët Aeroport',
    partnerName: 'Liva Auto',
    driverName: 'Abou B.',
    driverCode: 'DRV-0312',
    circuitType: 'AFFILIATED_DRIVER_AUTO',
    status: 'TERMINEE',
    priority: 'Normale',
    type: 'Standard',
    createdAt: '23 Juil. 2026 à 11:45',
    expectedAt: '23 Juil. 2026 à 13:20',
    deliveryFeeFcfa: 3000,
    paymentMethod: 'Espèces',
    instructions: 'Livré et validé par OTP.',
    articles: [{ ref: 'BD-010', name: 'Plaquettes de frein', qty: 1 }],
    otpValidatedAt: '13:18:00',
    deliveredAt: '13:19:00',
    customerConfirmedAt: '13:19:30',
    completedAt: '23 Juil. 2026 à 13:20:00',
  },
  {
    missionId: 'DLV-2026-001240',
    orderId: 'CMD-001453',
    pickupZone: 'Plateau',
    deliveryZone: 'Cocody',
    vendorName: 'Moto Top',
    vendorAddress: 'Plateau Indépendance',
    customerName: 'K. Yao',
    customerAddress: 'Cocody Riviera Palmeraie',
    partnerName: 'Moto Top',
    driverName: 'Koffi A.',
    driverCode: 'DRV-0143',
    circuitType: 'AFFILIATED_DRIVER_AUTO',
    status: 'INCIDENT',
    priority: 'Haute',
    type: 'Standard',
    createdAt: '23 Juil. 2026 à 10:32',
    expectedAt: '23 Juil. 2026 à 12:00',
    deliveryFeeFcfa: 2500,
    paymentMethod: 'Wave',
    instructions: 'Client absent.',
    articles: [{ ref: 'RT-004', name: 'Rétroviseur droit', qty: 1 }],
  },
];

const STATUS_BADGE: Record<MissionOfficialStatus, { label: string; className: string }> = {
  A_ASSIGNER: { label: 'À assigner', className: 'bg-amber-50 text-amber-700 border-amber-200' },
  ASSIGNEE: { label: 'Assignée', className: 'bg-sky-50 text-sky-700 border-sky-200' },
  A_RECUPERER: { label: 'À récupérer', className: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  COLIS_RECUPERE: { label: 'Colis récupéré', className: 'bg-purple-50 text-purple-700 border-purple-200' },
  EN_COURS: { label: 'En cours', className: 'bg-blue-50 text-blue-700 border-blue-200' },
  LIVREE: { label: 'Livrée', className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  CONFIRMEE_DESTINATAIRE: { label: 'Confirmée', className: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
  TERMINEE: { label: 'Terminée', className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  INCIDENT: { label: 'Incident', className: 'bg-red-50 text-red-700 border-red-200' },
  ANNULEE: { label: 'Annulée', className: 'bg-slate-100 text-slate-600 border-slate-300' },
};

export default function MissionsPage() {
  const [selectedZone, setSelectedZone] = useState<string>('ALL');
  const [selectedPartner, setSelectedPartner] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [selectedPriority, setSelectedPriority] = useState<string>('ALL');
  const [tableSearch, setTableSearch] = useState<string>('');
  const [activeMissionId, setActiveMissionId] = useState<string | null>('DLV-2026-001245');
  const [rightTab, setRightTab] = useState<'apercu' | 'chronologie' | 'documents' | 'messages'>('apercu');

  const filteredMissions = useMemo(() => {
    return INITIAL_MISSIONS.filter((m) => {
      if (selectedZone !== 'ALL' && m.pickupZone !== selectedZone) return false;
      if (selectedPartner !== 'ALL' && m.partnerName !== selectedPartner) return false;
      if (selectedStatus !== 'ALL' && m.status !== selectedStatus) return false;
      if (selectedPriority !== 'ALL' && m.priority !== selectedPriority) return false;
      if (tableSearch) {
        const q = tableSearch.toLowerCase();
        return m.missionId.toLowerCase().includes(q) || m.orderId.toLowerCase().includes(q) || m.customerName.toLowerCase().includes(q);
      }
      return true;
    });
  }, [selectedZone, selectedPartner, selectedStatus, selectedPriority, tableSearch]);

  const activeMission = useMemo(() => INITIAL_MISSIONS.find((m) => m.missionId === activeMissionId) || INITIAL_MISSIONS[0], [activeMissionId]);

  return (
    <div className="flex flex-col xl:flex-row gap-5 items-start text-xs">
      
      {/* COLONNE GAUCHE / CENTRALE : KPI, FILTRES ET TABLEAU */}
      <div className="flex-1 min-w-0 w-full space-y-4">
        
        {/* En-tête titre + Bouton nouvelle mission */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-extrabold text-slate-900">Missions</h1>
            <p className="text-xs text-slate-500">Gestion et suivi de toutes les missions de livraison SpaceAuto24</p>
          </div>
          <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs">
            + Nouvelle mission
          </button>
        </div>

        {/* 1. BARRE DE FILTRE SUPÉRIEURE */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Du 17/07/2026 au 23/07/2026</span>
            </div>

            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium"
            >
              <option value="ALL">Toutes les zones</option>
              <option value="Marcory">Marcory</option>
              <option value="Cocody">Cocody</option>
              <option value="Yopougon">Yopougon</option>
              <option value="Treichville">Treichville</option>
              <option value="Plateau">Plateau</option>
            </select>

            <select
              value={selectedPartner}
              onChange={(e) => setSelectedPartner(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium"
            >
              <option value="ALL">Tous les partenaires</option>
              <option value="Express CI">Express CI</option>
              <option value="Moto Top">Moto Top</option>
              <option value="Speed Livreur">Speed Livreur</option>
              <option value="Liva Auto">Liva Auto</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium"
            >
              <option value="ALL">Tous les statuts</option>
              <option value="A_ASSIGNER">À assigner</option>
              <option value="ASSIGNEE">Assignée</option>
              <option value="EN_COURS">En cours</option>
              <option value="TERMINEE">Terminée</option>
              <option value="INCIDENT">Incident</option>
            </select>

            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium"
            >
              <option value="ALL">Toutes les priorités</option>
              <option value="Haute">Haute</option>
              <option value="Normale">Normale</option>
              <option value="Basse">Basse</option>
            </select>

            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span>Filtres avancés</span>
            </button>
          </div>

          <button
            onClick={() => {
              setSelectedZone('ALL');
              setSelectedPartner('ALL');
              setSelectedStatus('ALL');
              setSelectedPriority('ALL');
              setTableSearch('');
            }}
            className="flex items-center gap-1 text-slate-500 hover:text-slate-900 font-medium"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Réinitialiser</span>
          </button>
        </div>

        {/* 2. LES 5 CARTES KPI PRINCIPALES */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-[11px] text-slate-500 font-semibold">Toutes les missions</span>
            <div className="text-xl font-extrabold text-slate-900 mt-1">456</div>
            <span className="text-[10px] text-emerald-600 font-bold">↑ +12% • Sur la période</span>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-[11px] text-slate-500 font-semibold">À assigner</span>
            <div className="text-xl font-extrabold text-amber-600 mt-1">24</div>
            <span className="text-[10px] text-emerald-600 font-bold">↑ +8% • En attente d&apos;affectation</span>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-[11px] text-slate-500 font-semibold">En cours</span>
            <div className="text-xl font-extrabold text-blue-600 mt-1">56</div>
            <span className="text-[10px] text-emerald-600 font-bold">↑ +15% • En livraison</span>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-[11px] text-slate-500 font-semibold">Terminées</span>
            <div className="text-xl font-extrabold text-emerald-600 mt-1">128</div>
            <span className="text-[10px] text-emerald-600 font-bold">↑ +20% • Aujourd&apos;hui</span>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-[11px] text-slate-500 font-semibold">Incidents</span>
            <div className="text-xl font-extrabold text-red-600 mt-1">8</div>
            <span className="text-[10px] text-red-500 font-bold">↓ -25% • Nécessitent une action</span>
          </div>
        </div>

        {/* Barre de recherche tableau + Outils export/colonnes */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={tableSearch}
                onChange={(e) => setTableSearch(e.target.value)}
                placeholder="Rechercher une mission, un numéro de commande, un client..."
                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-lg text-slate-700 font-medium hover:bg-slate-50">
                <Download className="w-3.5 h-3.5" />
                <span>Exporter</span>
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-lg text-slate-700 font-medium hover:bg-slate-50">
                <Columns className="w-3.5 h-3.5" />
                <span>Colonnes</span>
              </button>
              <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                <button className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white font-bold">
                  <List className="w-3.5 h-3.5" />
                  <span>Liste</span>
                </button>
                <button disabled className="flex items-center gap-1 px-3 py-1.5 bg-slate-50 text-slate-400 font-medium">
                  <MapIcon className="w-3.5 h-3.5" />
                  <span>Carte</span>
                </button>
              </div>
            </div>
          </div>

          {/* Onglets de filtres rapides */}
          <div className="flex items-center gap-2 pt-1 border-t border-slate-100 font-bold">
            {[
              { id: 'ALL', label: 'Toutes (456)' },
              { id: 'A_ASSIGNER', label: 'À assigner (24)' },
              { id: 'EN_COURS', label: 'En cours (56)' },
              { id: 'TERMINEE', label: 'Terminées (128)' },
              { id: 'INCIDENT', label: 'Incidents (8)' },
              { id: 'ANNULEE', label: 'Annulées (12)' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedStatus(tab.id === 'ALL' ? 'ALL' : tab.id)}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  selectedStatus === tab.id || (tab.id === 'ALL' && selectedStatus === 'ALL')
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3. TABLEAU DES MISSIONS */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase">
                  <th className="py-2.5 px-3 w-8"><input type="checkbox" /></th>
                  <th className="py-2.5 px-3"># Mission</th>
                  <th className="py-2.5 px-3">Commande</th>
                  <th className="py-2.5 px-3">Zone</th>
                  <th className="py-2.5 px-3">Partenaire</th>
                  <th className="py-2.5 px-3">Client</th>
                  <th className="py-2.5 px-3">Statut</th>
                  <th className="py-2.5 px-3">Priorité</th>
                  <th className="py-2.5 px-3">Type</th>
                  <th className="py-2.5 px-3">Créée le</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredMissions.map((m) => {
                  const badge = STATUS_BADGE[m.status];
                  const isSelected = activeMission?.missionId === m.missionId;
                  return (
                    <tr
                      key={m.missionId}
                      onClick={() => setActiveMissionId(m.missionId)}
                      className={`cursor-pointer transition-colors ${isSelected ? 'bg-blue-50/60' : 'hover:bg-slate-50'}`}
                    >
                      <td className="py-3 px-3" onClick={(e) => e.stopPropagation()}><input type="checkbox" /></td>
                      <td className="py-3 px-3 font-bold text-slate-900">{m.missionId}</td>
                      <td className="py-3 px-3 text-blue-600 font-medium">{m.orderId}</td>
                      <td className="py-3 px-3 text-slate-700">{m.pickupZone}</td>
                      <td className="py-3 px-3 text-slate-700">{m.partnerName || 'Indépendant'}</td>
                      <td className="py-3 px-3 text-slate-700">{m.customerName}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${badge.className}`}>
                          {badge.label}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${m.priority === 'Haute' ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-600'}`}>
                          {m.priority}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-600">{m.type}</td>
                      <td className="py-3 px-3 text-slate-500">{m.createdAt}</td>
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
            <span>1-10 sur 456 missions</span>
            <div className="flex items-center gap-1">
              <span className="px-2 py-1 bg-blue-600 text-white rounded font-bold">1</span>
              <span className="px-2 py-1 hover:bg-slate-200 rounded cursor-pointer">2</span>
              <span className="px-2 py-1 hover:bg-slate-200 rounded cursor-pointer">3</span>
              <span>...</span>
              <span className="px-2 py-1 hover:bg-slate-200 rounded cursor-pointer">46</span>
            </div>
          </div>
        </div>

        {/* 4. BLOCS INFÉRIEURS : STATISTIQUES DE LA SÉLECTION & SUIVI RAPIDE */}
        {activeMission && (
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="font-bold text-slate-800">Statistiques de la sélection (1 mission)</span>
              <span className="font-bold text-blue-600">{activeMission.missionId}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
              <div className="space-y-1.5 text-slate-600">
                <div className="flex justify-between"><span>Commande :</span><strong className="text-slate-900">{activeMission.orderId}</strong></div>
                <div className="flex justify-between"><span>Client :</span><strong className="text-slate-900">{activeMission.customerName}</strong></div>
                <div className="flex justify-between"><span>Zone :</span><strong className="text-slate-900">{activeMission.pickupZone}</strong></div>
                <div className="flex justify-between"><span>Partenaire :</span><strong className="text-slate-900">{activeMission.partnerName || 'Indépendant'}</strong></div>
              </div>

              {/* Suivi rapide pas à pas */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="font-bold text-slate-700 block">Suivi rapide</span>
                <div className="flex items-center justify-between relative px-2">
                  <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-emerald-500 z-0" />
                  
                  <div className="z-10 flex flex-col items-center text-center">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px]">✓</span>
                    <span className="text-[10px] font-bold text-slate-700 mt-1">Créée</span>
                  </div>
                  <div className="z-10 flex flex-col items-center text-center">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px]">✓</span>
                    <span className="text-[10px] font-bold text-slate-700 mt-1">Assignée</span>
                  </div>
                  <div className="z-10 flex flex-col items-center text-center">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px]">➔</span>
                    <span className="text-[10px] font-bold text-blue-600 mt-1">En cours</span>
                  </div>
                  <div className="z-10 flex flex-col items-center text-center">
                    <span className="w-6 h-6 rounded-full bg-slate-300 text-slate-600 flex items-center justify-center font-bold text-[10px]">○</span>
                    <span className="text-[10px] text-slate-400 mt-1">Arrivée</span>
                  </div>
                  <div className="z-10 flex flex-col items-center text-center">
                    <span className="w-6 h-6 rounded-full bg-slate-300 text-slate-600 flex items-center justify-center font-bold text-[10px]">○</span>
                    <span className="text-[10px] text-slate-400 mt-1">Terminée</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 5. PANNEAU LATÉRAL DROIT : DÉTAILS DE LA MISSION */}
      {activeMission && (
        <aside className="w-full xl:w-96 bg-white rounded-xl border border-slate-200 shadow-xs shrink-0 overflow-hidden p-4 space-y-4">
          
          {/* En-tête panneau */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="font-extrabold text-slate-900 block text-sm">{activeMission.missionId}</span>
              <span className="text-[11px] text-slate-400">Commande : {activeMission.orderId}</span>
            </div>
            <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full font-bold text-[10px] border border-blue-200">
              En cours
            </span>
          </div>

          {/* Stepper horizontal étape par étape */}
          <div className="flex items-center justify-between px-2 py-2 bg-slate-50 rounded-lg text-[10px] font-bold text-slate-600">
            <div className="flex flex-col items-center text-emerald-600"><span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[9px]">1</span>Récupération</div>
            <div className="flex flex-col items-center text-blue-600"><span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[9px]">2</span>En transit</div>
            <div className="flex flex-col items-center text-slate-400"><span className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[9px]">3</span>Livraison</div>
            <div className="flex flex-col items-center text-slate-400"><span className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[9px]">4</span>Terminée</div>
          </div>

          {/* Onglets du panneau droit */}
          <div className="grid grid-cols-4 border-b border-slate-200 text-[11px] font-bold text-center">
            {(['apercu', 'chronologie', 'documents', 'messages'] as const).map((t) => (
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
              
              {/* Acteurs */}
              <div className="space-y-2">
                <span className="font-bold text-slate-700 block">Acteurs</span>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Vendeur</span>
                    <p className="font-bold text-slate-800">{activeMission.vendorName}</p>
                    <p className="text-[10px] text-slate-500">{activeMission.vendorAddress}</p>
                    <p className="text-[10px] text-blue-600 font-semibold mt-1">Tél : 07 12 34 56 78</p>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Client</span>
                    <p className="font-bold text-slate-800">{activeMission.customerName}</p>
                    <p className="text-[10px] text-slate-500">Marcory Résidentiel</p>
                    <p className="text-[10px] text-blue-600 font-semibold mt-1">Tél : +225 07 08 09 10</p>
                  </div>
                </div>
              </div>

              {/* Adresses */}
              <div className="space-y-2">
                <span className="font-bold text-slate-700 block">Adresses</span>
                <div className="space-y-1.5 text-[11px]">
                  <div className="p-2 bg-emerald-50/50 border border-emerald-200 rounded-lg flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-emerald-900 block">Récupération (Vendeur)</strong>
                      <span className="text-slate-600">{activeMission.vendorAddress} • {activeMission.vendorName}</span>
                    </div>
                  </div>
                  <div className="p-2 bg-red-50/50 border border-red-200 rounded-lg flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-red-900 block">Livraison (Client)</strong>
                      <span className="text-slate-600">{activeMission.customerAddress}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Informations mission */}
              <div className="space-y-1.5 border-t border-slate-100 pt-3">
                <span className="font-bold text-slate-700 block mb-1">Informations mission</span>
                <div className="flex justify-between"><span className="text-slate-500">Zone :</span><strong className="text-slate-800">{activeMission.pickupZone}</strong></div>
                <div className="flex justify-between"><span className="text-slate-500">Partenaire :</span><strong className="text-slate-800">{activeMission.partnerName || 'Indépendant'}</strong></div>
                <div className="flex justify-between"><span className="text-slate-500">Livreur :</span><strong className="text-emerald-600 font-bold">{activeMission.driverName} • En ligne</strong></div>
                <div className="flex justify-between"><span className="text-slate-500">Type :</span><strong className="text-slate-800">Livraison</strong></div>
                <div className="flex justify-between"><span className="text-slate-500">Priorité :</span><strong className="text-slate-800">Normale</strong></div>
                <div className="flex justify-between"><span className="text-slate-500">Créée le :</span><strong className="text-slate-800">{activeMission.createdAt}</strong></div>
                <div className="flex justify-between"><span className="text-slate-500">Prévue le :</span><strong className="text-slate-800">{activeMission.expectedAt}</strong></div>
                <div className="flex justify-between"><span className="text-slate-500">Mode de paiement :</span><strong className="text-slate-800">{activeMission.paymentMethod}</strong></div>
                <div className="flex justify-between"><span className="text-slate-500">Montant livraison :</span><strong className="text-blue-700 font-bold">{activeMission.deliveryFeeFcfa.toLocaleString('fr-FR')} FCFA</strong></div>
                <div className="flex justify-between"><span className="text-slate-500">Instructions :</span><span className="text-slate-700 text-right">{activeMission.instructions}</span></div>
              </div>

              {/* Articles (3) */}
              <div className="border-t border-slate-100 pt-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-700">Articles ({activeMission.articles.length})</span>
                  <span className="text-blue-600 font-semibold cursor-pointer hover:underline">Voir tous les articles →</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {activeMission.articles.map((art) => (
                    <div key={art.ref} className="p-2 bg-slate-50 rounded-lg border border-slate-200 text-center space-y-1">
                      <div className="w-8 h-8 mx-auto bg-slate-200 rounded flex items-center justify-center font-bold text-slate-600 text-[10px]">IMG</div>
                      <p className="font-bold text-slate-800 truncate">{art.name}</p>
                      <p className="text-[10px] text-slate-500">Réf. {art.ref}<br />Qté : {art.qty}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {rightTab === 'chronologie' && (
            <div className="space-y-3 text-slate-600">
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100"><strong className="text-slate-900 block">14:20 — Mission créée</strong></div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100"><strong className="text-slate-900 block">14:32 — Affectation confirmée</strong></div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100"><strong className="text-slate-900 block">15:10 — En cours de livraison</strong></div>
            </div>
          )}

          {rightTab === 'documents' && (
            <div className="space-y-2 text-slate-600">
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
                <span>Bon de prise en charge</span>
                <span className="text-blue-600 font-semibold cursor-pointer">Télécharger</span>
              </div>
            </div>
          )}

          {rightTab === 'messages' && (
            <div className="space-y-2 text-slate-600">
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                <span className="font-bold text-slate-900 block">14:36 — Mission prise en charge</span>
                <span className="text-[10px] text-slate-400">Équipe informée</span>
              </div>
            </div>
          )}

          {/* Boutons d'action en bas du panneau droit */}
          <div className="pt-3 border-t border-slate-200 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <button className="px-3 py-2 border border-slate-200 rounded-lg font-semibold text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-1">
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Voir la commande</span>
              </button>
              <button className="px-3 py-2 border border-slate-200 rounded-lg font-semibold text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-1">
                <Phone className="w-3.5 h-3.5" />
                <span>Contacter</span>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button className="px-3 py-2 bg-red-50 text-red-700 border border-red-200 rounded-lg font-semibold hover:bg-red-100 flex items-center justify-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Signaler un incident</span>
              </button>
              <button className="px-3 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Marquer comme terminée</span>
              </button>
            </div>
          </div>

        </aside>
      )}

    </div>
  );
}