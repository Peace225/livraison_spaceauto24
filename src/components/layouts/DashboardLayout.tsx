'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Truck, 
  Activity, 
  Menu, 
  X, 
  LogOut,
  Map
} from 'lucide-react';

// Navigation dynamique qui sera filtrée par le RBAC selon le rôle connecté[cite: 1]
const navigation = [
  { name: 'Command Center', href: '/command-center', icon: Activity, roles: ['SuperAdmin', 'OpsManager'] },
  { name: 'OPS Queue', href: '/ops', icon: LayoutDashboard, roles: ['SuperAdmin', 'OpsManager', 'OpsAgent'] },
  { name: 'Partenaire', href: '/partner', icon: Users, roles: ['SuperAdmin', 'Partner'] },
  { name: 'Livreur', href: '/driver', icon: Truck, roles: ['SuperAdmin', 'Driver'] },
  { name: 'Super Admin', href: '/super-admin', icon: Map, roles: ['SuperAdmin'] },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  // Horloge locale
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('fr-CI', { timeZone: 'Africa/Abidjan', hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      
      {/* Overlay Mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-gray-900/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto flex flex-col ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-16 px-6 bg-slate-950">
          <span className="text-lg font-bold tracking-wide">Delivery <span className="text-blue-500">OPS</span></span>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button className="flex items-center space-x-3 text-slate-400 hover:text-white w-full px-4 py-2 transition-colors">
            <LogOut className="w-5 h-5" />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 z-10">
          <div className="flex items-center">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden mr-4 text-gray-500 hover:text-gray-700"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-semibold text-gray-800 capitalize hidden sm:block">
              {pathname.split('/')[1]?.replace('-', ' ') || 'Dashboard'}
            </h1>
          </div>
          
          <div className="flex items-center space-x-4 sm:space-x-6">
            <div className="hidden sm:flex text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              Abidjan : {currentTime}
            </div>
            
            <div className="flex items-center space-x-3 border-l border-gray-200 pl-4 sm:pl-6">
              <div className="flex flex-col items-end hidden sm:flex">
                <span className="text-sm font-bold text-gray-900">Moussa K.</span>
                <span className="text-xs text-gray-500">Livreur</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-100 border-2 border-blue-500 flex items-center justify-center text-blue-700 font-bold uppercase">
                MK
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}