import React from 'react';
import Image from 'next/image';
import { getProviders, signIn } from 'next-auth/react';

const Login = ({ providers }: any) => {
  return (
    <div>
      <div className="text-center mt-[15rem]">
        <Image
          className="object-contain"
          src="/white-spotify.png"
          alt="Spotify"
          height={300}
          width={300}
        />
      </div>

      {providers &&
        Object.values(providers).map((provider: any) => (
          <div className="flex flex-col gap-[15rem] items-center mt-10" key={provider.name}>
            <div>
              <button
                className="bg-white p-4 rounded-xl hover:scale-[0.9] transition-transform duration-200"
                onClick={() => {
                  signIn(provider.id, { callbackUrl: '/dashboard' }); //Take user to dashboard
                }}
              >
                <p className="text-black">Login with {provider.name}</p>
              </button>
            </div>
            <div>
              <button className="bg-slate-600 p-4 mb-10 rounded-xl hover:scale-[0.9] transition-transform duration-20 cursor-not-allowed">
                <p className="text-white">Enter as Guest</p>
              </button>
            </div>
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
