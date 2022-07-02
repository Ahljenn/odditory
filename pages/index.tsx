import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Hilofy</title>
        <link rel="icon" href="/logo.png" />
      </Head>

      <Image
        className="object-contain"
        src="/logo.png"
        width={200}
        height={100}
      />
    </div>
  );
};

export default Home;
