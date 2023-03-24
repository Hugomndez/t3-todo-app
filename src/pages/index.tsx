import { AddInput, BackgroundImage, Header, Todos } from 'components';
import { type NextPage } from 'next';
import Head from 'next/head';

const index: NextPage = () => {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Todo app</title>
        <meta name="description" content="Generated by create-t3-app" />
      </Head>
      <BackgroundImage />
      <Header />
      <main>
        <AddInput />
        <Todos />
      </main>
    </>
  );
};

export default index;
