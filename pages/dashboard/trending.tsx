import React from 'react';
import SubpageHeader from '../../components/ui/SubpageHeader';

const Trending: React.FC = (): JSX.Element => {
  return (
    <>
      <SubpageHeader pagename="TRENDING" />
      <section className="flex space-x-7 bg-gradient-to-b to-secondary from-primary h-80 padding-8 w-full"></section>
    </>
  );
};

export default Trending;
