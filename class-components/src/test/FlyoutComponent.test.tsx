import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { mockAPIResponse } from './mockdata';
import headerReducer from '../slices/headerSlice';
import selectedItemsReducer, { addItem } from '../slices/selectedItemsSlice';
import errorsReducer from '../slices/errorSlice';
import Main from '../components/Main';

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

describe('Flyout tests', () => {
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
      selectedItems: { selectedArr: [mockAPIResponse.results[0]] },
      errors: { fetchError: false, wholeAppError: false },
    },
  });

  it('Should render Flyout', async () => {
    store.dispatch(addItem(mockAPIResponse.results[0]));
    const { getByTestId } = render(
      <Provider store={store}>
        <Main info={mockAPIResponse} />
      </Provider>
    );

    const flyout = getByTestId('flyout');
    expect(flyout).toBeInTheDocument();
  });
});
