'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Activity,
  ClipboardList,
  Layers,
  AlertTriangle,
  Building2,
  Truck,
  MapPin,
  Clock,
  History,
  BarChart3,
  Settings,
  Search,
  Bell,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react';

export type UserRole =
  | 'SuperAdmin'
  | 'OpsManager'
  | 'OpsAgent'
  | 'Partner'
  | 'Driver';

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  roles: UserRole[];
  badgeCount?: number;
  badgeVariant?: 'blue' | 'red';
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  user?: {
    name: string;
    roleLabel: string;
    role: UserRole;
    initials: string;
    online?: boolean;
  };
  counters?: {
    missions?: number;
    opsQueue?: number;
    incidents?: number;
  };
  onGlobalSearch?: (query: string) => void;
}

export default function DashboardLayout({
  children,
  user = {
    name: 'M. Traoré Ibrahim',
    roleLabel: 'Superviseur OPS',
    role: 'OpsManager',
    initials: 'TI',
    online: true,
  },
  counters = {
    missions: 24,
    opsQueue: 12,
    incidents: 3,
  },
  onGlobalSearch,
}: DashboardLayoutProps) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [formattedDate, setFormattedDate] = useState('');
  const [formattedTime, setFormattedTime] = useState('');

  // Calcul exact de la date et de l'heure locale d'Abidjan
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const dateStr = new Intl.DateTimeFormat('fr-FR', {
        timeZone: 'Africa/Abidjan',
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }).format(now);

      const timeStr = new Intl.DateTimeFormat('fr-FR', {
        timeZone: 'Africa/Abidjan',
        hour: '2-digit',
        minute: '2-digit',
      }).format(now);

      setFormattedDate(dateStr.charAt(0).toUpperCase() + dateStr.slice(1));
      setFormattedTime(timeStr);
    };

    updateDateTime();
    const timer = setInterval(updateDateTime, 15000);
    return () => clearInterval(timer);
  }, []);

  const navigation: NavItem[] = [
    {
      name: 'Operations Center',
      href: '/command-center',
      icon: Activity,
      roles: ['SuperAdmin', 'OpsManager', 'OpsAgent'],
    },
    {
      name: 'Missions',
      href: '/missions',
      icon: ClipboardList,
      roles: ['SuperAdmin', 'OpsManager', 'OpsAgent', 'Partner', 'Driver'],
      badgeCount: counters.missions,
      badgeVariant: 'blue',
    },
    {
      name: 'OPS Queue',
      href: '/ops',
      icon: Layers,
      roles: ['SuperAdmin', 'OpsManager', 'OpsAgent'],
      badgeCount: counters.opsQueue,
      badgeVariant: 'red',
    },
    {
      name: 'Incidents',
      href: '/incidents',
      icon: AlertTriangle,
      roles: ['SuperAdmin', 'OpsManager', 'OpsAgent', 'Partner', 'Driver'],
      badgeCount: counters.incidents,
      badgeVariant: 'red',
    },
    {
      name: 'Partenaires',
      href: '/partenaires',
      icon: Building2,
      roles: ['SuperAdmin', 'OpsManager', 'OpsAgent'],
    },
    {
      name: 'Livreurs',
      href: '/livreurs',
      icon: Truck,
      roles: ['SuperAdmin', 'OpsManager', 'OpsAgent', 'Partner'],
    },
    {
      name: 'Zones & Tarifs',
      href: '/zones',
      icon: MapPin,
      roles: ['SuperAdmin', 'OpsManager'],
    },
    {
      name: 'SLA',
      href: '/sla',
      icon: Clock,
      roles: ['SuperAdmin', 'OpsManager', 'OpsAgent'],
    },
    {
      name: 'Operations Timeline',
      href: '/operations-timeline',
      icon: History,
      roles: ['SuperAdmin', 'OpsManager', 'OpsAgent'],
    },
    {
      name: 'Rapports',
      href: '/rapports',
      icon: BarChart3,
      roles: ['SuperAdmin', 'OpsManager'],
    },
    {
      name: 'Paramètres',
      href: '/parametres',
      icon: Settings,
      roles: ['SuperAdmin'],
    },
  ];

  const allowedNavigation = navigation.filter((item) =>
    item.roles.includes(user.role)
  );

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onGlobalSearch) {
      onGlobalSearch(searchQuery.trim());
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden text-slate-900">
      {/* Overlay Mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-20 bg-slate-950/60 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Attrayante et Scrollbar Ultra-Fine */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 bg-gradient-to-b from-[#0B1120] to-[#04070E] text-slate-200 transition-all duration-300 ease-in-out lg:static flex flex-col justify-between border-r border-slate-800/80 shadow-xl ${
          isCollapsed ? 'w-20' : 'w-64'
        } ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* En-tête Logo */}
        <div>
          <div className="flex items-center justify-between h-16 px-4 bg-[#070B14]/80 backdrop-blur-md border-b border-slate-800/80">
            <Link href="/missions" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 border border-blue-400/30 flex items-center justify-center shrink-0 shadow-lg shadow-blue-900/30 group-hover:scale-105 transition-transform">
                <Truck className="w-5 h-5 text-white" />
              </div>
              {!isCollapsed && (
                <div className="flex flex-col leading-none">
                  <span className="text-sm font-black tracking-wider text-white">
                    SPACEAUTO<span className="text-red-500">24</span>
                  </span>
                  <span className="text-[9px] tracking-[0.25em] text-slate-400 font-bold mt-1">
                    DELIVERY
                  </span>
                </div>
              )}
            </Link>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white"
              aria-label="Fermer le menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Liste des modules avec Scrollbar ultrafine personnalisée */}
          <nav className="px-3 py-4 space-y-1.5 overflow-y-auto max-h-[calc(100vh-210px)] scrollbar-thin scrollbar-thumb-slate-700/50 scrollbar-track-transparent hover:scrollbar-thumb-slate-600">
            {allowedNavigation.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  title={isCollapsed ? item.name : undefined}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 group ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md shadow-blue-600/25'
                      : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'}`} />
                    {!isCollapsed && (
                      <span className="truncate tracking-wide">{item.name}</span>
                    )}
                  </div>

                  {!isCollapsed &&
                    typeof item.badgeCount === 'number' &&
                    item.badgeCount > 0 && (
                      <span
                        className={`px-2 py-0.5 text-[10px] font-black rounded-full shadow-xs ${
                          item.badgeVariant === 'red'
                            ? 'bg-red-500 text-white animate-pulse'
                            : isActive
                            ? 'bg-blue-800 text-white'
                            : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        }`}
                      >
                        {item.badgeCount}
                      </span>
                    )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Pied de Sidebar : Devise + Aide + Réduire le menu */}
        <div className="p-3 border-t border-slate-800/80 space-y-3 bg-[#04070E]/80 backdrop-blur-md">
          {!isCollapsed && (
            <>
              <div className="px-2 py-1">
                <p className="text-[11px] font-medium text-slate-400 leading-snug italic">
                  &laquo; La logistique au service du commerce automobile &raquo;
                </p>
              </div>

              <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 shadow-inner">
                <div className="w-7 h-7 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/20">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[11px] font-bold text-slate-200">
                    Besoin d&apos;aide ?
                  </span>
                  <span className="text-[10px] text-blue-400 truncate cursor-pointer hover:underline font-medium">
                    Centre d&apos;assistance
                  </span>
                </div>
              </div>
            </>
          )}

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex items-center justify-center w-full gap-2 px-3 py-2 text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-xl transition-colors border border-slate-800/40"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <>
                <ChevronLeft className="w-4 h-4" />
                <span>Réduire le menu</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* Zone Principale */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar Officielle */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 shrink-0 z-10 shadow-xs">
          <div className="flex items-center gap-3 flex-1 max-w-xl">
            <button
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden text-slate-500 hover:text-slate-700"
              aria-label="Ouvrir le menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher (mission, commande, destinataire, livreur...)"
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all shadow-inner"
              />
            </form>
          </div>

          {/* Actions Droite */}
          <div className="flex items-center gap-4 sm:gap-5 ml-4">
            <button
              className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-ping" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            <div className="flex items-center gap-2.5 border-l border-slate-200 pl-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-md shadow-blue-600/20">
                {user.initials}
              </div>
              <div className="hidden md:flex flex-col leading-tight">
                <span className="text-xs font-bold text-slate-900">
                  {user.name}
                </span>
                <span className="text-[11px] text-slate-500 font-medium">
                  {user.roleLabel}
                </span>
              </div>
            </div>

            <div className="hidden sm:flex flex-col items-end border-l border-slate-200 pl-4 leading-tight">
              <span className="text-[11px] text-slate-500 font-medium">
                {formattedDate}
              </span>
              <span className="text-xs font-extrabold text-slate-900">
                {formattedTime}
              </span>
            </div>

            <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>En ligne</span>
            </div>
          </div>
        </header>

        {/* Contenu de la page */}
        <main className="flex-1 overflow-y-auto bg-slate-50/70 p-4 sm:p-6">
          <div className="mx-auto max-w-[1600px]">{children}</div>
        </main>
      </div>
    </div>
  );
}