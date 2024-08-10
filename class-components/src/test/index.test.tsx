import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { emptyResponse, mockAPIResponse } from './mockdata';
import Main from '../pages';
import headerReducer from '../slices/headerSlice';
import selectedItemsReducer from '../slices/selectedItemsSlice';
import errorsReducer from '../slices/errorSlice';

describe('Main', () => {
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

  it('renders Main.tsx', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Main info={mockAPIResponse} />
      </Provider>
    );
    await waitFor(() => {
      expect(getByTestId('main')).toBeInTheDocument();
    });
  });

  it('renders the correct number of cards', async () => {
    const { getAllByTestId } = render(
      <Provider store={store}>
        <Main info={mockAPIResponse} />
      </Provider>
    );
    const renderedCards = getAllByTestId('card');
    expect(renderedCards.length).toBe(mockAPIResponse.results.length);
  });

  it('displays a message if no cards are present', async () => {
    render(
      <Provider store={store}>
        <Main info={emptyResponse} />
      </Provider>
    );

    const noCards = screen.getByTestId('nothing');
    await waitFor(() => {
      expect(noCards).toBeInTheDocument();
    });
  });
});
