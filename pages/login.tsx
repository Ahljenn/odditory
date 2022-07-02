import React from 'react';
import { getProviders, signIn } from 'next-auth/react';

interface Props {}

const Login = ({ providers }: any) => {
  return (
    <div>
      Login Page
      {providers &&
        Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button>Login with {provider.name}</button>
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
