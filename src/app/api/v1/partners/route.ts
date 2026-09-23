import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const supabase = createClient();
  
  try {
    const body = await request.json();
    const { email, password, companyName, managerName, phone, zones } = body;

    if (!email || !password || !companyName || !phone) {
      return NextResponse.json({
        success: false,
        error: { code: 'MISSING_FIELDS', message: 'Veuillez remplir tous les champs obligatoires' }
      }, { status: 400 });
    }

    // 1. Création de l'utilisateur dans Supabase Auth
    // On utilise l'admin API ou on s'inscrit, mais l'utilisateur n'aura aucun droit tant qu'il n'est pas validé
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role: 'Partner', // Assignation du rôle de base
        }
      }
    });

    if (authError || !authData.user) {
      return NextResponse.json({
        success: false,
        error: { code: 'AUTH_CREATION_FAILED', message: authError?.message }
      }, { status: 400 });
    }

    // 2. Création de l'entité Partenaire (Chapitre 19.3) - Statut bloqué par défaut[cite: 1]
    const { data: partnerData, error: partnerError } = await supabase
      .from('delivery_partners')
      .insert({
        PartnerID: authData.user.id, // L'ID Auth devient le PartnerID
        CompanyName: companyName,
        ManagerName: managerName,
        Phone: phone,
        Status: 'En attente de validation', // REQ strict de la V1[cite: 1]
        AvailabilityStatus: 'Indisponible',
      })
      .select()
      .single();

    if (partnerError) {
      // Rollback (idéalement) si la création métier échoue
      return NextResponse.json({
        success: false,
        error: { code: 'PARTNER_CREATION_FAILED', message: partnerError.message }
      }, { status: 500 });
    }

    // 3. (Optionnel) Ajout des zones desservies initiales dans partner_zone[cite: 1]
    if (zones && Array.isArray(zones) && zones.length > 0) {
      const zoneInserts = zones.map(zoneId => ({
        PartnerID: authData.user.id,
        ZoneID: zoneId
      }));
      await supabase.from('partner_zone').insert(zoneInserts);
    }

    // 4. Génération d'une alerte dans l'OPS Queue pour validation[cite: 1]
    await supabase.from('ops_queue').insert({
      Type: 'Validation Nouveau Partenaire',
      Priority: 'Moyenne',
      Status: 'À traiter'
    });

    return NextResponse.json({
      success: true,
      message: 'Demande de partenariat envoyée avec succès. En attente de validation par SpaceAuto24.',
      data: { partnerId: partnerData.PartnerID }
    }, { status: 201 });

  } catch (err) {
    return NextResponse.json({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: 'Erreur lors de la création du partenaire' }
    }, { status: 500 });
  }
}