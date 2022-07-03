import React from 'react';
import Badge from './Badge';
import Image from 'next/image';
import Router from 'next/router';
import { HomeIcon } from '@heroicons/react/outline';

interface PageData {
  pagename: string;
}

const SubpageHeader = ({ pagename }: PageData) => {
  const handleHome = (): void => {
    Router.push('/dashboard');
  };

  return (
    <header className="flex flex-col items-center sm:justify-around sm:flex-row">
      <Badge Icon={HomeIcon} title="HOME" update={handleHome} />
      <div className="flex flex-col items-center">
        <Image
          className="object-contain hover:animate-pulse"
          src="/logo.png"
          width={150}
          height={150}
          alt="Hilofy"
        />
        <h1 className="">{pagename}</h1>
      </div>
    </header>
  );
};

export default SubpageHeader;
