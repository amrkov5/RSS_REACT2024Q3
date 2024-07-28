import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store';
import InputBlock from '../components/InputBlock';

describe('Search input tests', () => {
  it('Should render search input with search params', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={[`/RSS_REACT2024Q3/species?search=testText`]}
        >
          <InputBlock />
        </MemoryRouter>
      </Provider>
    );

    expect((getByTestId('search-text') as HTMLSelectElement).value).toBe(
      'testText'
    );
  });

  it('should save the entered value to local storage on form submit', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={[`/RSS_REACT2024Q3/species?search=testText`]}
        >
          <InputBlock />
        </MemoryRouter>
      </Provider>
    );
    const input = getByTestId('search-text');
    const form = getByTestId('search-form');

    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.submit(form);

    expect(localStorage.getItem('text')).toBe('test');
  });
});
