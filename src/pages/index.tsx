import { type NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';

const Component = dynamic(() => import('../components/Component'), {
  ssr: false,
});

const index: NextPage = () => {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Todo app</title>
        <meta name="description" content="Generated by create-t3-app" />
      </Head>
      <main>
        <Component />
      </main>
    </>
  );
};

export default index;
