import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, within } from '@testing-library/react';
import { Provider } from 'react-redux';
import headerReducer from '../slices/headerSlice';
import selectedItemsReducer from '../slices/selectedItemsSlice';
import errorsReducer from '../slices/errorSlice';
import { mockAPIResponse } from './mockdata';
import Main from '../pag/___in';

const routerMock = vi.fn();

vi.mock('next/router', () => {
  return {
    __esModule: true,
    useRouter: () => ({
      route: '/',
      pathname: '',
      query: { type: 'species' },
      asPath: '',
      push: routerMock,
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
    expect(routerMock).toHaveBeenCalledWith({
      query: { type: 'species', page: 2 },
    });

    fireEvent.click(within(buttonsBlock).getByText('Prev'));
    expect(routerMock).toHaveBeenCalledWith({
      query: { type: 'species', page: 1 },
    });
  });
});
