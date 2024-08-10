import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Layout from '../components/Layout';
import { mockAPIResponse } from './mockdata';
import headerReducer from '../slices/headerSlice';
import selectedItemsReducer from '../slices/selectedItemsSlice';
import errorsReducer from '../slices/errorSlice';
import Main from '../components/Main';

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
