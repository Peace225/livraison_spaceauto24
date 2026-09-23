import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.refreshSession();

  if (error) {
    return NextResponse.json({
      success: false,
      error: { code: 'REFRESH_FAILED', message: error.message }
    }, { status: 401 });
  }

  return NextResponse.json({
    success: true,
    message: 'Token renouvelé avec succès',
    data: {
      session: data.session
    }
  });
}