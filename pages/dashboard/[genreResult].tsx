import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import SubpageHeader from '../../components/ui/SubpageHeader';
import { useSession } from 'next-auth/react';
import useSpotify from '../../components/hooks/useSpotify';
/**
 * This component renders the dynamic page depending on the user's genre selection.
 */
const genreResult: React.FC = (): JSX.Element => {
  /**
   * @returns JSX.Element - renders the genre result component.
   */

  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const router = useRouter();
  const { genreId, genreTitle } = router.query;
  const [tracks, setTracks] = useState<any[]>([]);
  const [isLoaded, setLoaded] = useState(false);
  let tempGrid: Array<any> = new Array(20);

  //Initialize array for temporary grid when loading recs
  for (let i = 0; i < tempGrid.length; i++) {
    tempGrid[i] = {};
  }

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      (async () => {
        try {
          const data = await spotifyApi.getRecommendations({
            seed_genres: [genreId],
            limit: 22,
          });
          setTracks(data.body.tracks);
          setLoaded(true);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [spotifyApi]);

  console.log(tracks);

  return (
    <>
      <SubpageHeader pageName={genreTitle} />
      <h1> Genre: {genreTitle} </h1>
      <h1> Id: {genreId} </h1>
      <section className="mt-5 mx-5 grid grid-cols-2 sm:grid-cols-3 gap-4 md:grid-cols-4 xl:gap-7 max-w-screen-4xl justify-center">
        {isLoaded
          ? tracks.map((track: any, index: number) => (
              <div
                className={
                  index === 0 || index == 11 ? 'col-span-1 xl:col-span-2 xl:row-span-2' : ''
                }
                key={index}
              >
                <img
                  src={track.album.images[0].url}
                  alt={track.name}
                  className={
                    index === 0 || index == 11
                      ? 'track-primary sm:w-[50.5rem] xl:w-full xl:h-[94%]'
                      : 'track-primary sm:w-[25.5rem] xl:w-[35rem]'
                  }
                />
                <div className="flex flex-col justify-center">
                  <h1
                    className={
                      index === 0 || index === 15
                        ? 'text-center xl:text-2xl whitespace-nowrap truncate'
                        : 'text-center whitespace-nowrap truncate'
                    }
                  >
                    {track.name}
                  </h1>
                  <h2
                    className={
                      index === 0 || index === 15
                        ? 'text-center font-bold 2xl:text-2xl whitespace-nowrap truncate'
                        : 'text-center font-bold whitespace-nowrap truncate'
                    }
                  >
                    {track.artists[0].name}
                  </h2>
                </div>
              </div>
            ))
          : tempGrid.map((temp, index) => (
              <div
                className={
                  index === 0 || index == 15 ? 'col-span-1 xl:col-span-2 xl:row-span-2' : ''
                }
                key={index}
              >
                <img
                  src="./logo.png"
                  alt="loading"
                  className={
                    index === 0 || index == 15
                      ? 'track-primary sm:w-[50.5rem] 2xl:w-full 2xl:h-[95.5%] opacity-5'
                      : 'track-primary sm:w-[25.5rem] 2xl:w-[35rem] opacity-5'
                  }
                />
              </div>
            ))}
      </section>
    </>
  );
};

export default genreResult;
