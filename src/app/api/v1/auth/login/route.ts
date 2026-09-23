import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const supabase = createClient();
  
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({
        success: false,
        error: { code: 'MISSING_CREDENTIALS', message: 'Email et mot de passe requis' }
      }, { status: 400 });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json({
        success: false,
        error: { code: 'AUTH_FAILED', message: error.message }
      }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      message: 'Connexion réussie',
      data: {
        user: data.user,
        session: data.session
      }
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: 'Erreur interne du serveur' }
    }, { status: 500 });
  }
}