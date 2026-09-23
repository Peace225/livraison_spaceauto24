import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = createClient();

  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.json({
      success: false,
      error: { code: 'UNAUTHORIZED', message: 'Utilisateur non connecté' }
    }, { status: 401 });
  }

  return NextResponse.json({
    success: true,
    message: 'Utilisateur récupéré',
    data: { user }
  });
}