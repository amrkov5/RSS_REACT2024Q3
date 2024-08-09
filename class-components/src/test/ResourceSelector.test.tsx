import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ResourceSelector from '../components/ResourceSelector';
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
      get: vi.fn(),
    }),
    usePathname: () => '/species',
  };
});

describe('Resource selector tests', () => {
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
  it('Should render Resource selector', () => {
    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <ResourceSelector />
      </Provider>
    );

    expect(getByText('Choose search type:')).toBeInTheDocument();
    expect((getByTestId('type-selector') as HTMLSelectElement).value).toBe(
      'species'
    );
  });
});
