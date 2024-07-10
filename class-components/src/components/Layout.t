import { Outlet } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import ErrorBoundary from './Error';

const Layout = ({
  wholeAppError,
  throwFetchError,
  updateText,
  updateType,
  tryAgain,
  msg,
  dataToPaint,
  fetchError,
}) => {
  return (
    <>
      <Header
        wholeAppError={wholeAppError}
        throwFetchError={throwFetchError}
        updateText={updateText}
        updateType={updateType}
      />
      <ErrorBoundary tryAgain={tryAgain} msg={msg}>
        <Main dataToPaint={dataToPaint} fetchError={fetchError} />
      </ErrorBoundary>
    </>
  );
};

export default Layout;
