import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const supabase = createClient();
  
  try {
    // 1. Vérification de l'authentification et du rôle (RBAC)
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'Vous devez être connecté' }
      }, { status: 401 });
    }

    const userRole = user.user_metadata?.role;
    if (userRole !== 'Partner' && userRole !== 'SuperAdmin') {
      return NextResponse.json({
        success: false,
        error: { code: 'FORBIDDEN', message: 'Seul un partenaire peut ajouter un livreur.' }
      }, { status: 403 });
    }

    const body = await request.json();
    const { email, password, firstName, lastName, phone, vehicleType } = body;

    if (!email || !password || !firstName || !lastName || !phone) {
      return NextResponse.json({
        success: false,
        error: { code: 'MISSING_FIELDS', message: 'Veuillez remplir tous les champs obligatoires' }
      }, { status: 400 });
    }

    // 2. Création du compte d'authentification du livreur
    // Note: Dans un flux B2B, on utilise souvent l'API Admin de Supabase (service_role) 
    // pour créer un compte sans déconnecter l'utilisateur actuel.
    const supabaseAdmin = createClient(); // Idéalement initialisé avec le SERVICE_ROLE_KEY
    
    const { data: authData, error: createAuthError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Le partenaire se porte garant de l'email
      user_metadata: {
        role: 'Driver',
        partnerId: user.id
      }
    });

    if (createAuthError || !authData.user) {
      return NextResponse.json({
        success: false,
        error: { code: 'AUTH_CREATION_FAILED', message: createAuthError?.message }
      }, { status: 400 });
    }

    // 3. Création de l'entité Livreur (Chapitre 19.4)[cite: 1]
    const { data: driverData, error: driverError } = await supabase
      .from('delivery_drivers')
      .insert({
        DriverID: authData.user.id,
        PartnerID: user.id, // Le livreur est obligatoirement lié au partenaire connecté[cite: 1]
        FirstName: firstName,
        LastName: lastName,
        Phone: phone,
        VehicleType: vehicleType || 'Moto',
        Status: 'Actif',
        Availability: 'Hors ligne' // Statut par défaut[cite: 1]
      })
      .select()
      .single();

    if (driverError) {
      // Suppression du compte Auth en cas d'échec de la création du profil métier
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
      
      return NextResponse.json({
        success: false,
        error: { code: 'DRIVER_CREATION_FAILED', message: driverError.message }
      }, { status: 500 });
    }

    // 4. Audit Log (Chapitre 19.13)[cite: 1]
    await supabase.from('delivery_audit_logs').insert({
      UserID: user.id,
      Role: userRole,
      Module: 'DriverManagement',
      Action: 'CREATE_DRIVER',
      Entity: 'Driver',
      EntityID: driverData.DriverID,
      Reason: 'Ajout d\'un nouveau livreur par le partenaire'
    });

    return NextResponse.json({
      success: true,
      message: 'Livreur créé avec succès.',
      data: { driverId: driverData.DriverID }
    }, { status: 201 });

  } catch (err) {
    return NextResponse.json({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: 'Erreur lors de la création du livreur' }
    }, { status: 500 });
  }
}