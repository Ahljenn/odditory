import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { genres } from '../../lib/genres';
import SubpageHeader from '../../components/ui/SubpageHeader';

//Note - add API to fetch random image from genre
//Dynamic routing to genre page

const colors: string[] = [
  'bg-slate-500',
  'bg-blue-500',
  'bg-green-500',
  'bg-orange-500',
  'bg-red-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-teal-500',
  'bg-indigo-500',
];

/**
 * This component renders all the genres with a search bar functionality.
 * Colors are generated randomly upon each render.
 */
const Genre: React.FC = (): JSX.Element => {
  /**
   * @returns JSX.Element - renders the genre component.
   */

  const router = useRouter();
  const [searchGenre, setSearchGenre] = useState<String>('');

  return (
    <>
      <SubpageHeader pageName="Genre" />
      <div className="flex justify-center gap-5 mb-5">
        <input
          className="bg-gray-200 border-2 text-2xl border-gray-200 rounded w-[20rem] sm:w-[35rem] py-2 px-4 text-gray-700 focus:outline-none focus:bg-white focus:border-pink-500"
          placeholder="Search By Genre"
        />
      </div>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:gap-5 mx-5 gap-3">
        {genres.map((genre: string) => (
          <div
            onClick={() => {
              router.push({
                pathname: '/genre/[genreResult]',
                query: { genreId: genre, genreTitle: genre[0].toUpperCase() + genre.slice(1) },
              });
            }}
            className={`cursor-pointer hover:bg-slate-300 hover:text-slate-600 rounded-xl align-start gap-1 h-60 ${
              colors[Math.floor(Math.random() * colors.length)]
            }`}
            key={genre}
          >
            <p className="sm:text-2xl m-5">{genre[0].toUpperCase() + genre.slice(1)}</p>
          </div>
        ))}
      </section>
    </>
  );
};

export default Genre;
