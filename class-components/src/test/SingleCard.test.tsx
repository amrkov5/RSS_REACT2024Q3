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

describe('Single card tests', () => {
  vi.mock('next/router', () => {
    return {
      __esModule: true,
      useRouter: () => ({
        route: '/',
        pathname: '',
        query: { type: 'species' },
        asPath: '?type=species',
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

  it('should show loader in detailed description', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <SingleCard singleCard={null} />
      </Provider>
    );
    const outlet = getByTestId('outlet');

    const loader = within(outlet).getByTestId('loader');
    expect(loader).toBeInTheDocument();
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
