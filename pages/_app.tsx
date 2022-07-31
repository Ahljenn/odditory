import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { motion } from 'framer-motion';

const variants = {
  pageInitial: { opacity: 0 },
  pageAnimate: { opacity: 1 },
};

/**
 * This component renders the entire app and provides the session to all components.
 * Provides the motion animations for the page.
 */
const MyApp = ({
  Component,
  router,
  pageProps: { session, ...pageProps },
}: AppProps): JSX.Element => {
  return (
    <motion.div
      key={router.route}
      initial="pageInitial"
      transition={{ duration: 1 }}
      animate="pageAnimate"
      variants={variants}
    >
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </motion.div>
  );
};

export default MyApp;
