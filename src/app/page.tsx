import Link from 'next/link';
import { Truck, Users, Activity, LayoutDashboard, Shield } from 'lucide-react';

export default function Home() {
  return (
    <main className="p-8 max-w-6xl mx-auto min-h-screen flex flex-col justify-center">
      <div className="mb-12">
        <h1 className="text-5xl font-black text-gray-900 tracking-tight">
          SPACEAUTO24 <span className="text-blue-600">DELIVERY</span>
        </h1>
        <p className="text-gray-500 mt-2 text-lg font-medium">
          Portail d'accès aux environnements de développement (V1)
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link 
          href="/partner" 
          className="p-6 bg-white border border-gray-200 rounded-2xl hover:shadow-lg hover:border-blue-300 transition-all group"
        >
          <Users className="w-8 h-8 text-blue-600 mb-4 group-hover:scale-110 transition-transform" />
          <h2 className="text-xl font-bold text-gray-900">Partner Dashboard</h2>
          <p className="text-sm text-gray-500 mt-1">Gestion des missions et livreurs</p>
        </Link>

        <Link 
          href="/driver" 
          className="p-6 bg-white border border-gray-200 rounded-2xl hover:shadow-lg hover:border-green-300 transition-all group"
        >
          <Truck className="w-8 h-8 text-green-600 mb-4 group-hover:scale-110 transition-transform" />
          <h2 className="text-xl font-bold text-gray-900">Driver Mobile</h2>
          <p className="text-sm text-gray-500 mt-1">Application mobile-first du livreur</p>
        </Link>

        <Link 
          href="/ops" 
          className="p-6 bg-white border border-gray-200 rounded-2xl hover:shadow-lg hover:border-orange-300 transition-all group"
        >
          <LayoutDashboard className="w-8 h-8 text-orange-600 mb-4 group-hover:scale-110 transition-transform" />
          <h2 className="text-xl font-bold text-gray-900">Operations Center</h2>
          <p className="text-sm text-gray-500 mt-1">Traitement de l'OPS Queue</p>
        </Link>

        <Link 
          href="/command-center" 
          className="p-6 bg-slate-900 text-white rounded-2xl hover:shadow-lg hover:bg-slate-800 transition-all group lg:col-span-2"
        >
          <Activity className="w-8 h-8 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
          <h2 className="text-xl font-bold">Command Center</h2>
          <p className="text-sm text-slate-400 mt-1">Supervision globale en temps réel</p>
        </Link>

        <Link 
          href="/super-admin" 
          className="p-6 bg-white border border-gray-200 rounded-2xl hover:shadow-lg hover:border-purple-300 transition-all group"
        >
          <Shield className="w-8 h-8 text-purple-600 mb-4 group-hover:scale-110 transition-transform" />
          <h2 className="text-xl font-bold text-gray-900">Super Admin</h2>
          <p className="text-sm text-gray-500 mt-1">Configuration et paramétrage</p>
        </Link>
      </div>
    </main>
  );
}