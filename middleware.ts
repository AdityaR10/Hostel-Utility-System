// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)',"/api/uploadthing"])

// export default clerkMiddleware(async (auth, request) => {
//   if (!isPublicRoute(request)) {
//     await auth.protect()
//   }
// })

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Always run for API routes
//     '/(api|trpc)(.*)',
//   ],
// }
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import db from './lib/prismadb';

// Define public routes
const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/api/uploadthing']);

// Middleware for `/warden` routes
const isWardenRoute = createRouteMatcher(['/hostel(.*)']);

export default clerkMiddleware(async (auth, request) => {
  // If the route is public, skip the authentication
  if (isPublicRoute(request)) {
    return NextResponse.next();
  }

  // If the route is within `/hostel` paths
  if (isWardenRoute(request)) {
    const {userId} = await auth(); // Get Clerk user session info

    if (!userId) {
      // If the user is not authenticated, redirect to sign-in page
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    // Check if the authenticated user is a warden by querying the `warden` table
    const response = await fetch(new URL('/api/check-warden', request.url));

    if (response.status === 404) {
      // If the user is not a warden or not authenticated, redirect to unauthorized page
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Protect all other routes (this is part of your existing logic)
  await auth.protect();
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
