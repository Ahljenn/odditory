import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { genres } from '../../lib/genres';
import SubpageHeader from '../../components/ui/SubpageHeader';

//Note - add API to fetch random image from genre
//Dynamic routing to genre page

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
          type="text"
          className="bg-gray-200 border-2 text-2xl border-gray-200 rounded w-[20rem] sm:w-[35rem] py-2 px-4 text-gray-700 focus:outline-none focus:bg-white focus:border-pink-500"
          placeholder="Search By Genre"
          onChange={(e) => setSearchGenre(e.target.value)}
        />
      </div>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:gap-5 mx-5 gap-3">
        {genres
          .filter((genre: string) => {
            if (searchGenre === '') {
              return genre;
            } else {
              return genre.toLowerCase().includes(searchGenre.toLowerCase());
            }
          })
          .map((genre: string, key: number) => {
            return (
              <div
                className={`cursor-pointer hover:bg-slate-300 hover:text-slate-600 rounded-xl align-start gap-1 h-60 ${
                  genre.split('~')[1]
                }`}
                key={key}
                onClick={() => {
                  router.push({
                    pathname: '/genre/[genreResult]',
                    query: { genreId: genre, genreTitle: genre[0].toUpperCase() + genre.slice(1) },
                  });
                }}
              >
                <p className="sm:text-2xl m-5">
                  {genre.split('~')[0][0].toUpperCase() + genre.split('~')[0].slice(1)}
                </p>
              </div>
            );
          })}
      </section>
    </>
  );
};

export default Genre;
