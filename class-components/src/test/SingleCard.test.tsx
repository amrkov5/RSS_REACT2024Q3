import { render, within } from '@testing-library/react';
import { describe, expect } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import SingleCard from '../components/SingleCard';
import { mockAPIResponse } from './mockdata';
import { Species } from '../types';
import headerReducer, { updateType } from '../slices/headerSlice';
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
      get: vi.fn(),
    }),
    usePathname: () => '/species',
  };
});

describe('Single card tests', () => {
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

  it('should show correct info in the detailed description', async () => {
    store.dispatch(updateType({ type: 'species' }));

    const { getByTestId } = render(
      <Provider store={store}>
        <SingleCard singleCard={mockAPIResponse.results[0]} />
      </Provider>
    );

    const outlet = getByTestId('outlet');

    const name = within(outlet).getByText(
      (mockAPIResponse.results[0] as Species).name
    );
    const classification = within(outlet).getByText(
      (mockAPIResponse.results[0] as Species).classification
    );
    const height = within(outlet).getByText(
      (mockAPIResponse.results[0] as Species).average_height
    );
    const lifespan = within(outlet).getByText(
      (mockAPIResponse.results[0] as Species).average_lifespan
    );
    const designation = within(outlet).getByText(
      (mockAPIResponse.results[0] as Species).designation
    );
    const hair = within(outlet).getByText(
      (mockAPIResponse.results[0] as Species).hair_colors
    );
    const skin = within(outlet).getByText(
      (mockAPIResponse.results[0] as Species).skin_colors
    );
    expect(name).toBeInTheDocument();
    expect(classification).toBeInTheDocument();
    expect(height).toBeInTheDocument();
    expect(lifespan).toBeInTheDocument();
    expect(designation).toBeInTheDocument();
    expect(hair).toBeInTheDocument();
    expect(skin).toBeInTheDocument();
  });
});
