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
          console.log(topTracks);
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

          // console.log(genres);
          setGenres(new Map([...tempGenre.entries()].sort((a: any, b: any) => b[1] - a[1])));
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [loadedTracks]);

  return (
    <div>
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

      {isClicked && loadedTracks && genres ? (
        <>
          {/* Genre analysis */}
          <h1 className="text-center font-bold text-xl mt-5">Genre Analysis</h1>
          <p className="text-center">
            It seems that your most listened to genre is <b className="text-odd">{}</b>!
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 mt-5 sm:mx-10 gap-5">
            {Array.from(genres.entries()).map((result: [string, number], index: number) => {
              return (
                <div className="bg-secondary sm:rounded-xl p-5">
                  <p key={index}>
                    <b className="text-odd">{result[0]}</b>
                  </p>
                  <p>
                    <b>{result[1]}</b>
                    {result[1] > 1 ? ' of your top tracks ' : ' track '}
                    is {result[0]} music.
                  </p>
                </div>
              );
            })}
          </div>

          {/* Playlist analysis */}

          <section className="flex justify-center my-5 flex-col gap-5">
            <h1 className="text-center font-bold text-xl ">Playlist Analysis</h1>
            <div className="w-full bg-secondary p-8 text-center flex flex-col gap-5">
              <div>
                <b className="inline text-odd text-xl">{playlists && playlists.length} </b>
                <p>Total playlists</p>
              </div>

              <div>
                <b className="inline text-odd text-xl">
                  {playlists &&
                    playlists
                      .filter(
                        (playlist: any) => playlist.owner.display_name === session?.user?.name
                      )
                      .reduce((total: number) => total + 1, 0)}
                </b>
                <p>Total playlist created</p>
              </div>

              <div>
                <b className="inline text-odd text-xl">
                  {playlists &&
                    playlists.reduce(
                      (total: number, playlist: any) => total + playlist.tracks.total,
                      0
                    )}
                </b>
                <p>Total number of tracks</p>
              </div>
            </div>
          </section>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Odditorium;
