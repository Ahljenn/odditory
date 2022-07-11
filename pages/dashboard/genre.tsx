import React from 'react';
import { genres } from '../../lib/genres';
import SubpageHeader from '../../components/ui/SubpageHeader';

interface Props {}

// const parse: string = (arg: string): string => {
//   return arg[0].toUpperCase() + arg.slice(1);
// };

const genre: React.FC = (props: Props): JSX.Element => {
  return (
    <>
      <SubpageHeader pageName="Genre" />
      <section>
        {genres.map((genre: string) => (
          <p key={genre}>{genre}</p>
        ))}
      </section>
    </>
  );
};

export default genre;
