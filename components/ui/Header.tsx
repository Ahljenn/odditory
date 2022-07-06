import React from 'react';
import Image from 'next/image';
import Badge from './Badge';
import {
  HomeIcon,
  FireIcon,
  StarIcon,
  CollectionIcon,
  SearchIcon,
  UserIcon,
  LogoutIcon,
} from '@heroicons/react/outline';
import { signOut } from 'next-auth/react';
import Router from 'next/router';

interface Props {}

const Header: React.FC<Props> = ({}: Props): JSX.Element => {
  const handleSignOut = (): void => {
    console.log('Logged out of Hilofy');
    signOut();
  };

  const handleAccount = (): void => {
    Router.push('/dashboard/account');
  };

  const handleCollection = (): void => {
    Router.push('/dashboard/collections');
  };

  const handleFavorites = (): void => {
    Router.push('/dashboard/favorites');
  };

  const handleTrending = (): void => {
    Router.push('/dashboard/trending');
  };

  return (
    <header className="flex flex-col sm:flex-row m-5 justify-between items-center">
      <div className="flex items-center flex-grow justify-evenly max-w-2xl">
        <Badge Icon={HomeIcon} title="HOME" />
        <Badge Icon={FireIcon} title="TRENDING" update={handleTrending} />
        <Badge Icon={StarIcon} title="FAVORITES" update={handleFavorites} />
        <Badge Icon={CollectionIcon} title="COLLECTIONS" update={handleCollection} />
        <Badge Icon={SearchIcon} title="SEARCH" />
        <Badge Icon={UserIcon} title="ACCOUNT" update={handleAccount} />
        <Badge Icon={LogoutIcon} title="LOG OUT" update={handleSignOut} />
      </div>

      <Image
        className="object-contain hover:animate-pulse"
        src="/logo.png"
        width={100}
        height={100}
        alt="Hilofy"
      />
    </header>
  );
};

export default Header;
