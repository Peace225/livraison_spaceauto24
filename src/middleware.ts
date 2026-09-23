import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'

// Définition des accès par rôle (Chapitre 18)
const ROLE_ROUTES = {
  'SuperAdmin': ['/super-admin', '/ops', '/partner', '/driver'],
  'OpsManager': ['/ops', '/partner', '/driver'],
  'OpsAgent': ['/ops'],
  'Partner': ['/partner'],
  'Driver': ['/driver']
};

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({
            request: { headers: request.headers },
          })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({
            request: { headers: request.headers },
          })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession();
  const pathname = request.nextUrl.pathname;

  // Protection des routes (Dashboards et API privées)
  if (pathname.startsWith('/super-admin') || pathname.startsWith('/ops') || pathname.startsWith('/partner') || pathname.startsWith('/driver')) {
    
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Récupération du rôle de l'utilisateur (stocké dans les metadata ou une table profile)
    const userRole = session.user.user_metadata?.role || 'Driver'; 

    // Vérification des permissions[cite: 1]
    const allowedRoutes = ROLE_ROUTES[userRole as keyof typeof ROLE_ROUTES] || [];
    const isAuthorized = allowedRoutes.some(route => pathname.startsWith(route));

    if (!isAuthorized) {
      // Redirection vers le dashboard par défaut du rôle ou une page 403
      const defaultRoute = allowedRoutes[0] || '/login';
      return NextResponse.redirect(new URL(defaultRoute, request.url));
    }
  }

  return response;
}

export const config = {
  // Middleware désactivé temporairement pour le développement frontend
  matcher: [] 
}