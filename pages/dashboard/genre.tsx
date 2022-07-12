import React, { useState, useEffect } from 'react';
import { genres } from '../../lib/genres';
import SubpageHeader from '../../components/ui/SubpageHeader';

interface Props {}

//Note - add API to fetch random image from genre

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

const genre: React.FC = (props: Props): JSX.Element => {
  return (
    <>
      <SubpageHeader pageName="Genre" />
      <div className="flex justify-center mb-5">
        <input placeholder="Search"></input>
      </div>
      <section className="grid grid-cols-2 sm:grid-cols-3 gap-3 2xl:gap-5 mx-5">
        {genres.map((genre: string) => (
          <div
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

export default genre;
