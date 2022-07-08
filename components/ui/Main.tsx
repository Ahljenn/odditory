import React, { useEffect, useState } from 'react';
import useSpotify from '../hooks/useSpotify';
import TopTracks from '../features/TopTracks';
import RecTracks from '../features/RecTracks';
import RecentTracks from '../features/RecentTracks';
import { useSession } from 'next-auth/react';

const Main: React.FC = (): JSX.Element => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [tracks, setTracks] = useState<any[]>([]);
  const [isLoaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      (async () => {
        try {
          const data = await spotifyApi.getMyTopTracks({ limit: 12 });
          setTracks(data.body.items);
          setLoaded(true);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [session, spotifyApi]);

  console.log(tracks);

  return (
    <>
      <TopTracks tracks={tracks} isLoaded={isLoaded} />
      {isLoaded ? (
        <section className="flex flex-col items-center">
          <h1 className="text-2xl m-5 self-center">Tracks For You</h1>
          <RecTracks spotifyApi={spotifyApi} />
          <h1 className="text-2xl m-5 self-center">Keep Listening</h1>
          <RecentTracks spotifyApi={spotifyApi} />
          <h1 className="text-2xl m-5 self-center">
            Because You Listen To: {tracks[0].artists[0].name}{' '}
          </h1>
          <section>Placeholder</section>
          <h1 className="text-2xl m-5 self-center">New Releases</h1>
          <section>Placeholder</section>
        </section>
      ) : (
        <></>
      )}
    </>
  );
};

export default Main;
