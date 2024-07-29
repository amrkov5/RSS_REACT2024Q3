import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import ThemeProvider from '../components/ThemeContext';
import ConnectError from '../components/connectComponent';
import withRedux from '../redux';
import '../index.css';
import '../App.css';

export function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isRedirectReady, setIsRedirectReady] = useState(false);

  function createRouterQuery() {
    if (pageProps.info) {
      const query: {
        type: string | string[];
        search?: string | string[];
        page?: string | string[];
      } = {
        type: router.query.type || 'people',
      };

      if (router.query.search) {
        query.search = router.query.search;
      }
      if (pageProps.info.next || pageProps.info.previous) {
        query.page = router.query.page || '1';
      }
      return query;
    }
    return null;
  }

  useEffect(() => {
    if (!isRedirectReady && pageProps) {
      router.push({ query: createRouterQuery() }, undefined, { shallow: true });
      setIsRedirectReady(true);
    }
  }, []);

  return (
    <ConnectError msg="Something went wrong...">
      <ThemeProvider>
        <Layout>
          <ConnectError msg="Failed to fetch data...">
            <Head>
              <meta charSet="UTF-8" />
              <link
                rel="apple-touch-icon"
                sizes="180x180"
                href="/apple-touch-icon.png"
              />
              <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href="/favicon-32x32.png"
              />
              <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href="/favicon-16x16.png"
              />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
              />
              <title>STAR WARS API</title>
            </Head>
            <Component {...pageProps} />
          </ConnectError>
        </Layout>
      </ThemeProvider>
    </ConnectError>
  );
}

export default withRedux(App);
