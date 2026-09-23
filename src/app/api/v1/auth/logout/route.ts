import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST() {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    return NextResponse.json({
      success: false,
      error: { code: 'LOGOUT_FAILED', message: error.message }
    }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    message: 'Déconnexion réussie',
    data: {}
  });
}