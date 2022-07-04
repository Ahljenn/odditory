import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import useSpotify from '../hooks/useSpotify';
import Loading from './Loading';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
//Try https://css-tricks.com/pure-css-horizontal-scrolling/

interface Props {}

const Main: React.FC<Props> = (props: Props): JSX.Element => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [tracks, setTracks] = useState<any[]>([]);
  const [isLoaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getMyTopTracks().then((data: any) => {
        setTracks(data.body.items);
        setLoaded(true);
      });
    }
  }, [session, spotifyApi, isLoaded]);

  console.log(tracks);

  const slideLeft = (): void => {
    const slider = document.getElementById('slider');
    slider!.scrollLeft -= 500;
  };

  const slideRight = (): void => {
    const slider = document.getElementById('slider');
    slider!.scrollLeft += 500;
  };

  return (
    <>
      <section className="flex items-end space-x-7 bg-gradient-to-b to-[#181b20] from-[#282b30] h-80 padding-8 w-full">
        {isLoaded ? (
          <div className="w-full flex flex-row">
            <ChevronLeftIcon className="cursor-pointer" width={100} onClick={slideLeft} />
            <div
              id="slider"
              className="pt-8 flex items-end whitespace-nowrap px-10 space-x-10 overflow-x-scroll scrollbar-hide scroll-smooth sm:px-15 sm:space-x-15 "
            >
              {tracks &&
                tracks.map((track: any) => (
                  <div className="flex flex-col" key={track.id}>
                    <img
                      className="cursor-pointer hover:scale-[1.15] hover:bg-slate-400 transition-transform duration-300 bg-slate-600 rounded-lg p-1 w-[9rem] sm:w-[11.5rem]"
                      src={track?.album?.images[0]?.url}
                      alt={track?.name}
                    />
                    <p className="mt-5 text-center text-sm mb-10 w-[9rem] font-bold sm:w-[11.5rem] truncate">
                      {track.name}
                    </p>
                  </div>
                ))}
            </div>
            <ChevronRightIcon className="cursor-pointer" width={100} onClick={slideRight} />
          </div>
        ) : (
          <Loading />
        )}
      </section>
    </>
  );
};

export default Main;
