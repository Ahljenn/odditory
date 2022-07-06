import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import useSpotify from '../hooks/useSpotify';
import Loading from './Loading';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import Playlist from './Playlist';

interface SessionData {
  spotifyApi: any;
}

const Recs: React.FC<SessionData> = ({ spotifyApi }: SessionData): JSX.Element => {
  const [recs, setRecs] = useState<any[]>([]);
  const [isLoaded, setLoaded] = useState(false);
  let tempGrid: Array<any> = new Array(20);

  //Initialize array for temporary grid when loading recs
  for (let i = 0; i < tempGrid.length; i++) {
    tempGrid[i] = {};
  }

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      (async () => {
        const tracks = await spotifyApi.getMyTopTracks({ limit: 10 });
        let temp: any = new Set();
        tracks.body.items
          .filter((artist: any) => {
            return artist.artists.length > 0;
          })
          .map((artist: any) => {
            temp.add(artist.artists[0].id);
          });
        let seed = Array.from(temp);

        const data = await spotifyApi.getRecommendations({
          seed_artists: [seed[0], seed[Math.floor(seed.length / 2)], seed[seed.length - 1]],
          seed_genres: ['pop'],
          seed_tracks: [seed[0]],
        });
        setRecs(data.body.tracks);
        setLoaded(true);
      })();
    }
  }, [spotifyApi]);

  return (
    <section className="mt-5 grid grid-cols-3 gap-4 sm:grid-cols-4 xl:gap-7 max-w-screen-4xl justify-center">
      {isLoaded
        ? recs.map((track: any, index: number) => (
            <div
              className={index === 4 || index == 15 ? 'col-span-1 xl:col-span-2 xl:row-span-2' : ''}
              key={index}
            >
              <img
                src={track.album.images[0].url}
                className={
                  index === 4 || index == 15
                    ? 'track-primary sm:w-[50.5rem] 2xl:w-[60rem]'
                    : 'track-primary sm:w-[25.5rem] 2xl:w-[35rem]'
                }
              />
              <div className="flex flex-col justify-center">
                <h1
                  className={
                    index === 4 || index === 15
                      ? 'text-center text-2xl whitespace-nowrap truncate'
                      : 'text-center whitespace-nowrap truncate'
                  }
                >
                  {track.name}
                </h1>
                <h2
                  className={
                    index === 4 || index === 15
                      ? 'text-center font-bold text-2xl whitespace-nowrap'
                      : 'text-center font-bold whitespace-nowrap'
                  }
                >
                  {track.artists[0].name}
                </h2>
              </div>
            </div>
          ))
        : tempGrid.map((temp, index) => (
            <div
              className={index === 4 || index == 15 ? 'col-span-1 xl:col-span-2 xl:row-span-2' : ''}
              key={index}
            >
              <img
                src="./logo.png"
                className={
                  index === 4 || index == 15
                    ? 'track-primary sm:w-[50.5rem] 2xl:w-[60rem] opacity-5'
                    : 'track-primary sm:w-[25.5rem] 2xl:w-[35rem] opacity-5'
                }
              />
            </div>
          ))}
    </section>
  );
};

const Main: React.FC = (): JSX.Element => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [tracks, setTracks] = useState<any[]>([]);
  const [isLoaded, setLoaded] = useState<boolean>(false);
  const [seed, setSeed] = useState<string[]>([]);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      (async () => {
        const data = await spotifyApi.getMyTopTracks({ limit: 10 });
        setTracks(data.body.items);
        setLoaded(true);
      })();
    }
  }, [session, spotifyApi]);

  //Try https://css-tricks.com/pure-css-horizontal-scrolling/
  const slideLeft = (): void => {
    const slider = document.getElementById('slider-top');
    slider!.scrollLeft -= 500;
  };

  const slideRight = (): void => {
    const slider = document.getElementById('slider-top');
    slider!.scrollLeft += 500;
  };

  return (
    <>
      {/* <h1 className="absolute left-0 right-0 text-center text-xl italic">MY TOP TRACKS</h1> */}
      <section className="flex bg-gradient-to-b to-[#181b20] from-[#282b30] h-80 padding-8 w-full">
        {isLoaded ? (
          <div className="w-full flex flex-row justify-center">
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
      <section className="flex justify-center">
        {isLoaded ? <Recs spotifyApi={spotifyApi} /> : <></>}
      </section>
      <Playlist />
    </>
  );
};

export default Main;
