'use client';

import { useEffect, useMemo, useState } from 'react';
import { useCommandCenterStore } from './store';
import { createClient } from '@/lib/supabase/client';
import { 
  Package, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Users, 
  ShieldCheck, 
  TrendingUp, 
  MapPin, 
  Eye, 
  Truck
} from 'lucide-react';
import type { Mission } from '@/types';

export default function CommandCenterPage() {
  const { 
    missions,
    setMissions,
    updateMissionStatus,
  } = useCommandCenterStore();

  const supabase = useMemo(() => createClient(), []);
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | '7days' | '30days'>('today');

  useEffect(() => {
    const fetchInitialData = async () => {
      const { data, error } = await supabase
        .from('delivery_missions')
        .select('*');
      
      if (!error && data) {
        setMissions(data as Mission[]);
      }
    };

    fetchInitialData();

    const commandCenterChannel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'delivery_missions' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newMission = payload.new as Mission;
            setMissions([...useCommandCenterStore.getState().missions, newMission]);
          } 
          else if (payload.eventType === 'UPDATE') {
            const updatedMission = payload.new as Mission;
            const missionId = updatedMission.mission_id || (updatedMission as any).MissionID;
            if (missionId) {
              updateMissionStatus(missionId, updatedMission.Status);
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(commandCenterChannel);
    };
  }, [supabase, setMissions, updateMissionStatus]);

  return (
    <div className="space-y-4 text-slate-800 text-xs pb-10">
      
      {/* 1. BARRE DE FILTRE SUPÉRIEURE */}
      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex bg-slate-100 p-1 rounded-lg font-semibold">
          <button 
            onClick={() => setSelectedPeriod('today')}
            className={`px-3 py-1 rounded-md transition-colors ${selectedPeriod === 'today' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Aujourd&apos;hui
          </button>
          <button 
            onClick={() => setSelectedPeriod('7days')}
            className={`px-3 py-1 rounded-md transition-colors ${selectedPeriod === '7days' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
          >
            7 jours
          </button>
          <button 
            onClick={() => setSelectedPeriod('30days')}
            className={`px-3 py-1 rounded-md transition-colors ${selectedPeriod === '30days' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
          >
            30 jours
          </button>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-700">
          <MapPin className="w-3.5 h-3.5 text-slate-400" />
          <span>Toutes les zones (Abidjan)</span>
        </div>
      </div>

      {/* 2. LIGNE DES 6 KPI ORIGINAUX */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 font-medium">
            <span>Missions en attente</span>
            <Package className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-xl font-extrabold text-slate-900 mt-1">24</div>
          <span className="text-[10px] text-emerald-600 font-bold">↑ +12% • À assigner</span>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 font-medium">
            <span>Missions en cours</span>
            <Clock className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-xl font-extrabold text-slate-900 mt-1">56</div>
          <span className="text-[10px] text-emerald-600 font-bold">↑ +8% • En livraison</span>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 font-medium">
            <span>Missions terminées</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl font-extrabold text-slate-900 mt-1">128</div>
          <span className="text-[10px] text-emerald-600 font-bold">↑ +15% • Aujourd&apos;hui</span>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 font-medium">
            <span>Incidents</span>
            <AlertTriangle className="w-4 h-4 text-red-500" />
          </div>
          <div className="text-xl font-extrabold text-red-600 mt-1">8</div>
          <span className="text-[10px] text-red-500 font-bold">3 critiques</span>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 font-medium">
            <span>Partenaires actifs</span>
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-xl font-extrabold text-slate-900 mt-1">12 / 15</div>
          <span className="text-[10px] text-amber-600 font-bold">3 saturés</span>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 font-medium">
            <span>Taux de réussite SLA</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl font-extrabold text-emerald-700 mt-1">96%</div>
          <span className="text-[10px] text-emerald-600 font-bold">↑ +2% • Objectif : 95%</span>
        </div>
      </div>

      {/* 3. BLOC CENTRAL : GRAPHIQUE SVG, RÉPARTITION, CARTE D'ABIDJAN & HEALTH SCORE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        
        {/* Graphique d'Évolution des missions */}
        <div className="lg:col-span-4 bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between font-bold text-slate-700">
            <span>Évolution des missions</span>
            <span className="text-[11px] text-blue-600 font-normal cursor-pointer hover:underline">7 derniers jours ▼</span>
          </div>
          
          <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-600">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> En attente</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500" /> En cours</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Terminées</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" /> Incidents</span>
          </div>

          <div className="h-36 bg-slate-50 rounded-lg border border-slate-200 relative p-2 flex flex-col justify-end">
            <svg className="absolute inset-0 w-full h-full p-2" viewBox="0 0 300 100" preserveAspectRatio="none">
              <path d="M 0 70 Q 75 40 150 45 T 300 25" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
              <path d="M 0 50 Q 75 30 150 25 T 300 10" fill="none" stroke="#3b82f6" strokeWidth="2.5" />
              <path d="M 0 80 Q 75 55 150 35 T 300 15" fill="none" stroke="#10b981" strokeWidth="2.5" />
              <path d="M 0 92 Q 75 88 150 85 T 300 80" fill="none" stroke="#ef4444" strokeWidth="2" />
            </svg>
            <div className="w-full flex justify-between text-[9px] text-slate-400 z-10 pt-2 border-t border-slate-200 mt-auto">
              <span>17 Juil</span><span>18 Juil</span><span>19 Juil</span><span>20 Juil</span><span>21 Juil</span><span>22 Juil</span><span>23 Juil</span>
            </div>
          </div>
        </div>

        {/* Répartition des missions (Donut) */}
        <div className="lg:col-span-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between font-bold text-slate-700">
            <span>Répartition des missions</span>
            <span className="text-slate-900">456 Total</span>
          </div>
          <div className="h-36 flex items-center justify-between bg-slate-50 rounded-lg border border-slate-200 px-4">
            <div className="relative w-24 h-24 rounded-full border-7 border-blue-500 border-t-emerald-500 border-r-amber-500 border-b-red-500 flex items-center justify-center text-center font-extrabold text-slate-800">
              456
            </div>
            <div className="space-y-1 text-[10px] font-semibold text-slate-600">
              <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500" /> En cours 33%</div>
              <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Terminées 56%</div>
              <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500" /> En attente 7%</div>
              <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500" /> Incidents 4%</div>
            </div>
          </div>
        </div>

        {/* Carte des missions en temps réel (Abidjan - Épingles de zones géographiques) */}
        <div className="lg:col-span-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between font-bold text-slate-700">
            <span>Carte des missions en temps réel</span>
            <span className="text-[10px] text-slate-400">Toutes les zones ▼</span>
          </div>
          <div className="h-36 bg-sky-50/80 rounded-lg border border-slate-200 flex flex-col items-center justify-center p-2 relative overflow-hidden shadow-inner">
            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#38bdf8_1.5px,transparent_1.5px)] [background-size:14px_14px]" />
            
            {/* Épingles géographiques interactives d'Abidjan */}
            <div className="absolute top-3 left-4 flex flex-col items-center animate-bounce">
              <span className="px-1.5 py-0.5 bg-blue-600 text-white rounded text-[8px] font-bold shadow-xs">COCODY (14)</span>
              <span className="w-2 h-2 bg-blue-600 rotate-45 -mt-0.5" />
            </div>

            <div className="absolute top-8 right-5 flex flex-col items-center">
              <span className="px-1.5 py-0.5 bg-emerald-600 text-white rounded text-[8px] font-bold shadow-xs">MARCORY (10)</span>
              <span className="w-2 h-2 bg-emerald-600 rotate-45 -mt-0.5" />
            </div>

            <div className="absolute bottom-4 left-5 flex flex-col items-center">
              <span className="px-1.5 py-0.5 bg-amber-600 text-white rounded text-[8px] font-bold shadow-xs">YOPOUGON (8)</span>
              <span className="w-2 h-2 bg-amber-600 rotate-45 -mt-0.5" />
            </div>

            <div className="absolute bottom-5 right-10 flex flex-col items-center">
              <span className="px-1.5 py-0.5 bg-red-600 text-white rounded text-[8px] font-bold shadow-xs">PLATEAU (5)</span>
              <span className="w-2 h-2 bg-red-600 rotate-45 -mt-0.5" />
            </div>

            <div className="z-10 mt-auto bg-white/90 backdrop-blur-xs px-2.5 py-0.5 rounded border border-slate-200 text-[9px] font-extrabold text-slate-700 shadow-xs">
              ABIDJAN — Mode Zonal V1 (Sans GPS)
            </div>
          </div>
        </div>

        {/* Delivery Health Score */}
        <div className="lg:col-span-2 bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between items-center text-center">
          <div className="w-full flex items-center justify-between font-bold text-slate-700">
            <span>Health Score</span>
            <span className="text-[10px] text-blue-600 cursor-pointer hover:underline">Voir détails</span>
          </div>
          <div className="my-1 relative w-14 h-14 rounded-full border-4 border-emerald-500 flex items-center justify-center bg-emerald-50">
            <span className="text-sm font-black text-emerald-700">96%</span>
          </div>
          <div>
            <span className="font-bold text-emerald-600 block text-[10px]">Excellente performance</span>
            <span className="text-[9px] text-slate-400">Toutes les opérations sont stables</span>
          </div>
        </div>
      </div>

      {/* 4. OPERATIONS TIMELINE (Dernières opérations avec Icônes) */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs space-y-2.5">
        <div className="flex items-center justify-between font-bold text-slate-700">
          <span>Operations Timeline (dernières opérations)</span>
          <span className="text-blue-600 font-normal cursor-pointer hover:underline">Voir tout</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          
          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-slate-900">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <Package className="w-3.5 h-3.5" />
              </span>
              <span>14:25</span>
            </div>
            <p className="font-semibold text-slate-800">Mission prise en charge</p>
            <p className="text-[10px] text-slate-500">DLV-2026-001245<br />Express CI</p>
          </div>

          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-slate-900">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <Truck className="w-3.5 h-3.5" />
              </span>
              <span>14:18</span>
            </div>
            <p className="font-semibold text-slate-800">Colis récupéré</p>
            <p className="text-[10px] text-slate-500">DLV-2026-001243<br />Speed Livreur</p>
          </div>

          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-slate-900">
              <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                <Clock className="w-3.5 h-3.5" />
              </span>
              <span>14:10</span>
            </div>
            <p className="font-semibold text-slate-800">En route vers le client</p>
            <p className="text-[10px] text-slate-500">DLV-2026-001241<br />Liva Auto</p>
          </div>

          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-slate-900">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </span>
              <span>13:55</span>
            </div>
            <p className="font-semibold text-slate-800">Livraison terminée</p>
            <p className="text-[10px] text-slate-500">DLV-2026-001241<br />Liva Auto</p>
          </div>

          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-slate-900">
              <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-3.5 h-3.5" />
              </span>
              <span>13:40</span>
            </div>
            <p className="font-semibold text-slate-800">Incident ouvert</p>
            <p className="text-[10px] text-slate-500">DLV-2026-001240<br />Moto Top</p>
          </div>

          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 space-y-1 sm:col-span-2">
            <div className="flex items-center gap-1.5 font-bold text-slate-900">
              <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                <Users className="w-3.5 h-3.5" />
              </span>
              <span>13:20</span>
            </div>
            <p className="font-semibold text-slate-800">Partenaire connecté</p>
            <p className="text-[10px] text-slate-500">Moto Top • 3 nouveaux livreurs</p>
          </div>

        </div>
      </div>

      {/* 5. GRILLE INFÉRIEURE : MISSIONS RÉCENTES, PARTENAIRES, LIVREURS EN LIGNE, PERF PAR ZONE & ALERTES & INCIDENTS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        
        {/* Missions récentes */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 shadow-xs p-3.5 space-y-3">
          <div className="flex items-center justify-between font-bold text-slate-700">
            <span>Missions récentes</span>
            <span className="text-[11px] text-blue-600 font-normal cursor-pointer hover:underline">Voir tout</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-[10px] text-slate-400 uppercase bg-slate-50 font-bold border-b border-slate-100">
                <tr>
                  <th className="px-2 py-1.5"># Mission</th>
                  <th className="px-2 py-1.5">Zone</th>
                  <th className="px-2 py-1.5">Statut</th>
                  <th className="px-2 py-1.5">Heure</th>
                  <th className="px-2 py-1.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { id: 'DLV-001245', zone: 'Marcory', status: 'En cours', time: '14:25', bg: 'bg-blue-50 text-blue-700 border-blue-200' },
                  { id: 'DLV-001244', zone: 'Cocody', status: 'À récupérer', time: '14:10', bg: 'bg-amber-50 text-amber-700 border-amber-200' },
                  { id: 'DLV-001243', zone: 'Yopougon', status: 'Assignée', time: '13:55', bg: 'bg-sky-50 text-sky-700 border-sky-200' },
                  { id: 'DLV-001242', zone: 'Treichville', status: 'En cours', time: '13:40', bg: 'bg-blue-50 text-blue-700 border-blue-200' },
                  { id: 'DLV-2026-001241', zone: 'Koumassi', status: 'Terminée', time: '13:20', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
                ].map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50">
                    <td className="px-2 py-2 font-bold text-slate-900">{row.id}</td>
                    <td className="px-2 py-2 text-slate-600">{row.zone}</td>
                    <td className="px-2 py-2">
                      <span className={`px-2 py-0.5 rounded font-bold text-[10px] border ${row.bg}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-2 py-2 text-slate-500">{row.time}</td>
                    <td className="px-2 py-2 text-right">
                      <button className="p-1 text-slate-400 hover:text-slate-700"><Eye className="w-3.5 h-3.5 inline" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Colonne centrale basse : Partenaires (Logos stylisés) & Livreurs en ligne (Photos avatars) */}
        <div className="lg:col-span-4 space-y-3">
          
          {/* Partenaires */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-3.5 space-y-2">
            <div className="flex items-center justify-between font-bold text-slate-700">
              <span>Partenaires</span>
              <span className="text-[11px] text-blue-600 font-normal cursor-pointer hover:underline">Voir tout</span>
            </div>
            <div className="space-y-1.5">
              {[
                { name: 'Express CI', logoBg: 'bg-red-600 text-white', missions: 28, status: 'Actif', success: '98%' },
                { name: 'Moto Top', logoBg: 'bg-blue-600 text-white', missions: 22, status: 'Actif', success: '95%' },
                { name: 'Speed Livreur', logoBg: 'bg-amber-600 text-white', missions: 18, status: 'Saturé', success: '93%' },
              ].map((p) => (
                <div key={p.name} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className={`w-6 h-6 rounded-md font-extrabold text-[10px] flex items-center justify-center shrink-0 ${p.logoBg}`}>
                      {p.name.substring(0, 2).toUpperCase()}
                    </span>
                    <span className="font-bold text-slate-900">{p.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <span>{p.missions}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${p.status === 'Actif' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>{p.status}</span>
                    <span className="font-bold text-slate-800">{p.success}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Livreurs en ligne (Avec Avatars) */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-3.5 space-y-2">
            <div className="flex items-center justify-between font-bold text-slate-700">
              <span>Livreurs en ligne</span>
              <span className="text-[11px] text-blue-600 font-normal cursor-pointer hover:underline">Voir tout</span>
            </div>
            <div className="space-y-1.5">
              {[
                { name: 'Kouassi Jean', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80', state: 'En ligne', load: '2 missions' },
                { name: 'Diabaté Moussa', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80', state: 'En ligne', load: '1 mission' },
                { name: 'Konan Yao', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80', state: 'Hors ligne', load: '0 mission' },
              ].map((l) => (
                <div key={l.name} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="flex items-center gap-2">
                    <img src={l.avatar} alt={l.name} className="w-6 h-6 rounded-full object-cover border border-slate-200 shrink-0" />
                    <span className="font-bold text-slate-900">{l.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <span className={`flex items-center gap-1 font-semibold ${l.state === 'En ligne' ? 'text-emerald-600' : 'text-slate-400'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${l.state === 'En ligne' ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                      {l.state}
                    </span>
                    <span className="text-slate-500">{l.load}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Colonne droite basse : Alertes & Incidents & Performance par zone */}
        <div className="lg:col-span-4 space-y-3">
          
          {/* Bloc Alertes & Incidents */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-3.5 space-y-2.5">
            <div className="flex items-center justify-between font-bold text-slate-700">
              <span>Alertes & Incidents</span>
              <span className="text-[11px] text-blue-600 font-normal cursor-pointer hover:underline">Voir tout</span>
            </div>
            <div className="space-y-2 text-[11px]">
              <div className="p-2 bg-red-50/70 border border-red-200 rounded-lg flex items-start gap-2">
                <AlertTriangle className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-bold text-red-900 leading-tight">Retard de récupération</p>
                  <p className="text-[10px] text-red-700">DLV-2026-001242 • Il y a 12 min</p>
                </div>
              </div>

              <div className="p-2 bg-amber-50/70 border border-amber-200 rounded-lg flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-bold text-amber-900 leading-tight">Livreur injoignable</p>
                  <p className="text-[10px] text-amber-700">DLV-2026-001240 • Il y a 25 min</p>
                </div>
              </div>
            </div>
          </div>

          {/* Performance par zone */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-3.5 space-y-2.5">
            <div className="flex items-center justify-between font-bold text-slate-700">
              <span>Performance par zone</span>
              <span className="text-[11px] text-blue-600 font-normal cursor-pointer hover:underline">Voir tout</span>
            </div>
            <div className="space-y-2">
              {[
                { zone: 'Marcory', count: 85, pct: '98%' },
                { zone: 'Cocody', count: 72, pct: '95%' },
                { zone: 'Yopougon', count: 68, pct: '94%' },
                { zone: 'Treichville', count: 56, pct: '92%' },
              ].map((z) => (
                <div key={z.zone} className="space-y-0.5">
                  <div className="flex justify-between font-semibold text-slate-700 text-[10px]">
                    <span>{z.zone}</span>
                    <span>{z.count} missions • {z.pct}</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: z.pct }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}