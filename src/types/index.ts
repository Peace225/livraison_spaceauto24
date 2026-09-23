// --- STATUTS OFFICIELS DES MISSIONS ---
export type MissionStatus = 
  | 'MISSION_CREATED'
  | 'WAITING_PARTNER'
  | 'PARTNER_ACCEPTED'
  | 'WAITING_DRIVER'
  | 'DRIVER_ASSIGNED'
  | 'DRIVER_EN_ROUTE_VENDOR'
  | 'PACKAGE_PICKED_UP'
  | 'DRIVER_EN_ROUTE_CUSTOMER'
  | 'DELIVERED'
  | 'CUSTOMER_CONFIRMED'
  | 'MISSION_COMPLETED'
  | 'MISSION_CANCELLED'
  | 'DELIVERY_FAILED';

// --- ENTITÉS (Modèle basé sur le Chapitre 19) ---
export interface Partner {
  PartnerID: string;
  CompanyName: string;
  Status: 'En attente de validation' | 'Validé' | 'Refusé' | 'Suspendu';
  AvailabilityStatus: 'Disponible' | 'Indisponible';
  Capacity: number;
  CurrentLoad: number;
  CreatedAt: string;
}

export interface Mission {
  MissionID: string;
  OrderID: string;
  PartnerID?: string;
  DriverID?: string;
  VendorID: string;
  CustomerID: string;
  PickupZoneID: string;
  DeliveryZoneID: string;
  Status: MissionStatus;
  Priority: 'Faible' | 'Moyenne' | 'Haute' | 'Critique';
  PackageCount: number;
  TotalWeight: number;
  TotalVolume: number;
  Fragile: boolean;
  CreatedAt: string;
  UpdatedAt: string;
}

export interface Incident {
  IncidentID: string;
  MissionID: string;
  Type: 'Retard vendeur' | 'Retard partenaire' | 'Client absent' | 'Adresse incorrecte' | 'Colis endommagé';
  Severity: 'Faible' | 'Moyenne' | 'Critique';
  Status: 'Ouvert' | 'Résolu';
  CreatedAt: string;
}