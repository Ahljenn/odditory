import React from 'react';
import Image from 'next/image';
import { getProviders, signIn } from 'next-auth/react';
import { UserIcon } from '@heroicons/react/outline';
import Router from 'next/router';

const Login = ({ providers }: any) => {
  return (
    <>
      <section className="flex flex-col items-center">
        <div className="flex flex-row items-center">
          <div className="relative w-[5rem] h-[5rem]">
            <Image src="/logo.png" alt="logo" layout="fill" objectFit="fill" quality={100} />
          </div>
          <h1>Hilofy</h1>
        </div>

        <div className="bg-secondary p-10 rounded-xl">
          <h1 className="font-bold">Welcome!</h1>
          <div className="w-[12rem] sm:w-[20rem]">
            <p className="w-full text-sm">
              Hilofy is a simple music web app integrating Spotify data to help you discover new
              music and analyze your listening patterns.
            </p>
          </div>

          <div
            className="bg-primary py-2 justify-center rounded flex flex-row items-center gap-2 cursor-pointer mt-2 sm:px-[4rem] hover:bg-slate-600 transition duration-100 ease-in-out"
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

      <div className="flex flex-row justify-center items-center gap-5 mt-5">
        <a
          href="https://github.com/Ahljenn/Hilofy/issues"
          rel="noopener noreferrer"
          target="_blank"
          className="text-sm cursor-pointer"
        >
          Report a bug
        </a>
        <a href="https://github.com/Ahljenn/Hilofy" rel="noopener noreferrer" target="_blank">
          <img
            className="w-[2rem] cursor-pointer opacity-[0.3] hover:opacity-[1]"
            src="/github.png"
            alt="Github"
          />
        </a>
      </div>
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

// <div>
//   <div className="text-center mt-[15rem]">
//     <Image
//       className="object-contain"
//       src="/white-spotify.png"
//       alt="Spotify"
//       height={300}
//       width={300}
//     />
//   </div>

//   {providers &&
//     Object.values(providers).map((provider: any) => (
//       <div className="flex flex-col gap-[15rem] items-center mt-10" key={provider.name}>
//         <div>
//           <button
//             className="bg-white p-4 rounded-xl hover:scale-[0.9] transition-transform duration-200"
//             onClick={() => {
//               signIn(provider.id, { callbackUrl: '/dashboard' }); //Take user to dashboard
//             }}
//           >
//             <p className="text-black">Login with {provider.name}</p>
//           </button>
//         </div>
//         <div>
//           <button
//             className="bg-slate-600 p-4 mb-10 rounded-xl hover:scale-[0.9] transition-transform duration-20"
//             onClick={() => {
//               Router.push('/guest');
//             }}
//           >
//             <p className="text-white">Enter as Guest</p>
//           </button>
//         </div>
//       </div>
//     ))}
// </div>
