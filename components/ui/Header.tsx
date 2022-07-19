import React from 'react';
import Image from 'next/image';
import Badge from './Badge';
import {
  HomeIcon,
  CollectionIcon,
  SearchIcon,
  LibraryIcon,
  UserIcon,
  LogoutIcon,
  LoginIcon,
} from '@heroicons/react/outline';
import { signOut } from 'next-auth/react';
import Router from 'next/router';

/**
 * This component is the main header component seen on the dashboard.
 * Render's the main header containing site logo.
 * Defines the routes for each button.
 */
interface HeaderData {
  pageType?: string;
}

const Header: React.FC<HeaderData> = ({ pageType }: HeaderData): JSX.Element => {
  /**
   * @returns JSX.Element - renders the header component.
   */
  const handleSignOut = (): void => {
    console.log('Logged out of Odditory');
    signOut();
  };

  const handleAccount = (): void => {
    Router.push('/dashboard/account');
  };

  const handlePlaylists = (): void => {
    Router.push('/playlist');
  };

  const handleGenre = (): void => {
    Router.push('/genre');
  };

  const handleSignIn = (): void => {
    Router.push('/login');
  };

  return (
    <header className="flex flex-col sm:flex-row m-5 justify-between items-center ">
      <div className="flex items-center flex-grow justify-evenly max-w-2xl">
        {pageType === 'guest' ? (
          <>
            <Badge Icon={HomeIcon} title="Home" />
            <Badge Icon={CollectionIcon} title="Genre" pointerType={'cursor-not-allowed'} />
            <Badge Icon={LibraryIcon} title="Playlists" pointerType={'cursor-not-allowed'} />
            <Badge Icon={SearchIcon} title="Search" pointerType={'cursor-not-allowed'} />
            <Badge Icon={UserIcon} title="Account" pointerType={'cursor-not-allowed'} />
            <Badge Icon={LoginIcon} title="Log In" update={handleSignIn} />
          </>
        ) : (
          <>
            <Badge Icon={HomeIcon} title="Home" />
            <Badge Icon={CollectionIcon} title="Genre" update={handleGenre} />
            <Badge Icon={LibraryIcon} title="Playlists" update={handlePlaylists} />
            <Badge Icon={SearchIcon} title="Search" />
            <Badge Icon={UserIcon} title="Account" update={handleAccount} />
            <Badge Icon={LogoutIcon} title="Log Out" update={handleSignOut} />
          </>
        )}
      </div>

      <Image
        className="object-contain hover:animate-pulse"
        src="/logo.png"
        width={100}
        height={100}
        alt="Odditory"
      />
    </header>
  );
};

export default Header;
