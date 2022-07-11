import React from 'react';
import { genres } from '../../lib/genres';
import SubpageHeader from '../../components/ui/SubpageHeader';

interface Props {}

// const parse: string = (arg: string): string => {
//   return arg[0].toUpperCase() + arg.slice(1);
// };

//Note - add API to fetch random image from genre

//Add random colors for bg

const genre: React.FC = (props: Props): JSX.Element => {
  return (
    <>
      <SubpageHeader pageName="Genre" />
      <div className="flex justify-center mb-5">
        <input placeholder="Search"></input>
      </div>
      <section className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 mx-5">
        {genres.map((genre: string) => (
          <div
            className="cursor-pointer hover:bg-slate-300 hover:text-slate-600 rounded-xl align-start bg-slate-600 gap-1 h-60"
            key={genre}
          >
            <p className="text-2xl m-5">{genre[0].toUpperCase() + genre.slice(1)}</p>
          </div>
        ))}
      </section>
    </>
  );
};

export default genre;
