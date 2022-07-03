import React from 'react';
import SubpageHeader from '../../components/ui/SubpageHeader';

const Trending: React.FC = (): JSX.Element => {
  return (
    <>
      <SubpageHeader pageName="TRENDING" />
      <section className="flex bg-gradient-to-b to-secondary from-primary h-80 padding-8 w-full"></section>
    </>
  );
};

export default Trending;
