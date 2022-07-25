import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import SubpageHeader from '../../components/ui/SubpageHeader';
import useSpotify from '../../components/hooks/useSpotify';
import { useSession } from 'next-auth/react';
import Analysis from '../../components/features/Analysis';

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
  const [playlists, setPlaylists] = useState<any[]>([]);

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
          // Try next API calls when user clicks on the button
          let fetchedPlaylists = await spotifyApi.getUserPlaylists({ limit: 50 });
          setPlaylists(fetchedPlaylists.body.items);

          const artistId: any[] = topTracks.map((track: any) => track.artists[0].id);
          const fetchedArtist: any = await spotifyApi.getArtists(artistId);

          let tempGenre = new Map<string, number>();

          fetchedArtist.body.artists.forEach((artist: any) => {
            artist.genres.forEach((genre: string) => {
              if (tempGenre.has(genre)) {
                // @ts-ignore - since we deal with the case that the object does not exist in the else block, we can safely ignore the error
                tempGenre.set(genre, tempGenre.get(genre) + 1); // Increment genre count
              } else {
                tempGenre.set(genre, 1); // Set genre count to 1
              }
            });
          });
          setGenres(new Map([...tempGenre.entries()].sort((a: any, b: any) => b[1] - a[1])));
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

      <section className="bg-gradient-to-b to-[#181b20] from-[#282b30] padding-8 w-full pb-10">
        <SubpageHeader pageName="Odditorium" />
        <h1 className="text-center text-[40px] sm:text-[45px] 2xl:text-[60px] font-bold">
          Insight and Inspection
        </h1>
        <div className="flex justify-center">
          <div className="text-center w-5/6 sm:w-[40rem] text-gray-400">
            <b className="text-odd">Odditory</b> presents to you the <b>Odditorium</b>.
            <p className="mt-5">
              By clicking to continue, you agree to allow Odditory to analyze your spotify activity
              to enhance your music insight.
            </p>
          </div>
        </div>
      </section>

      <div className={isClicked ? 'hidden' : 'mt-10 flex justify-center'}>
        <div className="w-full sm:w-[30rem] bg-secondary sm:rounded-xl p-8">
          <div
            className={
              isClicked
                ? 'bg-primary py-2 justify-center rounded flex flex-row items-center gap-2 mt-2 sm:px-[4rem] cursor-not-allowed'
                : `default-button ${loadedTracks && genres.size !== 0 ? '' : 'cursor-wait'}`
            }
            onClick={() => {
              if (loadedTracks && genres.size !== 0) {
                setClicked(true);
              }
            }}
          >
            Get Started
          </div>
        </div>
      </div>

      {isClicked && loadedTracks && genres ? (
        <Analysis genres={genres} playlists={playlists} topTracks={topTracks} session={session} />
      ) : (
        <></>
      )}
    </>
  );
};

export default Odditorium;
