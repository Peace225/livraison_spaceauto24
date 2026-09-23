import { create } from 'zustand';
import type { Mission, Partner, Incident } from '@/types';

interface CommandCenterState {
  // Données
  missions: Mission[];
  partners: Partner[];
  incidents: Incident[];
  
  // Indicateurs (Panneau 1 à 4)
  activeMissionsCount: number;
  availablePartnersCount: number;
  criticalIncidentsCount: number;
  
  // Actions de mise à jour (à lier ultérieurement avec Supabase Realtime)
  setMissions: (missions: Mission[]) => void;
  setPartners: (partners: Partner[]) => void;
  setIncidents: (incidents: Incident[]) => void;
  updateMissionStatus: (missionId: string, status: Mission['Status']) => void;
}

export const useCommandCenterStore = create<CommandCenterState>((set) => ({
  missions: [],
  partners: [],
  incidents: [],
  
  activeMissionsCount: 0,
  availablePartnersCount: 0,
  criticalIncidentsCount: 0,

  setMissions: (missions) => set({ 
    missions, 
    activeMissionsCount: missions.filter(m => 
      !['MISSION_COMPLETED', 'MISSION_CANCELLED', 'DELIVERY_FAILED'].includes(m.Status)
    ).length 
  }),
  
  setPartners: (partners) => set({ 
    partners,
    availablePartnersCount: partners.filter(p => p.AvailabilityStatus === 'Disponible').length
  }),
  
  setIncidents: (incidents) => set({ 
    incidents,
    criticalIncidentsCount: incidents.filter(i => i.Severity === 'Critique' && i.Status === 'Ouvert').length
  }),

  updateMissionStatus: (missionId, status) => set((state) => ({
    missions: state.missions.map(m => 
      m.MissionID === missionId ? { ...m, Status: status, UpdatedAt: new Date().toISOString() } : m
    )
  }))
}));