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
      <SubpageHeader pagename="COLLECTIONS" />
      <section className="flex space-x-7 bg-gradient-to-b to-secondary from-primary h-80 padding-8 w-full">
        {isLoaded ? (
          <div className="flex flex-col">
            {playlists.map((playlist: any) => (
              <div className="flex flex-col justify-center items-center" key={playlist.id}>
                <img src={playlist.images[0].url} alt={playlist.name} />
                <p className="text-center text-sm">{playlist.name}</p>
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
