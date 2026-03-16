import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  // Disable intermediary/browser caching for document requests so crawlers
  // fetch the latest Open Graph and other metadata on every visit.
  const secFetchDest = request.headers.get('sec-fetch-dest');
  if (!secFetchDest || secFetchDest === 'document') {
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
  }

  return response;
}

export function middleware(request: NextRequest) {
  return proxy(request);
}

export const config = {
  matcher: [
    // Apply to all app routes, excluding Next.js internals, API routes, and static assets.
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
