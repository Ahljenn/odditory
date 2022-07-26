import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import Router from 'next/router';

interface MusicData {
  genres: Map<string, number>;
  playlists: any[];
  topTracks: any[];
  session: any;
}
/**
 * This component renders the analysis portion of the Odditorium page containing user data and analytics.
 * Utilizes the fetched data from the Spotify API.
 */
const Analysis: React.FC<MusicData> = ({
  genres,
  playlists,
  session,
  topTracks,
}: MusicData): JSX.Element => {
  /**
   * @returns JSX.Element - renders the analysis section of the Odditorium page.
   * @param genres - the genres of the user's top tracks
   * @interface MusicData
   */

  // Try react-transition-group for animation toggling

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [artists, setArtist] = useState<Map<string, number>>(new Map());
  const MAX_INDEX = 4; //Max number of "slides"

  // Parse artist count on component load
  useEffect(() => {
    const artistCount: Map<string, number> = new Map();
    if (topTracks.length > 0) {
      topTracks.forEach((track: any) => {
        track.artists.forEach((artist: any) => {
          let artistNameId = artist.name + '~' + artist.id;
          if (artistCount.has(artistNameId)) {
            artistCount.set(
              artistNameId, // @ts-ignore - since we deal with the case that the object does not exist in the else block, we can safely ignore the error
              artistCount.get(artistNameId) + 1
            ); // Increment artist count
          } else {
            artistCount.set(artistNameId, 1); // Set artist count to 1
          }
        });
      });
    }
    setArtist(artistCount);
  }, []);

  const handleLeftClick = (): void => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(MAX_INDEX);
    }
  };

  const handleRightClick = (): void => {
    if (currentIndex < MAX_INDEX) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  return (
    <>
      <div className="flex flex-row justify-center items-center gap-8">
        <ChevronLeftIcon
          className="mt-5 cursor-pointer hover:opacity-100 hover:bg-slate-400 bg-black rounded-full opacity-50 transition-opacity duration-200"
          width={30}
          height={30}
          onClick={handleLeftClick}
        />
        <div>
          <h1 className="text-center font-bold text-xl mt-5 text-odd">Your listening habits</h1>
        </div>
        <ChevronRightIcon
          className="mt-5 cursor-pointer hover:opacity-100 hover:bg-slate-400 bg-black rounded-full opacity-50 transition-opacity duration-200"
          width={30}
          height={30}
          onClick={handleRightClick}
        />
      </div>

      {/* The top tracks */}
      {currentIndex === 0 ? (
        <>
          <h1 className="text-center font-bold text-xl mt-5">Top Tracks</h1>
          <p className="text-center my-5">
            Here are the top <b className="text-odd">50</b> tracks you&apos;ve listened to so far...
          </p>

          <div className="flex justify-center mb-5">
            <div className="grid gap-5 mx-5 grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 max-w-screen-2xl">
              {topTracks.map((track: any, index: number) => {
                return (
                  <div className="bg-secondary p-5 rounded-xl text-center" key={index}>
                    <img className="w-[30rem] mb-5" src={track.album.images[0].url} alt="album" />
                    <p>
                      <b className="text-odd capitalize text-ellipsis">{track.name}</b>
                    </p>
                    <p className="text-ellipsis">
                      <b>{track.artists[0]?.name}</b>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : null}

      {/* Top tracks analysis */}
      {currentIndex === 1 ? (
        <>
          <h1 className="text-center font-bold text-xl mt-5">Top Tracks Analysis</h1>
          <div className="flex justify-center">
            <div className="bg-secondary w-full sm:rounded-xl sm:w-[30rem] p-5 mt-5">
              <p>
                Based on your top <b className="text-odd">50</b> tracks...
              </p>
              <p>
                Your top tracks consist of <b className="text-odd">{artists.size}</b> different
                artists.
              </p>

              <p>
                Including{' '}
                <b className="text-odd">
                  {topTracks.filter((track: any) => track.explicit).length}
                </b>{' '}
                explicit tracks.
              </p>

              <p className="mt-5">
                It seems that your most listened to artist is{' '}
                <b className="text-odd capitalize">{topTracks[0].artists[0]?.name}</b>!
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 my-5 gap-5 sm:grid-cols-2 2xl:grid-cols-4 sm:mx-10">
            {Array.from(artists.entries()).map((result: [string, number], index: number) => {
              let artist = result[0].split('~')[0];
              let artistId = result[0].split('~')[1];

              return (
                <div
                  className="bg-secondary sm:rounded-xl p-5 hover:transition transition-transform duration-200 hover:scale-[0.95] hover:rounded-xl cursor-pointer"
                  key={index}
                  onClick={() => {
                    window.open(`https://open.spotify.com/artist/${artistId}`);
                  }}
                >
                  <p>
                    <b className="text-odd capitalize">{artist}</b>
                  </p>
                  <p>
                    <b>{result[1]}</b>
                    {result[1] > 1 ? ' of your top tracks ' : ' track '}
                    is by {artist}.
                  </p>
                </div>
              );
            })}
          </div>
        </>
      ) : null}

      {/* Genre analysis */}
      {currentIndex === 2 ? (
        <>
          <h1 className="text-center font-bold text-xl mt-5">Genre Analysis</h1>
          <div className="flex justify-center">
            <div className="bg-secondary w-full sm:rounded-xl sm:w-[30rem] p-5 mt-5">
              <p>
                Based on your top <b className="text-odd">50</b> tracks...
              </p>
              <p>
                Your top tracks consist of <b className="text-odd">{genres.size}</b> different
                genres.
              </p>
              <p>
                It seems that your most listened to genre is{' '}
                <b className="text-odd capitalize">{genres.entries().next().value[0]}</b>!
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 my-5 gap-5 sm:grid-cols-2 2xl:grid-cols-4 sm:mx-10">
            {Array.from(genres.entries()).map((result: [string, number], index: number) => {
              return (
                <div className="bg-secondary sm:rounded-xl p-5 " key={index}>
                  <p>
                    <b className="text-odd capitalize">{result[0]}</b>
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
        </>
      ) : null}

      {/* Playlist analysis */}
      {currentIndex === 3 ? (
        <>
          <section className="flex justify-center my-5 flex-col">
            <h1 className="text-center font-bold text-xl">Playlist Analysis</h1>
            <p className="text-center">
              So far here&apos;s what we have for <b>all</b> your playlists...
            </p>
            <div className="flex justify-center">
              <div className="w-full bg-secondary p-8 text-center flex flex-col gap-5 mt-5 sm:w-[30rem] sm:rounded-xl">
                <div>
                  <b className="inline text-odd text-xl">
                    {playlists.reduce(
                      (total: number, playlist: any) => total + playlist.tracks.total,
                      0
                    )}
                  </b>
                  <p>Total number of tracks</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <b className="inline text-odd text-xl">{playlists.length} </b>
                    <p>Overall playlists</p>
                  </div>

                  <div>
                    <b className="inline text-odd text-xl">
                      {
                        playlists.filter(
                          (playlist: any) => playlist.owner.display_name === session?.user?.name
                        ).length
                      }
                    </b>
                    <p>Created playlists</p>
                  </div>

                  <div>
                    <b className="inline text-odd text-xl">
                      {playlists.filter((playlist: any) => playlist.public).length}
                    </b>
                    <p>Public playlists</p>
                  </div>
                  <div>
                    <b className="inline text-odd text-xl">
                      {playlists.filter((playlist: any) => !playlist.public).length}
                    </b>
                    <p>Private playlists</p>
                  </div>
                  <div>
                    <b className="inline text-odd text-xl">
                      {playlists.filter((playlist: any) => playlist.collaborative).length}
                    </b>
                    <p>Collaborations</p>
                  </div>
                  <div>
                    <b className="inline text-odd text-xl">
                      {
                        playlists.filter(
                          (playlist: any) => playlist.owner.display_name === 'Spotify'
                        ).length
                      }
                    </b>
                    <p>Spotify Created</p>
                  </div>
                </div>

                <button
                  className="default-button"
                  onClick={() => {
                    Router.push('/playlist');
                  }}
                >
                  Go to your playlists
                </button>
              </div>
            </div>
          </section>
        </>
      ) : null}

      {/* Next steps */}
      {currentIndex === 4 ? (
        <>
          <section>
            <h1 className="text-center font-bold text-xl mt-5">Next steps</h1>
            <p className="text-center">Let&apos;s make a playlist catered for you.</p>

            <div className="flex justify-center">
              <div className="grid grid-cols-1 2xl:grid-cols-2 mx-5 mb-10 gap-2 w-1/2">
                <button className="default-button bg-secondary border-solid border-[1px] hover:border-red-800 rounded-full">
                  Discover new music.
                </button>
                <button className="default-button bg-secondary border-solid border-[1px] hover:border-blue-800 rounded-full">
                  More of what I like.
                </button>
                <button className="default-button bg-secondary border-solid border-[1px] hover:border-purple-800 rounded-full">
                  A little bit of both.
                </button>
                <button className="default-button bg-secondary border-solid border-[1px] rounded-full">
                  Suprise me!
                </button>
              </div>
            </div>
          </section>
        </>
      ) : null}
    </>
  );
};

export default Analysis;
