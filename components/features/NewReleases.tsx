import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';

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
          const data = await spotifyApi.getNewReleases({ limit: 12 });
          setTracks(data.body.albums.items);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [spotifyApi]);

  console.log(newTracks);

  return (
    <>
      <h1 className="text-2xl m-5 mb-0 self-center">New Releases</h1>
      <div className="w-full flex flex-row justify-center ">
        <ChevronLeftIcon
          className="cursor-pointer opacity-50 hover:opacity-100"
          width={120}
          onClick={slideLeft}
        />
        <div
          id="slider-bottom"
          className="pt-8 flex items-end whitespace-nowrap px-10 space-x-10 overflow-x-scroll scrollbar-hide scroll-smooth sm:px-15 sm:space-x-15 "
        >
          {newTracks &&
            newTracks.map((track: any) => (
              <div className="flex flex-col" key={track.id}>
                <img
                  className="cursor-pointer hover:scale-[1.15] hover:bg-slate-400 transition-transform duration-300 bg-slate-600 rounded-lg p-1 w-[9rem] sm:w-[11.5rem] "
                  src={track?.images[0]?.url}
                  alt={track?.name}
                />
                <p className="mt-5 text-center text-sm mb-10 w-[9rem] font-bold sm:w-[11.5rem] truncate">
                  {track.name}
                </p>
              </div>
            ))}
        </div>
        <ChevronRightIcon
          className="cursor-pointer opacity-50 hover:opacity-100"
          width={120}
          onClick={slideRight}
        />
      </div>
    </>
  );
};

export default NewReleases;
