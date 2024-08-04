import { Metadata } from 'next';
import ConnectError from '../components/connectComponent';
import ThemeProvider from '../components/ThemeContext';
import Layout from '../components/Layout';
import store from '../store';
import { Provider } from 'react-redux';
import Main from './main';

export const metadata: Metadata = {
  title: 'Star Wars API',
  description: 'Star Wars API',
};

export default function Page({ children }) {
  return (
    // {/* <ConnectError msg="Something went wrong..."> */}
    <ThemeProvider>
      <Layout>
        {/* <ConnectError msg="Failed to fetch data..."> */}
        {/* <Head>
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
          </Head> */}
        {/* <Component {...pageProps} /> */}
        <Main />
        {/* </ConnectError> */}
      </Layout>
    </ThemeProvider>
    // {/* </ConnectError> */}
    // {/*</Provider>*/}
  );
}
