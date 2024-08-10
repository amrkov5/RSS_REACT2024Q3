import { expect } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Card from '../components/Card';
import { mockAPIResponse } from './mockdata';
import { addItem, removeItem } from '../slices/selectedItemsSlice';
import { Species } from '../types';

describe('Card tests', () => {
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
  const mockStore = configureMockStore();
  const mockedStore = mockStore({
    header: {
      type: 'species',
      text: '',
      page: 1,
      singleId: null,
    },
    selectedItems: {
      selectedArr: [],
    },
  });

  it('renders Card', () => {
    const { getByTestId } = render(
      <Provider store={mockedStore}>
        <Card data={mockAPIResponse.results[0]} resource="species" />
      </Provider>
    );
    expect(getByTestId('card')).toBeInTheDocument();
  });

  it('should render cart info correctly', () => {
    const { getByText } = render(
      <Provider store={mockedStore}>
        <Card data={mockAPIResponse.results[0]} resource="species" />
      </Provider>
    );

    const name = getByText((mockAPIResponse.results[0] as Species).name);
    const classification = getByText(
      (mockAPIResponse.results[0] as Species).classification
    );
    const height = getByText(
      (mockAPIResponse.results[0] as Species).average_height
    );
    const lifespan = getByText(
      (mockAPIResponse.results[0] as Species).average_lifespan
    );
    const language = getByText(
      (mockAPIResponse.results[0] as Species).language
    );
    expect(name).toBeInTheDocument();
    expect(classification).toBeInTheDocument();
    expect(height).toBeInTheDocument();
    expect(lifespan).toBeInTheDocument();
    expect(language).toBeInTheDocument();
  });

  it('should change state correctly and rerender card with checked checkbox', () => {
    vi.spyOn(mockedStore, 'dispatch');
    const { getByTestId } = render(
      <Provider store={mockedStore}>
        <Card data={mockAPIResponse.results[0]} resource="species" />
      </Provider>
    );

    const selector = getByTestId('card-selector');
    expect(selector).not.toBeChecked();
    fireEvent.click(selector);
    expect(mockedStore.dispatch).toHaveBeenCalledWith(
      addItem(mockAPIResponse.results[0])
    );

    const updatedStore = mockStore({
      header: {
        type: 'species',
        text: '',
        page: 1,
        singleId: null,
      },
      selectedItems: {
        selectedArr: [mockAPIResponse.results[0]],
      },
    });

    const { getAllByTestId: getByTestIdAfterUpdate } = render(
      <Provider store={updatedStore}>
        <Card data={mockAPIResponse.results[0]} resource="species" />
      </Provider>
    );

    const selectorAfterUpdate = getByTestIdAfterUpdate('card-selector');
    expect(selectorAfterUpdate[1]).toBeChecked();
  });

  it('should remove card from the state and rerender card with unchecked checkbox', () => {
    const storeWithSelectedCard = mockStore({
      header: {
        type: 'species',
        text: '',
        page: 1,
        singleId: null,
      },
      selectedItems: {
        selectedArr: [mockAPIResponse.results[0]],
      },
    });

    vi.spyOn(storeWithSelectedCard, 'dispatch');
    const { getByTestId } = render(
      <Provider store={storeWithSelectedCard}>
        <Card data={mockAPIResponse.results[0]} resource="species" />
      </Provider>
    );

    const selector = getByTestId('card-selector');
    expect(selector).toBeChecked();
    fireEvent.click(selector);
    expect(storeWithSelectedCard.dispatch).toHaveBeenCalledWith(
      removeItem(mockAPIResponse.results[0])
    );

    const updatedStore = mockStore({
      header: {
        type: 'species',
        text: '',
        page: 1,
        singleId: null,
      },
      selectedItems: {
        selectedArr: [],
      },
    });

    const { getAllByTestId } = render(
      <Provider store={updatedStore}>
        <Card data={mockAPIResponse.results[0]} resource="species" />
      </Provider>
    );

    const selectorAfterUpdate = getAllByTestId('card-selector');
    expect(selectorAfterUpdate[1]).not.toBeChecked();
  });
});
