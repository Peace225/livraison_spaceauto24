import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Mode test : on laisse passer tout le monde sans vérification d'authentification
  return NextResponse.next();
}

// Désactivation du filtrage pour que le middleware ne intercepte plus rien
export const config = {
  matcher: [],
};