import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import useSpotify from '../hooks/useSpotify';
import Loading from './Loading';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
//Try https://css-tricks.com/pure-css-horizontal-scrolling/

interface SessionData {
  spotifyApi: any;
  seed: Array<string>;
}

//Try in a separate component / page
const Recs: React.FC<SessionData> = ({ spotifyApi, seed }: SessionData): JSX.Element => {
  const [recs, setRecs] = useState<any[]>([]);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      (async () => {
        const data = await spotifyApi.getRecommendations({
          seed_artists: [seed[0], seed[Math.floor(seed.length / 2)], seed[seed.length - 1]],
          seed_genres: ['pop'],
          seed_tracks: [seed[0]],
        });
        setRecs(data.body.tracks);
        console.log('CALL IN RECS');
      })();
    }
  }, []);

  // console.log(recs);

  return (
    <section>
      {recs &&
        recs.map((track: any) => (
          <div className="" key={track.id}>
            <img
              src={track.album.images[0].url}
              className="cursor-pointer hover:scale-[1.15] hover:bg-slate-400 transition-transform duration-300 bg-slate-600 rounded-lg p-1 w-[15rem] sm:w-[25.5rem]"
            />
            <div className="flex flex-col justify-center">
              <h1 className="">{track.name}</h1>
              <h2 className="">{track.artists[0].name}</h2>
            </div>
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
        const data = await spotifyApi.getMyTopTracks({ limit: 50 });
        setTracks(data.body.items);
        console.log('CALL IN TOP TRACKS');
        let temp: any = new Set();
        tracks
          .filter((artist: any) => {
            return artist.artists.length > 0;
          })
          .map((artist: any) => {
            temp.add(artist.artists[0].id);
          });
        setSeed(Array.from(temp));
        setLoaded(true);
      })();
    }
  }, [session, spotifyApi]);

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
      <h1 className="absolute left-0 right-0 text-center text-xl italic">MY TOP TRACKS</h1>
      <section className="flex bg-gradient-to-b to-[#181b20] from-[#282b30] h-80 padding-8 w-full">
        {isLoaded ? (
          <div className="w-full flex flex-row">
            <ChevronLeftIcon
              className="cursor-pointer opacity-50 hover:opacity-100"
              width={120}
              onClick={slideLeft}
            />
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
      <section>{isLoaded ? <Recs spotifyApi={spotifyApi} seed={seed} /> : <></>}</section>
    </>
  );
};

export default Main;
