import Head from 'next/head';
import React from 'react';
import GuestMain from '../../components/ui/GuestMain';
import Header from '../../components/ui/Header';

const GuestDashboard: React.FC = (): JSX.Element => {
  return (
    <div>
      <Head>
        <title>Odditory | Guest</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <Header pageType="guest" />
      <h1 className="text-2xl m-5 mb-0 text-center">New Releases</h1>
      <GuestMain />
    </div>
  );
};

export default GuestDashboard;
