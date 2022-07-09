import { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});

/**
 * This hook is used to get the user's access token.
 */
const useSpotify = (): any => {
  /**
   * @returns {string} - the user's access token
   * @returns any - spotifyApi interface
   */
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      //If refresh access token attempt fails, go back to login page
      if (session.error === 'RefreshAccessTokenError') {
        signIn();
      }
      // @ts-ignore
      spotifyApi.setAccessToken(session?.user?.accessToken);
    }
  }, [session]);

  return spotifyApi;
};

export default useSpotify;
