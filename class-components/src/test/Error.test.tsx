import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { mockAPIResponse } from './mockdata';
import headerReducer from '../slices/headerSlice';
import selectedItemsReducer from '../slices/selectedItemsSlice';
import errorsReducer from '../slices/errorSlice';
import ErrorBoundary from '../components/Error';
import Main from '../components/Main';
import Header from '../components/Header';

const routerMock = vi.fn();

vi.mock('next/navigation', () => {
  return {
    __esModule: true,
    useRouter: () => ({
      back: vi.fn(),
      forward: vi.fn(),
      push: routerMock,
      replace: vi.fn(),
      refresh: vi.fn(),
      prefetch: vi.fn(),
    }),
    useSearchParams: () => ({
      get: vi.fn(),
    }),
    usePathname: () => '/species',
  };
});

describe('Error tests', () => {
  it('should display fetch Error', async () => {
    const store = configureStore({
      reducer: {
        header: headerReducer,
        selectedItems: selectedItemsReducer,
        errors: errorsReducer,
      },
      preloadedState: {
        header: {
          type: 'species',
          text: '',
          page: 1,
          singleId: null,
          shallShowLoader: true,
          isLoading: true,
        },
        selectedItems: { selectedArr: [] },
        errors: { fetchError: true, wholeAppError: false },
      },
    });
    const { getByTestId } = render(
      <Provider store={store}>
        <ErrorBoundary fetchError msg="Failed to fetch data...">
          <Main info={mockAPIResponse} />
        </ErrorBoundary>
      </Provider>
    );

    const fetchErrorBlock = getByTestId('fetch-error');
    expect(fetchErrorBlock).toBeInTheDocument();
  });

  it('should display app Error', async () => {
    const store = configureStore({
      reducer: {
        header: headerReducer,
        selectedItems: selectedItemsReducer,
        errors: errorsReducer,
      },
      preloadedState: {
        header: {
          type: '',
          text: '',
          page: 1,
          singleId: null,
          shallShowLoader: true,
          isLoading: true,
        },
        selectedItems: { selectedArr: [] },
        errors: { fetchError: false, wholeAppError: true },
      },
    });
    const { getByTestId } = render(
      <Provider store={store}>
        <ErrorBoundary appError msg="Something went wrong...">
          <Header />
        </ErrorBoundary>
      </Provider>
    );

    const fetchErrorBlock = getByTestId('app-error');
    expect(fetchErrorBlock).toBeInTheDocument();
  });
});
