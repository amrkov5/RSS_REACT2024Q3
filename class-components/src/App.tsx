import { ReactNode, useEffect, useState } from 'react';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import Main from './components/Main';
import getAPIData from './api';
import { APIResponse } from './types';
import ErrorBoundary from './components/Error';
import { FIELDS_TO_SHOW } from './constants';
import Layout from './components/Layout';
import NotFound from './components/NotFound';
import SingleCard from './components/SingleCard';

function App(): ReactNode {
  const [searchText, setSearchText] = useState('');
  const [type, setType] = useState('');
  const [searchResults, setSearchResults] = useState<APIResponse | null>(null);
  const [fetchError, setFetchError] = useState(false);
  const [wholeAppError, setWholeAppError] = useState(false);
  const [link, setLink] = useState('');
  const [page, setPage] = useState(1);
  const { resourceType } = useParams();
  const navigate = useNavigate();

  const getData = async (
    resType: string,
    text: string,
    linkStr?: string
  ): Promise<void> => {
    setSearchResults(null);
    try {
      const result = await getAPIData({
        type: resType,
        text: text.trim(),
        link: linkStr,
      });
      if (result) {
        setSearchResults(result as APIResponse);
      }
    } catch (err) {
      setFetchError(true);
    }
  };

  if (wholeAppError) {
    throw new Error('Whole app error');
  }

  useEffect(() => {
    if (
      resourceType &&
      !Object.keys(FIELDS_TO_SHOW).find((el) => el === resourceType)
    ) {
      navigate('/RSS_REACT2024Q3/not-found', { replace: true });
    }
  }, [resourceType]);

  useEffect(() => {
    if (type && !fetchError) {
      getData(type, searchText, link);
    }
  }, [type, searchText, fetchError]);

  useEffect(() => {
    if (!fetchError && searchText && link) {
      getData(type, searchText, link);
    }
  }, [fetchError, page]);

  return (
    <Routes>
      <Route
        path="/RSS_REACT2024Q3"
        element={
          <Layout
            wholeAppError={setWholeAppError}
            throwFetchError={setFetchError}
            updateText={setSearchText}
            updateType={setType}
            setLink={setLink}
            setPage={setPage}
          />
        }
      >
        <Route
          path=":resourceType"
          element={
            <ErrorBoundary
              tryAgain={setFetchError}
              msg={"Couldn't fetch the data..."}
            >
              <Main
                fetchError={fetchError}
                dataToPaint={searchResults}
                setLink={setLink}
                setPage={setPage}
                page={page}
              />
            </ErrorBoundary>
          }
        >
          <Route path="card/:cardName" element={<SingleCard />} />
        </Route>
        <Route
          path=":resourceType/:pageId"
          element={
            <ErrorBoundary
              tryAgain={setFetchError}
              msg={"Couldn't fetch the data..."}
            >
              <Main
                fetchError={fetchError}
                dataToPaint={searchResults}
                setLink={setLink}
                setPage={setPage}
                page={page}
              />
            </ErrorBoundary>
          }
        />
      </Route>
      <Route path="/RSS_REACT2024Q3/not-found" element={<NotFound />} />
    </Routes>
  );
}

export default App;
