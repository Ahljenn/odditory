import React from 'react';
import Slider from './Slider';
import { staticRecTracks } from '../static_data/staticRecTracks';
import { staticNewReleases } from '../static_data/staticNewReleases';

/**
 * This component is used to display the guest view
 * Static data is provided from the server
 */
const GuestMain: React.FC = (): JSX.Element => {
  /**
   * @returns JSX.Element - renders the main component.
   */
  return (
    <>
      <section className="flex bg-gradient-to-b to-[#181b20] from-[#282b30] padding-8 w-full ">
        <Slider tracks={staticNewReleases} id="top-slider-guest" typeTrack="new-release" />
      </section>
      <GuestRecs />
    </>
  );
};
export default GuestMain;

/**
 * This component is used to display the guest recommended tracks
 * Uses static data from the server
 */
const GuestRecs: React.FC = (): JSX.Element => {
  /**
   * @returns JSX.Element - renders the recommended tracks component.
   */
  return (
    <>
      <h1 className="text-2xl m-5 mb-0 text-center">Tracks For You</h1>
      <section className="mt-5 mx-5 grid grid-cols-2 sm:grid-cols-3 gap-4 md:grid-cols-4 xl:gap-7 max-w-screen-4xl justify-center">
        {staticRecTracks.map((track: any, index: number) => (
          <div
            className={index === 0 || index == 11 ? 'col-span-1 xl:col-span-2 xl:row-span-2' : ''}
            key={index}
          >
            <img
              src={track.album.images[0].url ?? './logo.png'}
              alt={track.name ?? 'Track'}
              className={
                index === 0 || index == 11
                  ? 'track-primary sm:w-[50.5rem] xl:w-full xl:h-[94%]'
                  : 'track-primary sm:w-[25.5rem] xl:w-[35rem]'
              }
            />
            <div className="flex flex-col justify-center">
              <h1
                className={
                  index === 0 || index === 15
                    ? 'text-center xl:text-2xl whitespace-nowrap truncate'
                    : 'text-center whitespace-nowrap truncate'
                }
              >
                {track.name}
              </h1>
              <h2
                className={
                  index === 0 || index === 15
                    ? 'text-center font-bold 2xl:text-2xl whitespace-nowrap truncate'
                    : 'text-center font-bold whitespace-nowrap truncate'
                }
              >
                {track.artists[0].name ?? 'Artist'}
              </h2>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};
