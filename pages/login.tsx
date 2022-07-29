import React from 'react';
import Image from 'next/image';
import { getProviders, signIn } from 'next-auth/react';
import { UserIcon } from '@heroicons/react/outline';
import Router from 'next/router';
import Head from 'next/head';

/**
 * This component renders the login page.
 * Contains a Spotify Provider login as well as a guest option
 */
const Login = ({ providers }: any) => {
  /**
   * @returns JSX.Element - returns the login page
   */
  return (
    <>
      <Head>
        <title>Odditory | Welcome</title>
        <link rel="icon" href="/logofav.png" />
      </Head>
      <section className="flex flex-col items-center">
        <div className="visible: sm:invisible">
          <div className="flex flex-row items-center">
            <div className="relative w-[5rem] h-[5rem]">
              <Image src="/logo.png" alt="logo" layout="fill" objectFit="fill" quality={100} />
            </div>
            <h1 className="font-semibold">Odditory</h1>
          </div>
        </div>

        <div className="bg-secondary p-10 sm:rounded-xl">
          <h1 className="font-bold">Welcome!</h1>
          <div className="w-full sm:w-[22rem]">
            <p className="w-full text-sm">
              <b className="text-odd">Odditory</b> is a simple music web app integrating Spotify
              data to help you discover new music and analyze your listening patterns.
            </p>
            <p className="w-full text-sm mt-5">
              By logging in with Spotify you agree to allow <b className="text-odd">Odditory</b> to
              view your music activity to help provide you with the best experience.
            </p>
          </div>

          <div
            className="bg-primary py-2 justify-center rounded flex flex-row items-center gap-2 cursor-pointer mt-2 sm:px-[4rem] hover:bg-[#1DB954] transition duration-100 ease-in-out"
            onClick={() => {
              signIn(providers.spotify.id, { callbackUrl: '/dashboard' }); //Take user to dashboard
            }}
          >
            <img className="w-[1rem] h-[1rem]" src="/white-spotify.png" alt="Spotify" />
            <div>Login with Spotify</div>
          </div>

          <div
            className="bg-primary py-2 justify-center rounded flex flex-row items-center gap-2 cursor-pointer mt-2 sm:px-[4rem] hover:bg-slate-600 transition duration-100 ease-in-out"
            onClick={() => {
              Router.push('/guest');
            }}
          >
            <UserIcon className="w-[1rem] h-[1rem]" />
            <div>Continue as Guest</div>
          </div>
        </div>
      </section>

      <div className="visible sm:invisible">
        <div className="flex flex-row justify-center items-center gap-5 mt-5 ">
          <a
            href="https://github.com/Ahljenn/Odditory/labels/enhancement"
            rel="noopener noreferrer"
            target="_blank"
            className="text-sm cursor-pointer opacity-[0.3] hover:opacity-[1]"
          >
            Suggest a feature
          </a>
          <a
            href="https://github.com/Ahljenn/Odditory/issues"
            rel="noopener noreferrer"
            target="_blank"
            className="text-sm cursor-pointer opacity-[0.3] hover:opacity-[1]"
          >
            Report a bug
          </a>
          <a href="https://github.com/Ahljenn/Odditory" rel="noopener noreferrer" target="_blank">
            <img
              className="w-[2rem] cursor-pointer opacity-[0.3] hover:opacity-[1]"
              src="/github.png"
              alt="Github"
            />
          </a>
        </div>
      </div>

      <footer className="invisible sm:visible">
        <div className="flex flex-row absolute bottom-0 w-full z-[-90] justify-around items-center">
          <div className="flex flex-row items-center">
            <div className="relative w-[5rem] h-[5rem]">
              <Image src="/logo.png" alt="logo" layout="fill" objectFit="fill" quality={100} />
            </div>
            <h1 className="font-semibold">Odditory</h1>
          </div>

          <div className="flex flex-row justify-center items-center gap-5">
            <a
              href="https://github.com/Ahljenn/Odditory/labels/enhancement"
              rel="noopener noreferrer"
              target="_blank"
              className="text-sm cursor-pointer opacity-[0.3] hover:opacity-[1]"
            >
              Suggest a feature
            </a>
            <a
              href="https://github.com/Ahljenn/Odditory/issues"
              rel="noopener noreferrer"
              target="_blank"
              className="text-sm cursor-pointer opacity-[0.3] hover:opacity-[1]"
            >
              Report a bug
            </a>
            <a href="https://github.com/Ahljenn/Odditory" rel="noopener noreferrer" target="_blank">
              <img
                className="w-[2rem] cursor-pointer opacity-[0.3] hover:opacity-[1]"
                src="/github.png"
                alt="Github"
              />
            </a>
          </div>
        </div>
      </footer>

      <div className="absolute bottom-0 z-[-100] bg-gradient-to-b to-slate-700 from-primary padding-8 h-[20rem] w-full" />
    </>
  );
};

export default Login;

export const getServerSideProps = async () => {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
};
