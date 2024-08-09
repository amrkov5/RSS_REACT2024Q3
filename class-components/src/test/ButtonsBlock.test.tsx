import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, within } from '@testing-library/react';
import { Provider } from 'react-redux';
import headerReducer from '../slices/headerSlice';
import selectedItemsReducer from '../slices/selectedItemsSlice';
import errorsReducer from '../slices/errorSlice';
import { mockAPIResponse } from './mockdata';
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

describe('Buttons block test', () => {
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

  it('should show buttons block', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Main info={mockAPIResponse} />
      </Provider>
    );

    const buttonsBlock = getByTestId('buttons-block');
    expect(buttonsBlock).toBeInTheDocument();
  });

  it('should route to the next and prev pages', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Main info={mockAPIResponse} />
      </Provider>
    );

    const buttonsBlock = getByTestId('buttons-block');
    expect(buttonsBlock).toBeInTheDocument();

    fireEvent.click(within(buttonsBlock).getByText('Next'));
    expect(routerMock).toHaveBeenCalledWith('/species?page=2');

    fireEvent.click(within(buttonsBlock).getByText('Prev'));
    expect(routerMock).toHaveBeenCalledWith('/species?page=1');
  });
});
