import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from '../App';
import store from '../store';
import { updateType } from '../slices/headerSlice';

describe('App tests', () => {
  it('Should render app', () => {
    store.dispatch(updateType({ type: 'species' }));
    const { getByTestId } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/RSS_REACT2024Q3/']}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(getByTestId('app')).toBeInTheDocument();
  });
});
