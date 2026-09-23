-- ==========================================
-- SPACEAUTO24 DELIVERY V1 - SCHÉMA SUPABASE
-- ==========================================

-- 1. ZONES GÉOGRAPHIQUES (Chapitre 19.9)[cite: 1]
CREATE TABLE delivery_zones (
    ZoneID UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    Country VARCHAR(100) NOT NULL DEFAULT 'Côte d''Ivoire',
    Region VARCHAR(100),
    City VARCHAR(100) NOT NULL,
    Commune VARCHAR(100) NOT NULL,
    Status VARCHAR(50) DEFAULT 'Active', -- Active / Inactive[cite: 1]
    Latitude DECIMAL(10, 8), -- Réservé V2[cite: 1]
    Longitude DECIMAL(10, 8), -- Réservé V2[cite: 1]
    CreatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. PARTENAIRES (Chapitre 19.3)[cite: 1]
CREATE TABLE delivery_partners (
    PartnerID UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    CompanyName VARCHAR(255) NOT NULL,
    ManagerName VARCHAR(255),
    Phone VARCHAR(50),
    Status VARCHAR(50) DEFAULT 'En attente de validation', -- Validé, Refusé, Suspendu[cite: 1]
    AvailabilityStatus VARCHAR(50) DEFAULT 'Indisponible', -- Disponible, Indisponible[cite: 1]
    Capacity INT DEFAULT 10, -- Nombre max de missions simultanées[cite: 1]
    CurrentLoad INT DEFAULT 0,
    CreatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UpdatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. ZONES DE COUVERTURE DES PARTENAIRES (Chapitre 19.10)[cite: 1]
CREATE TABLE partner_zone (
    PartnerID UUID REFERENCES delivery_partners(PartnerID) ON DELETE CASCADE,
    ZoneID UUID REFERENCES delivery_zones(ZoneID) ON DELETE CASCADE,
    PRIMARY KEY (PartnerID, ZoneID)
);

-- 4. LIVREURS (Chapitre 19.4)[cite: 1]
CREATE TABLE delivery_drivers (
    DriverID UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    PartnerID UUID REFERENCES delivery_partners(PartnerID) ON DELETE CASCADE,
    FirstName VARCHAR(100) NOT NULL,
    LastName VARCHAR(100) NOT NULL,
    Phone VARCHAR(50) NOT NULL,
    VehicleType VARCHAR(50),
    Status VARCHAR(50) DEFAULT 'Actif',
    Availability VARCHAR(50) DEFAULT 'Hors ligne', -- Disponible, En mission, Hors ligne[cite: 1]
    CreatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. MISSIONS (Chapitre 19.5)[cite: 1]
CREATE TABLE delivery_missions (
    MissionID UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    OrderID VARCHAR(100) NOT NULL UNIQUE, -- Identifiant Marketplace[cite: 1]
    PartnerID UUID REFERENCES delivery_partners(PartnerID),
    DriverID UUID REFERENCES delivery_drivers(DriverID),
    VendorID VARCHAR(100) NOT NULL,
    CustomerID VARCHAR(100) NOT NULL,
    PickupZoneID UUID REFERENCES delivery_zones(ZoneID),
    DeliveryZoneID UUID REFERENCES delivery_zones(ZoneID),
    Status VARCHAR(50) NOT NULL DEFAULT 'MISSION_CREATED',
    Priority VARCHAR(50) DEFAULT 'Moyenne',
    PackageCount INT DEFAULT 1,
    TotalWeight DECIMAL(10, 2),
    TotalVolume DECIMAL(10, 2),
    Fragile BOOLEAN DEFAULT FALSE,
    CreatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UpdatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CompletedAt TIMESTAMP WITH TIME ZONE
);

-- 6. HISTORIQUE DES STATUTS (Status History - Chapitre 20.4)[cite: 1]
CREATE TABLE delivery_status_history (
    StatusHistoryID UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    MissionID UUID REFERENCES delivery_missions(MissionID) ON DELETE CASCADE,
    PreviousStatus VARCHAR(50),
    NewStatus VARCHAR(50) NOT NULL,
    ChangedByType VARCHAR(50), -- System, SuperAdmin, OPS, Partner, Driver[cite: 1]
    ChangedByID UUID,
    Reason TEXT,
    CreatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. TIMELINE FONCTIONNELLE (Chapitre 19.6)[cite: 1]
CREATE TABLE delivery_timelines (
    TimelineID UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    MissionID UUID REFERENCES delivery_missions(MissionID) ON DELETE CASCADE,
    Event VARCHAR(255) NOT NULL,
    OldStatus VARCHAR(50),
    NewStatus VARCHAR(50),
    Actor VARCHAR(100),
    Comment TEXT,
    CreatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. FILE D'ATTENTE OPS (OPS Queue - Chapitre 19.12)[cite: 1]
CREATE TABLE ops_queue (
    QueueID UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    Type VARCHAR(100) NOT NULL, -- ex: Retard livreur, Client absent[cite: 1]
    MissionID UUID REFERENCES delivery_missions(MissionID) ON DELETE CASCADE,
    Priority VARCHAR(50) DEFAULT 'Moyenne', -- Faible, Moyenne, Haute, Critique[cite: 1]
    AssignedAgent UUID, -- ID de l'agent OPS[cite: 1]
    Status VARCHAR(50) DEFAULT 'À traiter', -- À traiter, En cours, Résolu, Fermé[cite: 1]
    CreatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ClosedAt TIMESTAMP WITH TIME ZONE
);

-- 9. INCIDENTS (Chapitre 19.7)[cite: 1]
CREATE TABLE delivery_incidents (
    IncidentID UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    MissionID UUID REFERENCES delivery_missions(MissionID) ON DELETE CASCADE,
    Type VARCHAR(100) NOT NULL,
    Severity VARCHAR(50) DEFAULT 'Moyenne',
    Status VARCHAR(50) DEFAULT 'Ouvert',
    AssignedTo UUID,
    Description TEXT,
    Resolution TEXT,
    CreatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ClosedAt TIMESTAMP WITH TIME ZONE
);

-- 10. GRILLE TARIFAIRE (Pricing Engine)[cite: 1]
CREATE TABLE delivery_tariffs (
    TariffID UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    DepartureZoneID UUID REFERENCES delivery_zones(ZoneID) ON DELETE CASCADE,
    ArrivalZoneID UUID REFERENCES delivery_zones(ZoneID) ON DELETE CASCADE,
    BasePrice INT NOT NULL, -- Prix en FCFA
    ExpressMultiplier DECIMAL(3, 2) DEFAULT 1.5,
    CreatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(DepartureZoneID, ArrivalZoneID)
);

-- 11. AUDIT LOGS (Chapitre 19.13)[cite: 1]
CREATE TABLE delivery_audit_logs (
    LogID UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    SessionID VARCHAR(255),
    IPAddress VARCHAR(50),
    UserID UUID,
    Role VARCHAR(50),
    Module VARCHAR(100) NOT NULL,
    Action VARCHAR(100) NOT NULL,
    Entity VARCHAR(100),
    EntityID VARCHAR(255),
    OldValue TEXT,
    NewValue TEXT,
    Reason TEXT,
    CreatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);