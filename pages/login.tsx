import React from 'react';
import Image from 'next/image';
import { getProviders, signIn } from 'next-auth/react';
import { UserIcon } from '@heroicons/react/outline';
import Router from 'next/router';
import Head from 'next/head';

const Login = ({ providers }: any) => {
  return (
    <>
      <Head>
        <title>Odditory | Welcome</title>
        <link rel="icon" href="/logofav.png" />
      </Head>
      <section className="flex flex-col items-center">
        <div className="flex flex-row items-center">
          <div className="relative w-[5rem] h-[5rem]">
            <Image src="/logo.png" alt="logo" layout="fill" objectFit="fill" quality={100} />
          </div>
          <h1>Odditory</h1>
        </div>

        <div className="bg-secondary p-10 rounded-xl">
          <h1 className="font-bold">Welcome!</h1>
          <div className="w-[15rem] sm:w-[20rem]">
            <p className="w-full text-sm">
              Odditory is a simple music web app integrating Spotify data to help you discover new
              music and analyze your listening patterns.
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
            className="bg-primary py-2 justify-center rounded flex flex-row items-center gap-2 cursor-pointer mt-2 sm:px-[4rem] hover:bg-indigo-600 transition duration-100 ease-in-out"
            onClick={() => {
              Router.push('/guest');
            }}
          >
            <UserIcon className="w-[1rem] h-[1rem]" />
            <div>Continue as Guest</div>
          </div>
        </div>
      </section>

      <div className="flex flex-row justify-center items-center gap-5 mt-5 ">
        <a
          href="https://github.com/Ahljenn/Odditory/issues"
          rel="noopener noreferrer"
          target="_blank"
          className="text-sm cursor-pointer"
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
