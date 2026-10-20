'use client';

import { useState } from 'react';
import { MapPin, Package, Navigation, CheckCircle, AlertTriangle, Store, User, ListOrdered, Map as MapIcon, Phone, ExternalLink, Sparkles, ShieldCheck } from 'lucide-react';

type DriverStep = 'EN_ROUTE_VENDOR' | 'AT_VENDOR' | 'EN_ROUTE_CUSTOMER' | 'AT_CUSTOMER' | 'OTP_VALIDATION';

export default function DriverDashboardPage() {
  const [isAvailable, setIsAvailable] = useState(true);
  const [currentStep, setCurrentStep] = useState<DriverStep>('EN_ROUTE_VENDOR');
  const [otpCode, setOtpCode] = useState('');

  const driverInfo = {
    name: 'Koffi Jean',
    matricule: 'DRV-0842',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    rating: '4.92',
    todaysEarnings: '24 500 FCFA'
  };

  const pendingMissionsCount = 4; 

  const missionData = {
    id: 'DLV-000245',
    pickup: {
      name: 'AutoParts Express',
      address: 'Marcory Zone 4, Rue Pierre et Marie Curie',
      phone: '01 02 03 04 05',
      instruction: 'Demander le gérant M. Koné. Carton lourd.',
      geo: { url: 'https://www.google.com/maps/search/?api=1&query=5.3013,-3.9904' }
    },
    delivery: {
      name: 'Garage Moderne',
      address: 'Yopougon Z.I., face à la station',
      phone: '05 06 07 08 09',
      instruction: 'Déposer directement à l\'atelier mécanique.',
      geo: { url: 'https://www.google.com/maps/search/?api=1&query=5.3344,-4.0622' }
    }
  };

  const handleNextStep = () => {
    if (currentStep === 'EN_ROUTE_VENDOR') setCurrentStep('AT_VENDOR');
    else if (currentStep === 'AT_VENDOR') setCurrentStep('EN_ROUTE_CUSTOMER');
    else if (currentStep === 'EN_ROUTE_CUSTOMER') setCurrentStep('AT_CUSTOMER');
    else if (currentStep === 'AT_CUSTOMER') setCurrentStep('OTP_VALIDATION');
  };

  return (
    <div className="max-w-md mx-auto bg-slate-950 text-slate-100 min-h-screen flex flex-col selection:bg-blue-500 selection:text-white">
      
      {/* Effet lumineux d'arrière-plan */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-blue-600/15 rounded-full blur-[100px] pointer-events-none" />

      {/* En-tête Moderne (Profil + Statut Glissant) */}
      <div className="bg-slate-900/80 backdrop-blur-xl p-4 border-b border-slate-800/80 flex items-center justify-between sticky top-0 z-20 shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img 
              src={driverInfo.photoUrl} 
              alt={driverInfo.name} 
              className="w-11 h-11 rounded-full object-cover ring-2 ring-blue-500/50 shadow-md"
            />
            <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-slate-900 ${isAvailable ? 'bg-emerald-500 animate-pulse' : 'bg-slate-500'}`} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="font-bold text-white text-sm tracking-wide">{driverInfo.name}</h2>
              <span className="text-[10px] bg-amber-500/10 text-amber-400 font-bold px-1.5 py-0.5 rounded border border-amber-500/20 flex items-center gap-0.5">
                ★ {driverInfo.rating}
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-400 font-medium">{driverInfo.matricule} • <strong className="text-emerald-400">{driverInfo.todaysEarnings}</strong></span>
          </div>
        </div>

        <button 
          onClick={() => setIsAvailable(!isAvailable)}
          className={`px-3.5 py-1.5 rounded-full font-bold text-xs transition-all shadow-md shrink-0 flex items-center gap-1.5 ${
            isAvailable 
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-emerald-900/20' 
              : 'bg-slate-800 text-slate-400 border border-slate-700'
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-emerald-400' : 'bg-slate-500'}`} />
          {isAvailable ? 'En ligne' : 'Hors ligne'}
        </button>
      </div>

      <div className="flex-1 p-4 flex flex-col space-y-4 relative z-10">
        
        {/* Indicateur de tournée élégant */}
        {pendingMissionsCount > 0 && (
          <div className="bg-gradient-to-r from-blue-950/60 to-indigo-950/60 border border-blue-500/30 rounded-2xl p-3.5 flex items-center justify-between backdrop-blur-md shadow-xl">
            <div className="flex items-center space-x-2.5 text-blue-300">
              <div className="p-2 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-400">
                <ListOrdered className="w-4 h-4"/>
              </div>
              <div>
                <span className="text-xs font-bold block text-white">File d'attente active</span>
                <span className="text-[10px] text-blue-400">Tournée optimisée Abidjan</span>
              </div>
            </div>
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-black px-2.5 py-1 rounded-xl shadow-lg shadow-blue-600/30">
              +{pendingMissionsCount} courses
            </span>
          </div>
        )}

        {/* Carte de la Mission Actuelle (Glassmorphism) */}
        <div className="bg-slate-900/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-800/80 overflow-hidden">
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950/50 to-slate-900 p-4.5 flex justify-between items-center border-b border-slate-800/80">
            <div>
              <span className="text-[10px] text-blue-400 uppercase font-black tracking-widest flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Mission Active
              </span>
              <h2 className="text-xl font-black text-white mt-0.5 font-mono">{missionData.id}</h2>
            </div>
            <div className="text-xs font-black bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3 py-1.5 rounded-xl">
              1 / {pendingMissionsCount + 1}
            </div>
          </div>

          <div className="p-5 space-y-5">
            
            {/* Point A : Vendeur */}
            <div className="relative pl-2 border-l-2 border-blue-500/50">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-500/10 border border-blue-500/20 p-2.5 rounded-2xl text-blue-400 mt-0.5">
                  <Store className="w-4 h-4"/>
                </div>
                <div className="flex-1">
                  <p className="text-[10px] text-blue-400 font-extrabold uppercase tracking-wider mb-0.5">Point A • Retrait Vendeur</p>
                  <p className="font-bold text-white text-base">{missionData.pickup.name}</p>
                  <p className="text-xs text-slate-400 leading-tight mt-0.5">{missionData.pickup.address}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    <a href={`tel:${missionData.pickup.phone}`} className="flex items-center space-x-1.5 bg-slate-800/80 hover:bg-slate-800 text-slate-200 px-3 py-2 rounded-xl text-xs font-bold transition-all border border-slate-700/50 shadow-sm">
                      <Phone className="w-3.5 h-3.5 text-blue-400"/>
                      <span>{missionData.pickup.phone}</span>
                    </a>
                    <a href={missionData.pickup.geo.url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1.5 bg-blue-600/20 border border-blue-500/30 hover:bg-blue-600/30 text-blue-300 px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-sm">
                      <MapIcon className="w-3.5 h-3.5"/>
                      <span>GPS Vendeur</span>
                      <ExternalLink className="w-3 h-3 ml-0.5 opacity-70"/>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />

            {/* Point B : Client */}
            <div className="relative pl-2 border-l-2 border-emerald-500/50">
              <div className="flex items-start space-x-3">
                <div className="bg-emerald-500/10 border border-emerald-500/20 p-2.5 rounded-2xl text-emerald-400 mt-0.5">
                  <User className="w-4 h-4"/>
                </div>
                <div className="flex-1">
                  <p className="text-[10px] text-emerald-400 font-extrabold uppercase tracking-wider mb-0.5">Point B • Livraison Client</p>
                  <p className="font-bold text-white text-base">{missionData.delivery.name}</p>
                  <p className="text-xs text-slate-400 leading-tight mt-0.5">{missionData.delivery.address}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    <a href={`tel:${missionData.delivery.phone}`} className="flex items-center space-x-1.5 bg-slate-800/80 hover:bg-slate-800 text-slate-200 px-3 py-2 rounded-xl text-xs font-bold transition-all border border-slate-700/50 shadow-sm">
                      <Phone className="w-3.5 h-3.5 text-emerald-400"/>
                      <span>{missionData.delivery.phone}</span>
                    </a>
                    <a href={missionData.delivery.geo.url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1.5 bg-emerald-600/20 border border-emerald-500/30 hover:bg-emerald-600/30 text-emerald-300 px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-sm">
                      <MapIcon className="w-3.5 h-3.5"/>
                      <span>GPS Client</span>
                      <ExternalLink className="w-3 h-3 ml-0.5 opacity-70"/>
                    </a>
                  </div>
                  
                  <div className="mt-3 bg-amber-500/10 border border-amber-500/20 p-3 rounded-2xl flex items-start space-x-2.5 backdrop-blur-md">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-200/90 font-medium leading-relaxed">{missionData.delivery.instruction}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Boutons d'Action Dynamiques (Style Néon / Gradient) */}
        <div className="flex-1 flex flex-col justify-end mt-4 pb-2">
          {currentStep === 'EN_ROUTE_VENDOR' && (
            <button onClick={handleNextStep} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-4.5 rounded-2xl font-black text-base shadow-xl shadow-blue-600/25 active:scale-95 transition-all flex items-center justify-center space-x-2 border border-blue-400/30">
              <Navigation className="w-5 h-5"/>
              <span>Je suis arrivé chez le Vendeur</span>
            </button>
          )}

          {currentStep === 'AT_VENDOR' && (
            <button onClick={handleNextStep} className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white py-4.5 rounded-2xl font-black text-base shadow-xl shadow-indigo-600/25 active:scale-95 transition-all flex items-center justify-center space-x-2 border border-indigo-400/30">
              <Package className="w-5 h-5"/>
              <span>Le colis est récupéré</span>
            </button>
          )}

          {currentStep === 'EN_ROUTE_CUSTOMER' && (
            <button onClick={handleNextStep} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-4.5 rounded-2xl font-black text-base shadow-xl shadow-blue-600/25 active:scale-95 transition-all flex items-center justify-center space-x-2 border border-blue-400/30">
              <Navigation className="w-5 h-5"/>
              <span>En route vers le Client</span>
            </button>
          )}

          {currentStep === 'AT_CUSTOMER' && (
            <button onClick={handleNextStep} className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white py-4.5 rounded-2xl font-black text-base shadow-xl shadow-emerald-600/25 active:scale-95 transition-all flex items-center justify-center space-x-2 border border-emerald-400/30">
              <CheckCircle className="w-5 h-5"/>
              <span>Livraison effectuée</span>
            </button>
          )}

          {currentStep === 'OTP_VALIDATION' && (
            <div className="bg-slate-900/90 backdrop-blur-xl p-5 rounded-3xl shadow-2xl border border-slate-800 space-y-4">
              <div className="text-center space-y-1">
                <h3 className="font-extrabold text-white text-base">Validation OTP client</h3>
                <p className="text-xs text-slate-400">Entrez le code à 6 chiffres reçu par SMS par le destinataire.</p>
              </div>
              <input 
                type="text" 
                maxLength={6}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                className="w-full text-center text-3xl font-black tracking-[0.3em] py-3 bg-slate-950 border border-slate-800 text-white rounded-2xl focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all shadow-inner font-mono"
                placeholder="••••••"
              />
              <button 
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white py-4 rounded-2xl font-black text-base shadow-lg shadow-emerald-600/25 disabled:opacity-40 transition-all border border-emerald-400/30"
                disabled={otpCode.length !== 6}
                onClick={() => alert('Mission validée avec succès ! Passage à la course suivante.')}
              >
                Confirmer et clôturer
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}