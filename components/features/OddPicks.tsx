import React from 'react';
import { ArrowCircleRightIcon } from '@heroicons/react/outline';

const tempData: any[] = [
  {
    img: 'https://i.scdn.co/image/ab67616d0000b273733e6d7818eef87d20df86b5',
  },
  {
    img: 'https://i.scdn.co/image/ab67616d0000b2730f36079f1801980c665989b1',
  },
  {
    img: 'https://i.scdn.co/image/ab67616d0000b273ef51817e6a6563b6f7ce5872',
  },
  {
    img: 'https://i.scdn.co/image/ab67616d0000b2733138f891f3075c9c5d944037',
  },
];

interface Props {}
/**
 * This component is used to render Odditory top picks to the user
 * Displays a card for each track
 */
const OddPicks: React.FC = (props: Props): JSX.Element => {
  /**
   * @returns JSX.Element - renders the top picks component.
   */
  return (
    <>
      <h1 className="text-xl font-bold m-5 mb-0 self-center">Odd Picks</h1>
      <section className="mt-5 flex justify-center bg-gradient-to-b to-slate-700 from-primary padding-8 h-[40rem] w-full">
        <div className="grid grid-cols-2 sm:grid-cols-4 sm:mx-4 sm:gap-4">
          {tempData.map((track: any, index: number) => {
            return (
              <div className={index >= 2 ? 'invisible sm:visible mx-1' : 'mx-1'} key={index}>
                <div className="flex flex-col items-center justify-center">
                  <img src={track.img} className="track-primary sm:w-[25.5rem] xl:w-[35rem]" />
                  <div className="flex items-center gap-1 justify-start w-full invisible sm:visible my-[-50px] ml-5 xl:text-xl">
                    <ArrowCircleRightIcon width={30} />
                    <h1 className="invisible sm:visible">Details</h1>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default OddPicks;
