import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import { useSession } from 'next-auth/react';
import SubpageHeader from '../../components/ui/SubpageHeader';
import useSpotify from '../../components/hooks/useSpotify';
import Loading from '../../components/ui/Loading';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import Head from 'next/head';

const Playlists: React.FC = (): JSX.Element => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [isLoaded, setLoaded] = useState<boolean>(false);
  const [searchPlaylist, setSearchPlaylist] = useState<string>('');

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists({ limit: 50 }).then((data: any) => {
        setPlaylists(data.body.items);
        setLoaded(true);
      });
    }
  }, [session, spotifyApi, isLoaded]);

  const slideLeft = (): void => {
    const slider = document.getElementById('slider');
    slider!.scrollLeft -= 500;
  };

  const slideRight = (): void => {
    const slider = document.getElementById('slider');
    slider!.scrollLeft += 500;
  };

  return (
    <>
      <Head>
        <title>Odditory | Playlists</title>
        <link rel="icon" href="/logofav.png" />
      </Head>
      <SubpageHeader pageName="Playlists" />
      <section className="flex bg-gradient-to-b to-secondary from-primary xl:h-80 padding-8 w-full">
        {isLoaded ? (
          <div className="w-full flex flex-row">
            <ChevronLeftIcon
              className="cursor-pointer hover:opacity-100 hover:bg-slate-400 bg-black rounded-full absolute left-0 mt-[8rem] z-100"
              width={50}
              onClick={slideLeft}
            />
            <div
              id="slider"
              className="pt-8 flex items-end whitespace-nowrap px-10 space-x-10 overflow-x-scroll scrollbar-hide scroll-smooth sm:px-15 sm:space-x-15 "
            >
              {playlists &&
                playlists
                  .filter((playlist: any) => {
                    if (searchPlaylist === '') {
                      return playlist;
                    } else {
                      return playlist.name.toLowerCase().includes(searchPlaylist.toLowerCase());
                    }
                  })
                  .map((playlist: any, key: number) => {
                    return (
                      <div className="flex flex-col" key={playlist.id}>
                        <img
                          onClick={(): void => {
                            Router.push({
                              pathname: '/playlist/[playlistResult]',
                              query: {
                                playlistId: playlist.id as string,
                                playlistTitle: playlist.name as string,
                                playlistOwner: playlist.owner.display_name as string,
                              },
                            });
                          }}
                          className="cursor-pointer hover:bg-slate-400 transition-transform duration-300 bg-slate-600 rounded-lg p-1 w-[9rem] sm:w-[11.5rem]"
                          src={playlist.images[0].url}
                          alt={playlist.name}
                        />
                        <p className="mt-5 text-center text-sm mb-10 w-[9rem] font-bold  sm:w-[11.5rem] truncate">
                          {playlist.name}
                        </p>
                      </div>
                    );
                  })}
            </div>
            <ChevronRightIcon
              className="cursor-pointer bg-black hover:bg-slate-400 rounded-full absolute right-0 mt-[8rem] z-100"
              width={50}
              onClick={slideRight}
            />
          </div>
        ) : (
          <Loading />
        )}
      </section>
      {isLoaded ? (
        <div className="text-center">
          <input
            type="text"
            className="mt-5 bg-gray-200 border-2 sm:text-2xl border-gray-200 rounded w-[15rem] sm:w-[35rem] py-2 px-4 text-gray-700 focus:outline-none focus:bg-white focus:border-pink-500"
            placeholder="Search Playlist By Name"
            onChange={(e) => setSearchPlaylist(e.target.value)}
          />
          <div className="flex flex-col sm:flex-row justify-center gap-5 my-5 items-center sm:text-right sm:text-2xl">
            {/* <div>
              <h1>
                <span>Total playlist count: </span>
                <b className="inline text-odd">{playlists && playlists.length}</b>
              </h1>
              <h1>
                <span>Total playlist created: </span>
                <b className="inline text-odd">
                  {playlists &&
                    playlists
                      .filter(
                        (playlist: any) => playlist.owner.display_name === session?.user?.name
                      )
                      .reduce((total: number) => total + 1, 0)}
                </b>
              </h1>
              <h1>
                <span>Total number of tracks: </span>
                <b className="inline text-odd">
                  {playlists &&
                    playlists.reduce(
                      (total: number, playlist: any) => total + playlist.tracks.total,
                      0
                    )}
                </b>
              </h1>
            </div> */}

            <button
              className="w-[7rem] cursor-pointer font-semibold transition duration-300 hover:bg-secondary bg-slate-600 rounded-xl p-2"
              onClick={() => {
                setLoaded(false);
              }}
            >
              Resync
            </button>
          </div>
        </div>
      ) : (
        <h1 className="mt-5 text-center text-xl">Nothing loaded (yet)!</h1>
      )}
    </>
  );
};

export default Playlists;
