import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { useRouter } from 'next/navigation';
import InputBlock from '../components/InputBlock';
import headerReducer from '../slices/headerSlice';
import selectedItemsReducer from '../slices/selectedItemsSlice';
import errorsReducer from '../slices/errorSlice';

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
      get: (param: string) => {
        if (param === 'search') return 'testText';
        return null;
      },
    }),
    usePathname: () => '/species',
  };
});

describe('Search input tests', () => {
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

  it('Should render search input with search params', () => {
    const router = useRouter();
    router.push('/species?search=testText');
    const { getByTestId } = render(
      <Provider store={store}>
        <InputBlock />
      </Provider>
    );

    expect((getByTestId('search-text') as HTMLSelectElement).value).toBe(
      'testText'
    );
  });

  it('should save the entered value to local storage on form submit', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <InputBlock />
      </Provider>
    );
    const input = getByTestId('search-text');
    const form = getByTestId('search-form');

    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.submit(form);

    expect(localStorage.getItem('search')).toBe('test');
  });
});
