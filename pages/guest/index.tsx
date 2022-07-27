import Head from 'next/head';
import React from 'react';
import GuestMain from '../../components/ui/GuestMain';
import Header from '../../components/ui/Header';
import IntroContainer from '../../components/ui/IntroContainer';

/**
 * This component renders the guest page.
 * @returns JSX.Element - renders the guest page.
 **/
const GuestDashboard: React.FC = (): JSX.Element => {
  /*
   * @returns JSX.Element - renders the guest page.
   */
  return (
    <>
      <Head>
        <title>Odditory | Guest</title>
        <link rel="icon" href="/logofav.png" />
      </Head>
      <Header pageType="guest" />
      <IntroContainer type={'Guest'} />
      <GuestMain />
    </>
  );
};

export default GuestDashboard;
