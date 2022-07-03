//@ts-nocheck
import NextAuth from 'next-auth/next';
import SpotifyProvider from 'next-auth/providers/spotify';
import spotifyApi, { LOGIN_URL } from '../../../lib/spotify';

const refreshAccessToken = async (token: any): Promise<any> => {
  try {
    spotifyApi.setAccessToken(token.access_token);
    spotifyApi.setRefreshToken(token.refresh_token);

    console.log(spotifyApi);
    const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
    console.log('Refreshed token:', refreshedToken);

    return {
      ...token,
      access_token: refreshedToken.access_token,
      accessTokenExpires: Date.now + refreshedToken.expires_in * 1000, //1 hour expiration
      refresh_token: refreshedToken.refresh_token ?? token.refresh_token,
    };
  } catch (error) {
    console.error(error);

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
};

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
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, account, user }) {
      //First sign in

      if (account && user) {
        return {
          ...token,
          access_token: account.access_token,
          refresh_token: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at * 1000, //Convert to milliseconds
        };
      }

      //If access token has not expired
      if (Date.now() < token.accessTokenExpires) {
        console.log('Existing token is still valid');
        return token; //return since token is still valid
      }

      //If access token has expired, refresh token
      console.log('Access token has expired, refreshing token...');
      return await refreshAccessToken(token);
    },

    async session({ session, token }) {
      session.user.access_token = token.access_token;
      session.user.refresh_token = token.refresh_token;
      session.user.username = token.username;
      return session;
    },
  },
});
