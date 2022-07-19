import React, { useState, useEffect } from 'react';
import SubpageHeader from '../../components/ui/SubpageHeader';
import useSpotify from '../../components/hooks/useSpotify';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Head from 'next/head';

/**
 * This component renders the dynamic page depending on the user's playlist selection.
 */
const PlaylistResult: React.FC = (): JSX.Element => {
  /**
   * @returns JSX.Element - renders the playlist result component.
   */
  const router = useRouter();
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const { playlistId, playlistTitle, playlistOwner } = router.query;
  const [tracks, setTracks] = useState<any[]>([]);
  const [cover, setCover] = useState('/logo.png');

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      (async () => {
        try {
          const data = await spotifyApi.getPlaylistTracks(playlistId);
          setTracks(data.body.items);
        } catch (error) {
          console.log(error);
        }
      })();
      (async () => {
        try {
          const data = await spotifyApi.getPlaylist(playlistId);
          setCover(data.body.images[0].url);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [spotifyApi, playlistId, session]);

  return (
    <>
      <Head>
        <title>Odditory | {playlistTitle}</title>
        <link rel="icon" href="/logofav.png" />
      </Head>
      <SubpageHeader pageName="Playlist" />
      <section className="flex justify-center bg-gradient-to-b to-secondary from-primary padding-8 w-full ">
        <div className="flex flex-col items-center">
          <div
            className={
              cover === '/logo.png'
                ? 'animate-pulse relative h-[20rem] w-[20rem] sm:h-[30rem] sm:w-[30rem] bg-slate-700 rounded-lg'
                : 'relative h-[20rem] w-[20rem] sm:h-[30rem] sm:w-[30rem]'
            }
          >
            <Image
              className={'rounded-lg'}
              src={cover}
              layout="fill"
              objectFit="fill"
              quality={100}
            />
          </div>

          <h1 className="text-xl font-bold pt-5 truncate">{playlistTitle}</h1>
          <h1 className="text-xl italic pb-5 truncate">{playlistOwner}</h1>
        </div>
      </section>
      <div className="flex justify-center flex-col max-w-2xl mx-auto mb-5">
        {tracks &&
          tracks.map((track: any, index: number) => {
            return (
              <div
                className="cursor-pointer flex items-center gap-5 mt-5 rounded-lg p-3 bg-gradient-to-r 
                hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500
                from-slate-600 via-slate-500 to-slate-500"
                key={index}
              >
                <div className="relative h-[5rem] w-[5rem] 2xl:w-[7rem] 2xl:h-[7rem]">
                  <Image
                    className="rounded-lg"
                    src={track.track.album.images[0].url}
                    layout="fill"
                    objectFit="fill"
                  />
                </div>
                <div className="flex flex-col truncate">
                  <h1 className="text-xl truncate">
                    {index + 1}. {track.track.name}
                  </h1>
                  <h1 className="text-xl truncate">{track.track.artists[0].name}</h1>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default PlaylistResult;
