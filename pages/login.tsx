import React from 'react';
import Image from 'next/image';
import { getProviders, signIn } from 'next-auth/react';

const Login = ({ providers }: any) => {
  return (
    <div>
      <div className="text-center mt-20">
        <Image
          className="object-contain"
          src="/white-spotify.png"
          alt="Spotify"
          height={200}
          width={200}
        />
      </div>

      {providers &&
        Object.values(providers).map((provider: any) => (
          <div className="flex justify-center mt-10" key={provider.name}>
            <button
              className="bg-white p-4 rounded-full hover:scale-110 transition-transform duration-200 hover:animate-pulse"
              onClick={() => {
                signIn(provider.id, { callbackUrl: '/dashboard' }); //Take user to dashboard
              }}
            >
              <p className="text-black">Login with {provider.name}</p>
            </button>
          </div>
        ))}
    </div>
  );
};

export default Login;

export const getServerSideProps = async () => {
  const providers = await getProviders();
  // console.log('Providers list:', providers);
  return {
    props: {
      providers,
    },
  };
};
