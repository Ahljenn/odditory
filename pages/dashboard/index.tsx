import type { NextPage } from 'next';
import Head from 'next/head';
import Header from '../../components/ui/Header';
import Main from '../../components/ui/Main';

/**
 * This component renders the account page
 * Provides information for info and account type
 **/
const Dashboard: NextPage = (): JSX.Element => {
  /**
   * @returns JSX.Element
   */
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
