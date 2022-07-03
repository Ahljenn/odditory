import type { NextPage } from 'next';
import Head from 'next/head';
import Header from '../../components/Header';

const Dashboard: NextPage = (): JSX.Element => {
  return (
    <div>
      <Head>
        <title>Hilofy</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <Header />
    </div>
  );
};

export default Dashboard;
