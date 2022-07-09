import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import Loading from '../ui/Loading';

interface TrackData {
  tracks: any[];
  isLoaded: boolean;
}

/**
 * This component is used to display the top tracks for the user.
 * Relies on top tracks to be loaded in the state
 */
const TopTracks: React.FC<TrackData> = ({ tracks, isLoaded }: TrackData): JSX.Element => {
  /**
   * @param {TrackData} - props passed in from the parent component containing tracks and load state
   * @returns JSX.Element
   */
  const slideLeft = (): void => {
    const slider = document.getElementById('slider-top');
    slider!.scrollLeft -= 500;
  };

  const slideRight = (): void => {
    const slider = document.getElementById('slider-top');
    slider!.scrollLeft += 500;
  };

  return (
    <section className="flex bg-gradient-to-b to-[#181b20] from-[#282b30] padding-8 w-full ">
      {isLoaded ? (
        <div className="w-full flex flex-row justify-center ">
          <ChevronLeftIcon
            className="cursor-pointer opacity-50 hover:opacity-100"
            width={120}
            onClick={slideLeft}
          />
          <div
            id="slider-top"
            className="pt-8 flex items-end whitespace-nowrap px-10 space-x-10 overflow-x-scroll scrollbar-hide scroll-smooth sm:px-15 sm:space-x-15 "
          >
            {tracks &&
              tracks.map((track: any) => (
                <div className="flex flex-col" key={track.id}>
                  <img
                    className="cursor-pointer hover:scale-[1.15] hover:bg-slate-400 transition-transform duration-300 bg-slate-600 rounded-lg p-1 w-[9rem] sm:w-[11.5rem] "
                    src={track?.album?.images[0]?.url}
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
      ) : (
        <Loading />
      )}
    </section>
  );
};

export default TopTracks;
