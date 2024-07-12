import { Outlet } from 'react-router-dom';
import Header from './Header';
import { LayoutProps } from '../types';

function Layout(props: LayoutProps) {
  const {
    wholeAppError,
    throwFetchError,
    updateText,
    updateType,
    setLink,
    setPage,
  } = props;
  return (
    <>
      <Header
        wholeAppError={wholeAppError}
        throwFetchError={throwFetchError}
        updateText={updateText}
        updateType={updateType}
        setLink={setLink}
        setPage={setPage}
      />
      <Outlet />
    </>
  );
}

export default Layout;
