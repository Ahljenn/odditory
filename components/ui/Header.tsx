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

/**
 * This component is the main header component seen on the dashboard.
 * Render's the main header containing site logo.
 * Defines the routes for each button.
 */
const Header: React.FC = (): JSX.Element => {
  /**
   * @returns JSX.Element - renders the header component.
   */
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
        <Badge Icon={HomeIcon} title="Home" />
        <Badge Icon={FireIcon} title="Trending" update={handleTrending} />
        <Badge Icon={StarIcon} title="Favorites" update={handleFavorites} />
        <Badge Icon={CollectionIcon} title="Collections" update={handleCollection} />
        <Badge Icon={SearchIcon} title="Search" />
        <Badge Icon={UserIcon} title="Account" update={handleAccount} />
        <Badge Icon={LogoutIcon} title="Log Out" update={handleSignOut} />
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
