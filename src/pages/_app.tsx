import { Josefin_Sans } from '@next/font/google';
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { type AppType } from 'next/app';

import { api } from '../utils/api';

import '../styles/globals.css';

const josefinSans = Josefin_Sans({
  weight: ['400', '700'],
  style: ['normal'],
  subsets: ['latin'],
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${josefinSans.style.fontFamily};
        }
      `}</style>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
