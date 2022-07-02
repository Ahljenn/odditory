import NextAuth from 'next-auth/next';
import SpotifyProvider from 'next-auth/providers/github';

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
});
