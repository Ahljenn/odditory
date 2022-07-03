import React from 'react';
import SubpageHeader from '../../components/ui/SubpageHeader';

const Favorites: React.FC = (): JSX.Element => {
  return (
    <>
      <SubpageHeader pageName="FAVORITES" />
      <section className="flex bg-gradient-to-b to-secondary from-primary h-80 padding-8 w-full"></section>
    </>
  );
};

export default Favorites;
