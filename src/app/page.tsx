import Link from 'next/link';
import { Truck, Users, Activity, LayoutDashboard, Shield, ArrowUpRight, Sparkles, Terminal } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-6 md:p-16 selection:bg-blue-500 selection:text-white relative overflow-hidden">
      
      {/* Effets lumineux d'arrière-plan (Ambient Glows) */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* En-tête / Header */}
      <div className="max-w-6xl mx-auto w-full pt-8 pb-12 relative z-10">
        <div className="flex items-center justify-between mb-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
            Environnement de Test V1 • Live
          </span>
          <span className="text-xs font-mono text-slate-500 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-slate-400" /> Next.js 16 • Supabase SSR
          </span>
        </div>
        
        <h1 className="text-4xl md:text-7xl font-black tracking-tight text-white">
          SPACEAUTO24 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-600">DELIVERY</span>
        </h1>
        <p className="text-slate-400 mt-4 text-lg font-light max-w-2xl leading-relaxed">
          Portail logistique unifié. Sélectionnez un module ci-dessous pour inspecter les différents environnements opérationnels et flux de livraison.
        </p>
      </div>

      {/* Grille des Portails (Style Glassmorphism Premium) */}
      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-16 relative z-10">
        
        {/* Partner Dashboard */}
        <Link 
          href="/partner" 
          className="group relative bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 p-8 rounded-3xl hover:border-blue-500/50 hover:bg-slate-900/90 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          <div>
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all shadow-inner">
              <Users className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tight text-white">Partner Dashboard</h2>
              <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
            <p className="text-sm text-slate-400 mt-2.5 leading-relaxed font-light">
              Gestion centralisée des missions, attribution des courses et suivi des livreurs partenaires.
            </p>
          </div>
          <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-blue-400">
            <span>Accéder au portail</span>
            <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
          </div>
        </Link>

        {/* Driver Mobile */}
        <Link 
          href="/driver" 
          className="group relative bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 p-8 rounded-3xl hover:border-emerald-500/50 hover:bg-slate-900/90 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          <div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all shadow-inner">
              <Truck className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tight text-white">Driver Mobile</h2>
              <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
            <p className="text-sm text-slate-400 mt-2.5 leading-relaxed font-light">
              Interface mobile-first dédiée aux livreurs pour l'acceptation et la validation des étapes sur terrain.
            </p>
          </div>
          <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-emerald-400">
            <span>Accéder au portail</span>
            <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
          </div>
        </Link>

        {/* Operations Center */}
        <Link 
          href="/ops" 
          className="group relative bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 p-8 rounded-3xl hover:border-amber-500/50 hover:bg-slate-900/90 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-amber-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          <div>
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 group-hover:bg-amber-500/20 transition-all shadow-inner">
              <LayoutDashboard className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tight text-white">Operations Center</h2>
              <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
            <p className="text-sm text-slate-400 mt-2.5 leading-relaxed font-light">
              Traitement en temps réel de la file d'attente opérationnelle (OPS Queue) et gestion proactive des litiges.
            </p>
          </div>
          <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-amber-400">
            <span>Accéder au portail</span>
            <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
          </div>
        </Link>

        {/* Command Center (Mise en avant sur 2 colonnes avec effet néon) */}
        <Link 
          href="/command-center" 
          className="group relative bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/40 text-white p-8 rounded-3xl border border-blue-500/30 hover:border-blue-500/60 transition-all duration-300 flex flex-col justify-between overflow-hidden lg:col-span-2 shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors pointer-events-none -mr-20 -mt-20" />
          <div>
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform shadow-inner">
              <Activity className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                Command Center <Sparkles className="w-5 h-5 text-blue-400" />
              </h2>
              <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
            <p className="text-sm text-slate-300 mt-2.5 leading-relaxed max-w-xl font-light">
              Supervision globale de la flotte, télémétrie des flux logistiques en direct et indicateurs clés de performance de la plateforme.
            </p>
          </div>
          <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-blue-400">
            <span>Lancer le centre de commande exécutif</span>
            <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
          </div>
        </Link>

        {/* Super Admin */}
        <Link 
          href="/super-admin" 
          className="group relative bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 p-8 rounded-3xl hover:border-purple-500/50 hover:bg-slate-900/90 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          <div>
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 group-hover:bg-purple-500/20 transition-all shadow-inner">
              <Shield className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tight text-white">Super Admin</h2>
              <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
            <p className="text-sm text-slate-400 mt-2.5 leading-relaxed font-light">
              Configuration système, paramétrage global des règles métiers et administration des accès.
            </p>
          </div>
          <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-purple-400">
            <span>Accéder à l'administration</span>
            <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
          </div>
        </Link>

      </div>

      {/* Footer minimaliste élégant */}
      <footer className="max-w-6xl mx-auto w-full pt-8 border-t border-slate-900 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
        <p>&copy; 2026 SpaceAuto24 Delivery. Tous droits réservés.</p>
        <div className="flex items-center gap-6">
          <span className="inline-flex items-center gap-2 text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" /> 
            API & Database Connectées
          </span>
        </div>
      </footer>

    </main>
  );
}