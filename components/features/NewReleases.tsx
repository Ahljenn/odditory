import React, { useState, useEffect } from 'react';
import Slider from '../ui/Slider';

interface SessionData {
  spotifyApi: any;
}

/**
 * This component is used to display new releases for the user.
 * Uses the spotifyApi from the parent component.
 */
const NewReleases: React.FC<SessionData> = ({ spotifyApi }: SessionData): JSX.Element => {
  /**
   * @param {SessionData} - props passed in from the parent component containing spotifyApi interface.
   * @returns JSX.Element.
   */
  const [newTracks, setTracks] = useState<any[]>([]);

  const slideLeft = (): void => {
    const slider = document.getElementById('slider-bottom');
    slider!.scrollLeft -= 500;
  };

  const slideRight = (): void => {
    const slider = document.getElementById('slider-bottom');
    slider!.scrollLeft += 500;
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      (async () => {
        try {
          const data = await spotifyApi.getNewReleases({ limit: 11 });
          setTracks(data.body.albums.items);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [spotifyApi]);

  return (
    <>
      <h1 className="text-xl font-bold m-5 mb-0 self-center">New Releases</h1>
      <section className="flex padding-8 w-full">
        <Slider tracks={newTracks} id="new-releases-slider" typeTrack="new-release" />
      </section>
    </>
  );
};

export default NewReleases;
