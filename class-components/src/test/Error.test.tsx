import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Layout from '../components/Layout';
import Main from '../pag/___in';
import { mockAPIResponse } from './mockdata';
import ConnectError from '../components/connectComponent';
import headerReducer from '../slices/headerSlice';
import selectedItemsReducer from '../slices/selectedItemsSlice';
import errorsReducer from '../slices/errorSlice';

vi.mock('next/router', () => {
  return {
    __esModule: true,
    useRouter: () => ({
      route: '/',
      pathname: '',
      query: { type: 'species' },
      asPath: '',
      push: vi.fn(),
      replace: vi.fn(),
      reload: vi.fn(),
      back: vi.fn(),
      prefetch: vi.fn().mockResolvedValue(undefined),
      beforePopState: vi.fn(),
      events: {
        on: vi.fn(),
        off: vi.fn(),
        emit: vi.fn(),
      },
    }),
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
          type: '',
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
        <ConnectError msg="Failed to fetch data...">
          <Layout>
            <Main info={mockAPIResponse} />
          </Layout>
        </ConnectError>
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
        <ConnectError msg="Something went wrong...">
          <Layout>
            <Main info={mockAPIResponse} />
          </Layout>
        </ConnectError>
      </Provider>
    );

    const fetchErrorBlock = getByTestId('app-error');
    expect(fetchErrorBlock).toBeInTheDocument();
  });
});
