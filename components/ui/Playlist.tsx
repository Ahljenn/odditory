import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import { useSession } from 'next-auth/react';
import useSpotify from '../../components/hooks/useSpotify';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';

const Playlist: React.FC = (): JSX.Element => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState<any[]>([]);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data: any) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  const slideLeft = (): void => {
    const slider = document.getElementById('slider-playlist');
    slider!.scrollLeft -= 500;
  };

  const slideRight = (): void => {
    const slider = document.getElementById('slider-playlist');
    slider!.scrollLeft += 500;
  };

  return (
    <div className="w-full flex flex-row justify-center">
      <ChevronLeftIcon
        className="cursor-pointer opacity-50 hover:opacity-100"
        width={120}
        onClick={slideLeft}
      />
      <div
        id="slider-playlist"
        className="pt-8 flex items-end whitespace-nowrap px-10 space-x-10 overflow-x-scroll scrollbar-hide scroll-smooth sm:px-15 sm:space-x-15 "
      >
        {playlists &&
          playlists.map((playlist: any) => (
            <div className="flex flex-col" key={playlist.id}>
              <img
                onClick={(): void => {
                  Router.push(playlist.external_urls.spotify);
                }}
                className="cursor-pointer hover:scale-[1.15] hover:bg-slate-400 transition-transform duration-300 bg-slate-600 rounded-lg p-1 w-[9rem] sm:w-[11.5rem]"
                src={playlist.images[0].url}
                alt={playlist.name}
              />
              <p className="mt-5 text-center text-sm mb-10 w-[9rem] font-bold  sm:w-[11.5rem] truncate">
                {playlist.name}
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
  );
};

export default Playlist;
