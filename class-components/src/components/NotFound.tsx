'use client';

import { ReactNode, useContext } from 'react';
import Link from 'next/link';
import { ThemeContext } from './ThemeContext';

function NotFound(): ReactNode {
  const theme = useContext(ThemeContext);
  return (
    <div className="not-found" data-theme={theme?.theme}>
      <h1>Oops. Not found...</h1>
      <Link href="/">Return to main</Link>
    </div>
  );
}

export default NotFound;
