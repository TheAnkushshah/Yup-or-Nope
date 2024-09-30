import { NextResponse } from 'next/server';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

// This function is marked `async` since it uses `await` inside
export async function middleware(request) {
  // Await the session retrieval
  const session = await getKindeServerSession();

  if (!session.isAuthenticated()) {
    // Redirect the user to the login page if they are not authenticated
    return NextResponse.redirect(new URL('/api/auth/login?post_login_redirect_url=/dashboard', request.url));
  }

  // Allow the request to continue if the user is authenticated
  return NextResponse.next();
}

// Configure middleware to run on all `/dashboard` routes
export const config = {
  matcher: '/dashboard/:path*',
};
