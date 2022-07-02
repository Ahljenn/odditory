import NextAuth from 'next-auth/next';
import SpotifyProvider from 'next-auth/providers/github';
import { LOGIN_URL } from '../../lib/spotify';

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/sign-in',
  },
});
