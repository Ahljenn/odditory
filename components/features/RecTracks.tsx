import React, { useEffect, useState } from 'react';

interface SessionData {
  spotifyApi: any;
  tracks: any[];
}

/**
 * This component is used to display the recommended tracks for the user.
 * Relies on top tracks to be loaded in the state.
 */
const RecTracks: React.FC<SessionData> = ({ spotifyApi, tracks }: SessionData): JSX.Element => {
  /**
   * @param {SessionData} - props passed in from the parent component.
   * @returns JSX.Element.
   */
  const [recs, setRecs] = useState<any[]>([]);
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
          let temp: any = new Set();
          tracks
            .filter((artist: any) => {
              return artist.artists.length > 0;
            })
            .map((artist: any) => {
              temp.add(artist.artists[0].id);
            });
          //Filter duplicate artists, convert to array
          let seed = Array.from(temp);

          //Get recommendation based on your top seed tracks
          const data = await spotifyApi.getRecommendations({
            seed_artists: [seed[0], seed[Math.floor(seed.length / 2)], seed[seed.length - 1]],
            seed_tracks: [seed[0], seed[seed.length - 1]],
            limit: 22,
          });
          setRecs(data.body.tracks);
          setLoaded(true);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [spotifyApi]);

  return (
    <>
      <h1 className="text-2xl m-5 mb-0 self-center">Tracks For You</h1>
      <section className="mt-5 mx-5 grid grid-cols-3 gap-4 sm:grid-cols-4 xl:gap-7 max-w-screen-4xl justify-center">
        {isLoaded
          ? recs.map((track: any, index: number) => (
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

export default RecTracks;
