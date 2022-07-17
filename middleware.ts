import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export const middleware = async (req: NextRequest): Promise<NextResponse | undefined> => {
  //Token exists if user is logged in
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  const { pathname, origin } = req.nextUrl; //Destructure pathname in request

  const containsProtectedPath = (): boolean => {
    const paths = ['/dashboard', '/playlist', 'genre'];
    return paths.some((path) => pathname.includes(path));
  };

  if (containsProtectedPath()) {
    //If requests for next-auth session or if token exists
    if (pathname.includes('/api/auth') || token) {
      console.log('You are logged in.');
      return NextResponse.next(); //Allow request to continue
    }

    // Redirect to login if there is no token and are requesting a protected route
    if (!token && pathname !== '/login') {
      console.log('Nice try! You are not logged in.');
      return NextResponse.redirect(`${origin}/login`);
    }
  }

  if (req.nextUrl.pathname.startsWith('/login')) {
    //If user is already logged in, take them to dashboard if they try to access login page
    if (token) {
      console.log('You are already logged in.');
      return NextResponse.redirect(`${origin}/dashboard`);
    }
  }

  if (req.nextUrl.pathname === '/') {
    //If user attempts to access root page, redirect to dashboard (regardless of if they are logged in or not)
    console.log(pathname);
    return NextResponse.redirect(`${origin}/dashboard`);
  }
};
