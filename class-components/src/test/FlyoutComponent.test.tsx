import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { mockAPIResponse } from './mockdata';
import Main from '../pages';
import headerReducer from '../slices/headerSlice';
import selectedItemsReducer, { addItem } from '../slices/selectedItemsSlice';
import errorsReducer from '../slices/errorSlice';

describe('Flyout tests', () => {
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
