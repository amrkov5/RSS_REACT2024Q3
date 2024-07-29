import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';
import InputBlock from '../components/InputBlock';
import headerReducer from '../slices/headerSlice';
import selectedItemsReducer from '../slices/selectedItemsSlice';
import errorsReducer from '../slices/errorSlice';

vi.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: { search: 'testText' },
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
    };
  },
}));

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
    router.push({ query: { search: 'testText' } });
    const { getByTestId } = render(
      <Provider store={store}>
        <InputBlock />
      </Provider>
    );

    expect((getByTestId('search-text') as HTMLSelectElement).value).toBe(
      'testText'
    );
  });

  // it('should save the entered value to local storage on form submit', () => {
  //   const { getByTestId } = render(
  //     <Provider store={store}>
  //       <MemoryRouter
  //         initialEntries={[`/RSS_REACT2024Q3/species?search=testText`]}
  //       >
  //         <InputBlock />
  //       </MemoryRouter>
  //     </Provider>
  //   );
  //   const input = getByTestId('search-text');
  //   const form = getByTestId('search-form');

  //   fireEvent.change(input, { target: { value: 'test' } });
  //   fireEvent.submit(form);

  //   expect(localStorage.getItem('text')).toBe('test');
  // });
});
