'use client';

import { ReactNode } from 'react';
import Header from './Header';
import { Provider } from 'react-redux';
import store from '../store';
import Main from '../app/main';
import { useSearchParams } from 'next/navigation';
import { Data } from '../types';

function Layout({ children }: { children: ReactNode }): ReactNode {
  return (
    <Provider store={store}>
      <Header />
      {children}
    </Provider>
  );
}

export default Layout;
