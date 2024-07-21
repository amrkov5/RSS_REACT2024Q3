import { ReactNode, useContext, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import ErrorBoundary from './components/Error';
import Layout from './components/Layout';
import NotFound from './components/NotFound';
import SingleCard from './components/SingleCard';
import { ThemeContext } from './components/ThemeContext';

function App(): ReactNode {
  const [fetchError, setFetchError] = useState(false);
  const [wholeAppError, setWholeAppError] = useState(false);
  const theme = useContext(ThemeContext);

  if (wholeAppError) {
    throw new Error('Whole app error');
  }

  return (
    <div className="app" data-theme={theme?.theme} data-testid="app">
      <Routes>
        <Route
          path="/RSS_REACT2024Q3"
          element={
            <Layout
              wholeAppError={setWholeAppError}
              throwFetchError={setFetchError}
            />
          }
        >
          <Route
            path="/RSS_REACT2024Q3/:resourceType"
            element={
              <ErrorBoundary
                tryAgain={setFetchError}
                msg={"Couldn't fetch the data..."}
              >
                <Main fetchError={fetchError} />
              </ErrorBoundary>
            }
          >
            <Route path="card/:id" element={<SingleCard />} />
          </Route>
        </Route>
        <Route path="/RSS_REACT2024Q3/not-found" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
