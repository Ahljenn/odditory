import React, { useState, useEffect } from 'react';

interface SessionData {
  spotifyApi: any;
}

/**
 * This component is used to display new releases for the user.
 * Uses the spotifyApi from the parent component
 */
const NewReleases: React.FC<SessionData> = ({ spotifyApi }: SessionData): JSX.Element => {
  /**
   * @param {SessionData} - props passed in from the parent component containing spotifyApi interface
   * @returns JSX.Element
   */
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
