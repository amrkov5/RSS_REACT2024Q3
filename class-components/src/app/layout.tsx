import { ReactNode } from 'react';
import { Metadata } from 'next';

import '../index.css';
import '../App.css';
import Layout from '../components/Layout';
import ThemeProvider from '../components/ThemeContext';

export const metadata: Metadata = {
  title: 'Star Wars API',
  description: 'Star Wars API',
  icons: {
    apple: '/apple-touch-icon.png',
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
  },
};

function App({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <ThemeProvider>
        <body>
          <Layout>{children}</Layout>
        </body>
      </ThemeProvider>
    </html>
  );
}

export default App;
