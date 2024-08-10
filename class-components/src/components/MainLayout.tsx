'use client';

import { ReactNode, useContext } from 'react';
import { ThemeContext } from './ThemeContext';

export default function MainLayout({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  const theme = useContext(ThemeContext);
  return (
    <main className="main" data-testid="main" data-theme={theme?.theme}>
      {children}
    </main>
  );
}
