import React, { useState, useEffect } from 'react';
import SubpageHeader from '../../components/ui/SubpageHeader';
import useSpotify from '../../components/hooks/useSpotify';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

/**
 * This component renders the dynamic page depending on the user's playlist selection.
 */
const playlistResult: React.FC = (): JSX.Element => {
  /**
   * @returns JSX.Element - renders the playlist result component.
   */
  const router = useRouter();
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const { playlistImg, playlistId, playlistTitle } = router.query;
  const [tracks, setTracks] = useState<any[]>([]);

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
    }
  }, [spotifyApi, playlistId, session]);

  console.log('1', playlistImg, playlistId);

  return (
    <>
      <SubpageHeader pageName="Playlist" />
      <section className="flex justify-center bg-gradient-to-b to-secondary from-primary padding-8 w-full">
        <div className="flex flex-col items-center">
          <img className="w-[20rem] sm:w-[30rem] bg-slate-600 rounded-lg p-3" src={playlistImg} />
          <h1 className="text-xl font-bold py-5 truncate">{playlistTitle}</h1>
        </div>
      </section>
      <div className="flex justify-center flex-col">
        {tracks &&
          tracks.map((track: any, index: number) => {
            return (
              <div className="flex items-center gap-5 mb-5">
                <img
                  className="w-[5rem] bg-slate-600 rounded-lg p-1"
                  src={track.track.album.images[0].url}
                />
                <div className="flex flex-col">
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

export default playlistResult;
