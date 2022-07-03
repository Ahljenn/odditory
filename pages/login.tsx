import React from 'react';
import Image from 'next/image';
import { getProviders, signIn } from 'next-auth/react';

interface Props {}

const Login = ({ providers }: any) => {
  return (
    <div>
      <div className="text-center mt-20">
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
            <button
              className="bg-white p-4 rounded-full"
              onClick={() => {
                signIn(provider.id, { callbackURL: '/' });
              }}
            >
              <p className="animate-pulse text-black">Login with {provider.name}</p>
            </button>
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
