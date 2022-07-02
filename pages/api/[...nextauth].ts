import NextAuth from 'next-auth/next';
import SpotifyProvider from 'next-auth/providers/github';
import spotifyApi, { LOGIN_URL } from '../../lib/spotify';

const refreshAccessToken = async (token: any) => {
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);

    const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
    console.log('Refreshed token:', refreshedToken);

    return {
      ...token,
      accessToken: <String>refreshedToken.access_token,
      accessTokenExpires: <number>+Date.now + refreshedToken.expires_in * 1000, //1 hour expiration
      refreshToken: <any>refreshedToken.refresh_token ?? token.refreshToken,
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
    signIn: '/sign-in',
  },

  callbacks: {
    async jwt({ token, account, user }) {
      //First sign in
      if (account && user) {
        return {
          ...token,
          accessToken: <String>account.accessToken,
          refreshToken: <String>account.refreshToken,
          username: <String>account.providerAccountId,
          accessTokenExpires: <number>(account.expires_at || 1000) * 1000, //Convert to milliseconds
        };
      }

      //If access token has not expired
      if (Date.now() < <number>token.accessTokenExpires) {
        return token; //return since token is still valid
      }

      //If access token has expired, refresh token
      console.log('Access token has expired, refreshing token...');
      return await refreshAccessToken(token);
    },

    async session({ session, token }: { session: any; token: any }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.username = token.username;

      return session;
    },
  },
});
