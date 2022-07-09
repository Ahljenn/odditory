import React, { useState, useEffect } from 'react';

interface SessionData {
  spotifyApi: any;
}

const NewReleases: React.FC<SessionData> = ({ spotifyApi }: SessionData): JSX.Element => {
  const [newTracks, setTracks] = useState<any[]>([]);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      (async () => {
        try {
          const data = await spotifyApi.getNewReleases({ limit: 12 });
          setTracks(data.body.albums.items);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [spotifyApi]);

  console.log(newTracks);

  return <div>NewReleases</div>;
};

export default NewReleases;
