import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import headerReducer from '../../slices/headerSlice';
import selectedItemsReducer from '../../slices/selectedItemsSlice';
import errorsReducer from '../../slices/errorSlice';
import CardList from '../../app/[type]/dataLoader';

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

describe('layout test', () => {
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
        isLoading: false,
      },
      selectedItems: { selectedArr: [] },
      errors: { fetchError: false, wholeAppError: false },
    },
  });
  it('should draw load cards data from mock server', async () => {
    const path = { type: 'species' };
    const { getAllByTestId } = render(
      <Provider store={store}>
        {await CardList({
          path,
          search: { search: '', page: '', id: '' },
        })}
      </Provider>
    );

    const card = getAllByTestId('card');
    expect(card[0]).toBeInTheDocument();
  });
});
