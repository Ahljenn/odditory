import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';

interface MusicData {
  genres: Map<string, number>;
  playlists: any[];
  session: any;
}
/**
 * This component renders the analysis portion of the Odditorium page containing user data and analytics.
 * Utilizes the fetched data from the Spotify API.
 */
const Analysis: React.FC<MusicData> = ({ genres, playlists, session }: MusicData): JSX.Element => {
  /**
   * @returns JSX.Element - renders the analysis section of the Odditorium page.
   * @param genres - the genres of the user's top tracks
   * @interface MusicData
   */
  return (
    <>
      <div className="flex flex-row justify-center items-center gap-8">
        <ChevronLeftIcon
          className="mt-5 cursor-pointer hover:opacity-100 hover:bg-slate-400 bg-black rounded-full opacity-50"
          width={50}
          height={50}
        />
        <div>
          <h1 className="text-center font-bold text-xl mt-5">Genre Analysis</h1>
        </div>
        <ChevronRightIcon
          className="mt-5 cursor-pointer hover:opacity-100 hover:bg-slate-400 bg-black rounded-full opacity-50"
          width={50}
          height={50}
        />
      </div>

      <p className="text-center">
        It seems that your most listened to genre is{' '}
        <b className="text-odd">{genres.entries().next().value[0]}</b>!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 mt-5 sm:mx-10 gap-5">
        {Array.from(genres.entries()).map((result: [string, number], index: number) => {
          return (
            <div className="bg-secondary sm:rounded-xl p-5" key={index}>
              <p>
                <b className="text-odd">{result[0]}</b>
              </p>
              <p>
                <b>{result[1]}</b>
                {result[1] > 1 ? ' of your top tracks ' : ' track '}
                is {result[0]} music.
              </p>
            </div>
          );
        })}
      </div>

      {/* Playlist analysis */}
      <section className="flex justify-center my-5 flex-col">
        <h1 className="text-center font-bold text-xl">Playlist Analysis</h1>
        <p className="text-center">So far here&apos;s what we have for your playlists...</p>
        <div className="w-full bg-secondary p-8 text-center flex flex-col gap-5 mt-5">
          <div>
            <b className="inline text-odd text-xl">{playlists && playlists.length} </b>
            <p>Total playlists</p>
          </div>

          <div>
            <b className="inline text-odd text-xl">
              {playlists &&
                playlists
                  .filter((playlist: any) => playlist.owner.display_name === session?.user?.name)
                  .reduce((total: number) => total + 1, 0)}
            </b>
            <p>Total playlist created</p>
          </div>

          <div>
            <b className="inline text-odd text-xl">
              {playlists &&
                playlists.reduce(
                  (total: number, playlist: any) => total + playlist.tracks.total,
                  0
                )}
            </b>
            <p>Total number of tracks</p>
          </div>
        </div>
      </section>

      {/* Next steps */}
      <section>
        <h1 className="text-center font-bold text-xl">Next steps</h1>
        <p className="text-center">Let&apos;s make a playlist catered for you.</p>

        <div className="flex justify-center">
          <div className="grid grid-cols-1 2xl:grid-cols-2 mx-5 mb-10 gap-2 w-1/2">
            <button className="default-button bg-secondary border-double border-2 border-red-600">
              Discover new music.
            </button>
            <button className="default-button bg-secondary border-double border-2 border-blue-800">
              More of what I like.
            </button>
            <button className="default-button bg-secondary border-double border-2 border-purple-800">
              A little bit of both.
            </button>
            <button className="default-button bg-secondary border-double border-2">
              Suprise me!
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Analysis;
