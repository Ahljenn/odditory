import { request } from 'http';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

export const middleware = async (req: NextRequest) => {
  //Token exists if user is logged in
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  const { pathname, origin } = req.nextUrl; //Destructure pathname in request

  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    //If requests for next-auth session or if token exists
    if (pathname.includes('/api/auth') && token) {
      console.log('You are logged in.');
      return NextResponse.next(); //Allow request to continue
    }

    // Redirect to login if there is no token and are requesting a protected route
    if (!token && pathname !== '/login') {
      console.log('You are not logged in.');
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
};
