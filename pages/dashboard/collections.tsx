import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import SubpageHeader from '../../components/ui/SubpageHeader';
import useSpotify from '../../components/hooks/useSpotify';

const Collections: React.FC = (): JSX.Element => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      console.log(1111111111111111);
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  console.log(playlists);
  console.log(session);

  return (
    <>
      <SubpageHeader pagename="COLLECTIONS" />
    </>
  );
};

export default Collections;
