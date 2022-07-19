import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { genres } from '../../lib/genres';
import SubpageHeader from '../../components/ui/SubpageHeader';
import Head from 'next/head';

//Note - add API to fetch random image from genre
//Dynamic routing to genre page

/**
 * This component renders all the genres with a search bar functionality.
 * Colors are generated randomly upon each render.
 */

const colors: string[] = [
  'bg-rose-500',
  'bg-blue-500',
  'bg-green-500',
  'bg-orange-500',
  'bg-red-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-teal-500',
  'bg-indigo-500',
];

const Genre: React.FC = (): JSX.Element => {
  /**
   * @returns JSX.Element - renders the genre component.
   */

  const router = useRouter();
  const [searchGenre, setSearchGenre] = useState<string>('');

  return (
    <>
      <Head>
        <title>Odditory | Genre</title>
        <link rel="icon" href="/logofav.png" />
      </Head>
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
            let genreName = genre.split('~')[0];
            // let genreColor = genre.split('~')[1];

            return (
              <div
                className={`cursor-pointer rounded-xl align-start gap-1 h-[12rem] font-bold hover:bg-slate-600
                ${colors[Math.floor(Math.random() * colors.length)]}`}
                key={key}
                onClick={() => {
                  router.push({
                    pathname: '/genre/[genreResult]',
                    query: {
                      genreId: genreName,
                      genreTitle: genreName[0].toUpperCase() + genreName.slice(1),
                    },
                  });
                }}
              >
                <p className="sm:text-2xl m-5">{genreName[0].toUpperCase() + genreName.slice(1)}</p>
              </div>
            );
          })}
      </section>
    </>
  );
};

export default Genre;
