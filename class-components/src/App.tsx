import { ReactNode, useEffect, useState } from 'react';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import Main from './components/Main';
import getAPIData from './api';
import { APIResponse } from './types';
import ErrorBoundary from './components/Error';
import { FIELDS_TO_SHOW } from './constants';
import Layout from './components/Layout';
import NotFound from './components/NotFound';

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
      const result: APIResponse | void = await getAPIData(
        resType,
        text.trim(),
        linkStr
      );
      if (result) {
        setSearchResults(result);
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
  }, [type, searchText, fetchError, link]);

  useEffect(() => {
    if (!fetchError && searchText && link) {
      getData(type, searchText, link);
    }
  }, [fetchError, page]);

  return (
    // <>
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
        />
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
    // </>
  );
}
// class App extends Component<object, AppState> {
//   constructor(props: object) {
//     super(props);
//     this.state = {
//       searchText: '',
//       type: '',
//       searchResults: null,
//       fetchError: false,
//       wholeAppError: false,
//     };
//     this.getData = this.getData.bind(this);
//     this.throwFetchError = this.throwFetchError.bind(this);
//     this.throwWholeAppError = this.throwWholeAppError.bind(this);
//     this.removeFetchError = this.removeFetchError.bind(this);
//     this.updateText = this.updateText.bind(this);
//     this.updateType = this.updateType.bind(this);
//   }

//   async getData(type: string, text: string): Promise<void> {
//     this.setState({ searchResults: null });
//     try {
//       const result: APIResponse | void = await getAPIData(type, text.trim());
//       if (result) {
//         this.setState({ searchResults: result });
//       }
//     } catch (err) {
//       this.setState({ fetchError: true });
//     }
//   }

//   updateText(text: string) {
//     this.setState({ searchText: text });
//   }

//   updateType(type: string) {
//     this.setState({ type });
//   }

//   removeFetchError() {
//     const { type, searchText } = this.state;
//     this.setState({ fetchError: false });
//     this.getData(type, searchText);
//   }

//   throwFetchError() {
//     this.setState({ fetchError: true });
//   }

//   throwWholeAppError() {
//     this.setState({ wholeAppError: true });
//   }

//   render(): ReactNode {
//     const { searchResults, wholeAppError, fetchError } = this.state;
//     if (wholeAppError) {
//       throw new Error('Whole app error');
//     }

//     return (
//       <>
//         <Header
//           wholeAppError={this.throwWholeAppError}
//           throwFetchError={this.throwFetchError}
//           updateText={this.updateText}
//           updateType={this.updateType}
//           getData={this.getData}
//         />
//         <ErrorBoundary
//           tryAgain={this.removeFetchError}
//           msg={"Couldn't fetch the data..."}
//         >
//           <Main fetchError={fetchError} dataToPaint={searchResults} />
//         </ErrorBoundary>
//       </>
//     );
//   }
// }

export default App;
