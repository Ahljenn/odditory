import { request } from 'http';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export const middleware = async (req: NextRequest) => {
  //Token exists if user is logged in
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    const token = await getToken({ req, secret: process.env.JWT_SECRET });

    const { pathname, origin } = req.nextUrl; //Destructure pathname in request

    //If requests for next-auth session or if token exists
    if (pathname.includes('/api/auth') && token) {
      console.log('You are logged in.');
      return NextResponse.next(); //Allow request to continue
    }

    // Redirect to login if there is no token and are requesting a protected route
    if (!token && pathname !== '/login') {
      console.log('You are not logged in.');
      return NextResponse.rewrite(`${origin}/login`);
    }
  }
};
