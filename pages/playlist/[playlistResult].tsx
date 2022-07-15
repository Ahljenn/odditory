import React, { useState, useEffect } from 'react';
import SubpageHeader from '../../components/ui/SubpageHeader';
import useSpotify from '../../components/hooks/useSpotify';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

/**
 * This component renders the dynamic page depending on the user's playlist selection.
 */
const playlistResult: React.FC = (): JSX.Element => {
  /**
   * @returns JSX.Element - renders the playlist result component.
   */
  const router = useRouter();
  const { playlistImg, playlistId, playlistTitle } = router.query;

  console.log('1', playlistImg, playlistId);

  return (
    <>
      <SubpageHeader pageName="Playlist" />
    </>
  );
};

export default playlistResult;
