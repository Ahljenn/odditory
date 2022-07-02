import React from 'react';
import Image from 'next/image';
import { getProviders, signIn } from 'next-auth/react';

interface Props {}

const Login = ({ providers }: any) => {
  return (
    <div>
      <h1 className="text-center mt-10 sm:text-3xl">Login</h1>
      <div className="text-center mt-10 animate-pulse">
        <Image
          src="/white-spotify.png"
          alt="Spotify"
          className="object-contain"
          height={300}
          width={300}
        />
      </div>

      {providers &&
        Object.values(providers).map((provider) => (
          <div className="flex justify-center mt-10" key={provider.name}>
            <button className="sm:text-3xl">Login with {provider.name}</button>
          </div>
        ))}
    </div>
  );
};

export default Login;

export const getServerSideProps = async () => {
  const providers = await getProviders();
  console.log('Providers list:', providers);
  return {
    props: {
      providers,
    },
  };
};
