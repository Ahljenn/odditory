import React, { useEffect, useState } from 'react';
import useSpotify from '../hooks/useSpotify';
import TopTracks from '../features/TopTracks';
import RecTracks from '../features/RecTracks';
import NewReleases from '../features/NewReleases';
import { useSession } from 'next-auth/react';
import OddPicks from '../features/OddPicks';
import IntroContainer from './IntroContainer';

/**
 * This component is used to display the user's top tracks, recommended tracks, and new releases.
 * Top tracks is loaded first and is used to get the user's top seed tracks.
 */
const Main: React.FC = (): JSX.Element => {
  /**
   * @returns JSX.Element - renders the main component.
   */
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [tracks, setTracks] = useState<any[]>([]);
  const [isLoaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      (async () => {
        try {
          const data = await spotifyApi.getMyTopTracks({ limit: 11 });
          setLoaded(true);
          setTracks(data.body.items);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [session, spotifyApi]);

  // console.log(tracks);

  return (
    <>
      {isLoaded ? (
        <section className="flex flex-col items-center">
          <IntroContainer />
          <RecTracks spotifyApi={spotifyApi} tracks={tracks} />
          <TopTracks tracks={tracks} isLoaded={isLoaded} />
          <NewReleases spotifyApi={spotifyApi} />
          <OddPicks />
        </section>
      ) : (
        <></>
      )}
    </>
  );
};

export default Main;
