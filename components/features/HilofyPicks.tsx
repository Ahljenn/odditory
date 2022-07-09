import React from 'react';
import { ArrowCircleRightIcon } from '@heroicons/react/outline';

const tempData: any[] = [
  {
    img: 'https://i.scdn.co/image/ab67616d0000b273e06efb1191c9c4e1c072c668',
  },
  {
    img: 'https://i.scdn.co/image/ab67616d0000b273e06efb1191c9c4e1c072c668',
  },
  {
    img: 'https://i.scdn.co/image/ab67616d0000b273e06efb1191c9c4e1c072c668',
  },
  {
    img: 'https://i.scdn.co/image/ab67616d0000b273e06efb1191c9c4e1c072c668',
  },
];

interface Props {}
/**
 * This component is used to render Hilofy top picks to the user
 * Displays a card for each track
 */
const HilofyPicks: React.FC = (props: Props): JSX.Element => {
  /**
   * @returns JSX.Element - renders the top picks component.
   */
  return (
    <>
      <h1 className="text-2xl m-5 mb-0 self-center">Hilofy Picks</h1>
      <section className="grid grid-cols-4">
        {tempData.map((track: any, index: number) => {
          return (
            <div className="gap-4 mx-5">
              <div className="flex flex-col items-center justify-center">
                <img src={track.img} className="w-full h-auto" />
                <div className="flex items-center gap-1 justify-start w-full ">
                  <ArrowCircleRightIcon width={30} />
                  <h1>Details</h1>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default HilofyPicks;
