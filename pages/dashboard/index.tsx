import type { NextPage } from 'next';
import Head from 'next/head';
import Header from '../../components/ui/Header';
import Main from '../../components/ui/Main';

const Dashboard: NextPage = (): JSX.Element => {
  return (
    <div>
      <Head>
        <title>Odditory | Dashboard</title>
        <link rel="icon" href="/logofav.png" />
      </Head>
      <Header pageType="user" />
      <Main />
    </div>
  );
};

export default Dashboard;
