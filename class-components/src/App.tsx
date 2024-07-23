import { ReactNode, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import ConnectError from './components/connectComponent';
import Layout from './components/Layout';
import NotFound from './components/NotFound';
import SingleCard from './components/SingleCard';
import { ThemeContext } from './components/ThemeContext';

function App(): ReactNode {
  const theme = useContext(ThemeContext);

  return (
    <div className="app" data-theme={theme?.theme} data-testid="app">
      <Routes>
        <Route path="/RSS_REACT2024Q3" element={<Layout />}>
          <Route
            path="/RSS_REACT2024Q3/:resourceType"
            element={
              <ConnectError msg={"Couldn't fetch the data..."}>
                <Main />
              </ConnectError>
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
