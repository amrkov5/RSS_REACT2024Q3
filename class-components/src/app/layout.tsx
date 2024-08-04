import { ReactNode } from 'react';

import withRedux from '../redux';
import '../index.css';
import '../App.css';
import { Metadata } from 'next';

export function App({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

export default App;
