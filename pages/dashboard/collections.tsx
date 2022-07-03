import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import SubpageHeader from '../../components/ui/SubpageHeader';
import useSpotify from '../../components/hooks/useSpotify';
import Loading from '../../components/ui/Loading';

const Collections: React.FC = (): JSX.Element => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [isLoaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data: any) => {
        setPlaylists(data.body.items);
        setLoaded(true);
      });
    }
  }, [session, spotifyApi]);

  console.log(playlists);

  return (
    <>
      <SubpageHeader pageName="COLLECTIONS" />
      <section className="flex bg-gradient-to-b to-secondary from-primary h-80 padding-8 w-full">
        {isLoaded ? (
          <div className="flex items-end whitespace-nowrap px-10 space-x-10 overflow-x-scroll scrollbar-hide sm:px-20 sm:space-x-20">
            {playlists &&
              playlists.map((playlist: any) => (
                <div className="flex flex-col" key={playlist.id}>
                  <img
                    className="cursor-pointer hover:scale-110 hover:bg-slate-400 transition-transform duration-300 bg-slate-600 rounded-lg p-1 w-[9rem] sm:w-[12.5rem]"
                    src={playlist.images[0].url}
                    alt={playlist.name}
                  />
                  <p className="mt-5 text-center text-sm mb-10 w-[9rem] font-bold sm:w-[12.5rem] ">
                    {playlist.name}
                  </p>
                </div>
              ))}
          </div>
        ) : (
          <Loading />
        )}
      </section>
    </>
  );
};

export default Collections;
