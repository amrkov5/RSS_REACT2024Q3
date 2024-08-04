import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Layout from '../components/Layout';
import Main from '../pag/___in';
import { mockAPIResponse } from './mockdata';
import headerReducer from '../slices/headerSlice';
import selectedItemsReducer from '../slices/selectedItemsSlice';
import errorsReducer from '../slices/errorSlice';

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
    errors: { fetchError: false, wholeAppError: false },
  },
});

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

describe('Header tests', () => {
  it('should display header', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Layout>
          <Main info={mockAPIResponse} />
        </Layout>
      </Provider>
    );

    const header = getByTestId('header');
    const inputBlock = getByTestId('search-form');
    const resourceSelector = getByTestId('type-selector');
    const themeSwitcher = getByTestId('theme-switcher');
    expect(header).toBeInTheDocument();
    expect(inputBlock).toBeInTheDocument();
    expect(resourceSelector).toBeInTheDocument();
    expect(themeSwitcher).toBeInTheDocument();
  });
});
