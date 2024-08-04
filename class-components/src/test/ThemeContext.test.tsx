import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ThemeProvider from '../components/ThemeContext';
import Layout from '../components/Layout';
import { mockAPIResponse } from './mockdata';
import Main from '../pag/___in';
import headerReducer from '../slices/headerSlice';
import selectedItemsReducer from '../slices/selectedItemsSlice';
import errorsReducer from '../slices/errorSlice';

describe('Theme context test', () => {
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

  it('updates the theme when toggle button is clicked', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <Provider store={store}>
          <Layout>
            <Main info={mockAPIResponse} />
          </Layout>
        </Provider>
      </ThemeProvider>
    );
    const themeSwitcher = getByTestId('theme-checkbox');
    expect(themeSwitcher).toBeInTheDocument();

    const header = getByTestId('header');
    expect(header).toHaveAttribute('data-theme');

    let headerTheme = header.getAttribute('data-theme');
    expect(headerTheme).toContain('dark');

    fireEvent.click(themeSwitcher);
    expect(header).toHaveAttribute('data-theme');
    headerTheme = header.getAttribute('data-theme');

    expect(headerTheme).toContain('light');
  });
});
