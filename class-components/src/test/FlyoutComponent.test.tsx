import { render, waitForElementToBeRemoved } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../store';
import { updateType } from '../slices/headerSlice';
import Main from '../components/Main';
import { addItem } from '../slices/selectedItemsSlice';
import { mockAPIResponse } from './mockdata';

describe('Flyout tests', () => {
  it('Should render Flyout', async () => {
    store.dispatch(addItem(mockAPIResponse.results[0]));
    store.dispatch(updateType({ type: 'species' }));
    const { getByTestId } = render(
      <BrowserRouter>
        <Provider store={store}>
          <Main fetchError={false} />
        </Provider>
      </BrowserRouter>
    );

    await waitForElementToBeRemoved(getByTestId('loader'));

    const flyout = getByTestId('flyout');
    expect(flyout).toBeInTheDocument();
  });
});
