import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import SubpageHeader from '../../components/ui/SubpageHeader';
import useSpotify from '../../components/hooks/useSpotify';
import { useSession } from 'next-auth/react';

/**
 * This component renders the Odditorium page containing user data and analytics.
 */
const Odditorium: React.FC = (): JSX.Element => {
  /**
   * @returns JSX.Element - renders the Odditorium page.
   */
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [topTracks, setTopTracks] = useState<any[]>([]);
  const [genres, setGenres] = useState<Map<string, number>>(new Map());

  const [loadedTracks, setLoaded] = useState<boolean>(false);
  const [isClicked, setClicked] = useState<boolean>(false);

  // Fetch data on page load
  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      (async () => {
        try {
          const data = await spotifyApi.getMyTopTracks({ limit: 50 });
          setTopTracks(data.body.items);
          setLoaded(true);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [session, spotifyApi]);

  // Fetch genres after tracks are loaded
  useEffect(() => {
    if (loadedTracks) {
      (async () => {
        try {
          const artistId: any[] = topTracks.map((track: any) => track.artists[0].id);
          const artistData: any = await spotifyApi.getArtists(artistId);

          let genres = new Map<string, number>();

          artistData.body.artists.forEach((artist: any) => {
            artist.genres.forEach((genre: string) => {
              if (genres.has(genre)) {
                // @ts-ignore - since we deal with the case that the object does not exist in the else block, we can safely ignore the error
                genres.set(genre, genres.get(genre) + 1); // Increment genre count
              } else {
                genres.set(genre, 1); // Set genre count to 1
              }
            });
          });

          // console.log(genres);
          setGenres(genres);

          console.log('genres', genres);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [loadedTracks]);

  return (
    <>
      <Head>
        <title>Odditory | Odditorium</title>
        <link rel="icon" href="/logofav.png" />
      </Head>
      <SubpageHeader pageName="Odditorium" />

      <div className="flex justify-center ">
        <div className="w-full sm:w-[30rem] bg-secondary sm:rounded-xl p-8">
          <p>
            What is the <b className="text-odd">Odditorium?</b>
          </p>
          <p>
            The Odditorium is a the central location to analyze the music you listen to! It uses
            your Spotify activity to analyze the music you love the most.
          </p>

          <div
            className={
              isClicked
                ? 'bg-primary py-2 justify-center rounded flex flex-row items-center gap-2 mt-2 sm:px-[4rem] cursor-not-allowed'
                : 'bg-primary py-2 justify-center rounded flex flex-row items-center gap-2 cursor-pointer mt-2 sm:px-[4rem] hover:bg-slate-600 transition duration-100 ease-in-out'
            }
            onClick={() => setClicked(true)}
          >
            Let&apos;s go
          </div>
        </div>
      </div>

      {isClicked &&
        loadedTracks &&
        genres &&
        Array.from(genres.entries()).map((result: [string, number], index: number) => {
          return (
            <div className="flex justify-center" key={index}>
              <div className="w-full sm:w-[30rem] bg-secondary sm:rounded-xl p-8 mt-5">
                <p>
                  <b className="text-odd">{result[0]}</b>
                </p>
                <p>
                  {result[1]} track(s) containing {result[0]} music.
                </p>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default Odditorium;
