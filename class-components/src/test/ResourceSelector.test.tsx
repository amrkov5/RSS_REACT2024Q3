import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import ResourceSelector from '../components/ResourceSelector';
import store from '../store';
import { updateType } from '../slices/headerSlice';

describe('Resource selector tests', () => {
  it('Should render Resource selector', () => {
    store.dispatch(updateType({ type: 'species' }));
    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/RSS_REACT2024Q3/species`]}>
          <ResourceSelector />
        </MemoryRouter>
      </Provider>
    );

    expect(getByText('Choose search type:')).toBeInTheDocument();
    expect((getByTestId('type-selector') as HTMLSelectElement).value).toBe(
      'species'
    );
  });
});
