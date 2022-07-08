import React, { useState, useEffect } from 'react';

interface SessionData {
  spotifyApi: any;
}

const RecentTracks: React.FC<SessionData> = ({ spotifyApi }: SessionData): JSX.Element => {
  const [recent, setRecent] = useState<any[]>([]);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      (async () => {
        try {
          const data = await spotifyApi.getMyRecentlyPlayedTracks({ limit: 12 });
          setRecent(data.body.items);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [spotifyApi]);

  console.log(recent);

  return <div>RecentTracks</div>;
};

export default RecentTracks;
