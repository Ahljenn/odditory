import Head from 'next/head';
import React from 'react';
import GuestMain from '../../components/ui/GuestMain';
import Header from '../../components/ui/Header';
import IntroContainer from '../../components/ui/IntroContainer';

const GuestDashboard: React.FC = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Odditory | Guest</title>
        <link rel="icon" href="/logofav.png" />
      </Head>
      <Header pageType="guest" />
      <IntroContainer />
      <GuestMain />
    </>
  );
};

export default GuestDashboard;
