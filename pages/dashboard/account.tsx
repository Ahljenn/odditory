import React from 'react';
import { useSession } from 'next-auth/react';
import SubpageHeader from '../../components/ui/SubpageHeader';

const Account: React.FC = (): JSX.Element => {
  const { data: session } = useSession();

  return (
    <>
      <SubpageHeader pageName="ACCOUNT" />
      <section className="flex justify-center gap-5 flex-col items-center bg-gradient-to-b to-secondary from-primary h-80 padding-8 w-full">
        <img
          className="mt-[10rem] h-[15rem] w-[14rem] rounded-full sm:h-[25rem] sm:w-[24rem] sm:mt-[20rem]"
          src={session?.user?.image || '/public/white-spotify.png'}
          alt="User Image"
        />
        <div className="flex gap-5 bg-slate-600 p-8 rounded-xl flex-col items-center sm:flex-row">
          <img className="object-contain w-20 h-20" src={'/white-spotify.png'} />
          <div>
            <h1 className="inline font-bold">Account type: </h1>
            <h1 className="inline text-cyan-100 text-sm sm:text-lg">Spotify</h1>
            {session?.user &&
              Object.entries(session?.user).map((val: [string, string | null]) => {
                if (val[0] !== 'image' && val[0] !== 'accessToken' && val[0] !== 'refreshToken') {
                  return (
                    <div key={val[0]}>
                      <h1 className="inline font-bold">
                        {val[0][0].toLocaleUpperCase() + val[0].slice(1)}:{' '}
                      </h1>
                      <h1 className="inline text-cyan-100 text-sm sm:text-lg">{val[1]}</h1>
                    </div>
                  );
                }
              })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Account;
