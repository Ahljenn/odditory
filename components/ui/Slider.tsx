import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';

import React from 'react';

interface SliderData {
  tracks: any[];
  id: string;
  typeTrack: string;
}

/**
 * This component renders a generic slider containing tracks with a button feature.
 * The user is able to scroll or use the buttons to traverse the slider.
 * The soruce image is rendered conditionally based on the type of track.
 */
const Slider: React.FC<SliderData> = ({ tracks, id, typeTrack }: SliderData): JSX.Element => {
  /**
   * @param {SliderData} - props passed in from the parent component containing tracks and id.
   * @returns JSX.Element.
   */
  const slideLeft = (): void => {
    const slider = document.getElementById(id);
    slider!.scrollLeft -= 500;
  };

  const slideRight = (): void => {
    const slider = document.getElementById(id);
    slider!.scrollLeft += 500;
  };

  console.log(tracks);

  return (
    <>
      <div className="w-full flex flex-row justify-center ">
        <ChevronLeftIcon
          className="cursor-pointer opacity-50 hover:opacity-100"
          width={120}
          onClick={slideLeft}
        />
        <div
          id={id}
          className="pt-8 flex items-end whitespace-nowrap px-10 space-x-10 overflow-x-scroll scrollbar-hide scroll-smooth sm:px-15 sm:space-x-15 "
        >
          {tracks &&
            tracks.map((track: any) => (
              <div className="flex flex-col" key={track.id}>
                <img
                  className="cursor-pointer hover:scale-[1.15] hover:bg-slate-400 transition-transform duration-300 bg-slate-600 rounded-lg p-1 w-[9rem] sm:w-[11.5rem] "
                  src={
                    typeTrack === 'new-release'
                      ? track?.images[0]?.url
                      : track?.album?.images[0]?.url
                  }
                  alt={track?.name}
                />
                <p className="mt-5 text-center text-sm w-[9rem] sm:w-[11.5rem] truncate">
                  {track.name}
                </p>
                <h2 className="text-center font-bold whitespace-nowrap mb-5">
                  {track.artists[0].name}
                </h2>
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

export default Slider;
