import type { NextPage } from 'next';
import Head from 'next/head';
import Header from '../../components/ui/Header';
import Main from '../../components/ui/Main';

const Dashboard: NextPage = (): JSX.Element => {
  return (
    <div>
      <Head>
        <title>Hilofy</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <Header pageType="user" />
      <h1 className="text-2xl m-5 mb-0 text-center">Your Top Tracks</h1>
      <Main />
    </div>
  );
};

export default Dashboard;
