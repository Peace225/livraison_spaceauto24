'use client';

import { useState } from 'react';
import { MapPin, Package, Navigation, CheckCircle, AlertTriangle, Store, User, ListOrdered, Map as MapIcon, Phone, ExternalLink } from 'lucide-react';

type DriverStep = 'EN_ROUTE_VENDOR' | 'AT_VENDOR' | 'EN_ROUTE_CUSTOMER' | 'AT_CUSTOMER' | 'OTP_VALIDATION';

export default function DriverDashboardPage() {
  const [isAvailable, setIsAvailable] = useState(true);
  const [currentStep, setCurrentStep] = useState<DriverStep>('EN_ROUTE_VENDOR');
  const [otpCode, setOtpCode] = useState('');

  // 4 autres missions attendent après celle-ci
  const pendingMissionsCount = 4; 

  // Données enrichies avec la géolocalisation complète
  const missionData = {
    id: 'DLV-000245',
    pickup: {
      type: 'Vendeur',
      name: 'AutoParts Express',
      address: 'Marcory Zone 4, Rue Pierre et Marie Curie',
      phone: '01 02 03 04 05',
      instruction: 'Demander le gérant M. Koné. Carton lourd.',
      geo: {
        lat: 5.3013,
        lng: -3.9904,
        url: 'https://www.google.com/maps/search/?api=1&query=5.3013,-3.9904'
      }
    },
    delivery: {
      type: 'Client',
      name: 'Garage Moderne',
      address: 'Yopougon Z.I., face à la station',
      phone: '05 06 07 08 09',
      instruction: 'Déposer directement à l\'atelier mécanique.',
      geo: {
        lat: 5.3344,
        lng: -4.0622,
        url: 'https://www.google.com/maps/search/?api=1&query=5.3344,-4.0622'
      }
    }
  };

  const handleNextStep = () => {
    if (currentStep === 'EN_ROUTE_VENDOR') setCurrentStep('AT_VENDOR');
    else if (currentStep === 'AT_VENDOR') setCurrentStep('EN_ROUTE_CUSTOMER');
    else if (currentStep === 'EN_ROUTE_CUSTOMER') setCurrentStep('AT_CUSTOMER');
    else if (currentStep === 'AT_CUSTOMER') setCurrentStep('OTP_VALIDATION');
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-[calc(100vh-4rem)] flex flex-col">
      {/* En-tête : Disponibilité */}
      <div className="bg-white p-4 shadow-sm flex items-center justify-between sticky top-0 z-10">
        <span className="font-semibold text-gray-800">Statut actuel</span>
        <button 
          onClick={() => setIsAvailable(!isAvailable)}
          className={`px-4 py-2 rounded-full font-bold text-sm transition-colors ${
            isAvailable ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'
          }`}
        >
          {isAvailable ? 'En ligne' : 'Hors ligne'}
        </button>
      </div>

      <div className="flex-1 p-4 flex flex-col space-y-4">
        
        {/* Indicateur de tournée */}
        {pendingMissionsCount > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-blue-700">
              <ListOrdered className="w-5 h-5" />
              <span className="text-sm font-bold">Ma tournée (File d'attente)</span>
            </div>
            <span className="bg-blue-600 text-white text-xs font-black px-2 py-1 rounded-lg shadow-sm">
              +{pendingMissionsCount} à suivre
            </span>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-slate-900 p-4 flex justify-between items-start">
            <div>
              <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Mission Actuelle</p>
              <h2 className="text-xl font-black text-white mt-1">{missionData.id}</h2>
            </div>
            <div className="text-xs font-bold bg-white text-slate-900 px-2 py-1 rounded">
              1 / {pendingMissionsCount + 1}
            </div>
          </div>

          <div className="p-5 space-y-6">
            
            {/* Point A : Retrait avec Géolocalisation */}
            <div className="relative">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 p-2 rounded-full mt-1">
                  <Store className="w-4 h-4 text-blue-600"/>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-blue-600 font-bold uppercase tracking-wide mb-1">Point A - Vendeur</p>
                  <p className="font-bold text-gray-900 text-lg">{missionData.pickup.name}</p>
                  <p className="text-sm text-gray-600 leading-tight mt-1">{missionData.pickup.address}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    <a href={`tel:${missionData.pickup.phone.replace(/\s/g, '')}`} className="flex items-center space-x-1.5 bg-gray-100 hover:bg-gray-200 text-gray-900 px-3 py-2 rounded-lg text-sm font-bold transition-colors">
                      <Phone className="w-4 h-4 text-gray-600" />
                      <span>{missionData.pickup.phone}</span>
                    </a>
                    <a href={missionData.pickup.geo.url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1.5 bg-blue-50 border border-blue-200 hover:bg-blue-100 text-blue-700 px-3 py-2 rounded-lg text-sm font-semibold transition-colors">
                      <MapIcon className="w-4 h-4" />
                      <span>GPS Vendeur</span>
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-dashed border-gray-200"></div>

            {/* Point B : Livraison avec Géolocalisation */}
            <div className="relative">
              <div className="flex items-start space-x-3">
                <div className="bg-green-100 p-2 rounded-full mt-1">
                  <User className="w-4 h-4 text-green-600"/>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-green-600 font-bold uppercase tracking-wide mb-1">Point B - Client</p>
                  <p className="font-bold text-gray-900 text-lg">{missionData.delivery.name}</p>
                  <p className="text-sm text-gray-600 leading-tight mt-1">{missionData.delivery.address}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    <a href={`tel:${missionData.delivery.phone.replace(/\s/g, '')}`} className="flex items-center space-x-1.5 bg-gray-100 hover:bg-gray-200 text-gray-900 px-3 py-2 rounded-lg text-sm font-bold transition-colors">
                      <Phone className="w-4 h-4 text-gray-600" />
                      <span>{missionData.delivery.phone}</span>
                    </a>
                    <a href={missionData.delivery.geo.url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1.5 bg-green-50 border border-green-200 hover:bg-green-100 text-green-700 px-3 py-2 rounded-lg text-sm font-semibold transition-colors">
                      <MapIcon className="w-4 h-4" />
                      <span>GPS Client</span>
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </div>
                  
                  <div className="mt-3 bg-orange-50 border border-orange-100 p-3 rounded-lg flex items-start space-x-2">
                    <AlertTriangle className="w-4 h-4 text-orange-600 mt-0.5" />
                    <p className="text-xs text-orange-800 font-medium">{missionData.delivery.instruction}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Espace d'action dynamique */}
        <div className="flex-1 flex flex-col justify-end mt-4">
          {currentStep === 'EN_ROUTE_VENDOR' && (
            <button onClick={handleNextStep} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-bold text-lg shadow-lg active:scale-95 flex items-center justify-center space-x-2">
              <Navigation className="w-6 h-6"/>
              <span>Je suis arrivé chez le Vendeur</span>
            </button>
          )}

          {currentStep === 'AT_VENDOR' && (
            <button onClick={handleNextStep} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-5 rounded-2xl font-bold text-lg shadow-lg active:scale-95 flex items-center justify-center space-x-2">
              <Package className="w-6 h-6"/>
              <span>Le colis est récupéré</span>
            </button>
          )}

          {currentStep === 'EN_ROUTE_CUSTOMER' && (
            <button onClick={handleNextStep} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-bold text-lg shadow-lg active:scale-95 flex items-center justify-center space-x-2">
              <Navigation className="w-6 h-6"/>
              <span>En route vers le Client</span>
            </button>
          )}

          {currentStep === 'AT_CUSTOMER' && (
            <button onClick={handleNextStep} className="w-full bg-green-600 hover:bg-green-700 text-white py-5 rounded-2xl font-bold text-lg shadow-lg active:scale-95 flex items-center justify-center space-x-2">
              <CheckCircle className="w-6 h-6"/>
              <span>Livraison effectuée</span>
            </button>
          )}

          {currentStep === 'OTP_VALIDATION' && (
            <div className="bg-white p-5 rounded-2xl shadow-lg border border-gray-200 space-y-4">
              <h3 className="font-bold text-center text-gray-900 text-lg">Code de confirmation (OTP)</h3>
              <p className="text-sm text-gray-500 text-center">Demandez au client le code reçu par SMS pour valider la remise.</p>
              <input 
                type="text" 
                maxLength={6}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                className="w-full text-center text-3xl font-black tracking-widest py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0"
                placeholder="000000"
              />
              <button 
                className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg disabled:opacity-50"
                disabled={otpCode.length !== 6}
                onClick={() => alert('Mission Terminée ! Passage à la suivante.')}
              >
                Valider la livraison
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}