import Head from 'next/head';
import React from 'react';
import Header from '../../components/ui/Header';

const GuestDashboard: React.FC = (): JSX.Element => {
  return (
    <div>
      <Head>
        <title>Hilofy</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <Header pageType="guest" />

      {/* <h1 className="text-2xl m-5 mb-0 text-center">Your Top Tracks</h1>
      <Main /> */}
    </div>
  );
};

export default GuestDashboard;
