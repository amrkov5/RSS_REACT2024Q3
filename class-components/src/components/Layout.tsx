'use client';

import { ReactNode, useContext, useEffect } from 'react';
import { Provider } from 'react-redux';
import { useRouter } from 'next/navigation';
import Header from './Header';
import store from '../store';
import useDataFromLS from '../hooks/useDataFromLS';
import ErrorBoundary from './Error';
import { ThemeContext } from './ThemeContext';

function Layout({ children }: { children: ReactNode }): ReactNode {
  const router = useRouter();
  const [type] = useDataFromLS('type');
  const [search] = useDataFromLS('search');
  const theme = useContext(ThemeContext);

  useEffect(() => {
    router.replace(`/${type}${search ? `?search=${search}` : ''}`);
  }, []);

  return (
    <Provider store={store}>
      <ErrorBoundary
        appError
        msg="Oops... Something went wrong"
        theme={theme?.theme}
      >
        <Header />
        {children}
      </ErrorBoundary>
    </Provider>
  );
}

export default Layout;
