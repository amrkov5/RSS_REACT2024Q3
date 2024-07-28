import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import Main from '../components/Main';
import server from './msw/server';
import store from '../store';
import { updateSingleId, updateType } from '../slices/headerSlice';
import { mockAPIResponse } from './mockdata';
import SingleCard from '../components/SingleCard';
import ConnectError from '../components/connectComponent';

describe('Main', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());

  it('renders Main.tsx', async () => {
    store.dispatch(updateType({ type: 'species' }));
    const { getByTestId } = render(
      <BrowserRouter>
        <Provider store={store}>
          <Main />
        </Provider>
      </BrowserRouter>
    );
    await waitFor(() => {
      expect(getByTestId('main')).toBeInTheDocument();
    });
  });

  it('displays loader', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Provider store={store}>
          <Main />
        </Provider>
      </BrowserRouter>
    );

    const loader = getByTestId('loader');
    expect(loader).toBeInTheDocument();
  });

  it('renders the correct number of cards', async () => {
    store.dispatch(updateType({ type: 'species' }));
    const { getAllByTestId } = render(
      <BrowserRouter>
        <Provider store={store}>
          <Main />
        </Provider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    });

    const renderedCards = getAllByTestId('card');
    expect(renderedCards.length).toBe(mockAPIResponse.results.length);
  });

  it('displays a message if no cards are present', async () => {
    store.dispatch(updateType({ type: 'nothing' }));

    render(
      <BrowserRouter>
        <Provider store={store}>
          <Main />
        </Provider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    });

    const noCards = screen.getByTestId('nothing');
    await waitFor(() => {
      expect(noCards).toBeInTheDocument();
    });
  });

  it('should draw detailed card after clicking on a card', async () => {
    const fetchSpy = vi.spyOn(global, 'fetch');
    store.dispatch(updateType({ type: 'species' }));

    const { getAllByTestId, getByTestId } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/RSS_REACT2024Q3/species/card/1`]}>
          <Routes>
            <Route
              path="/RSS_REACT2024Q3/:resourceType"
              element={
                <ConnectError msg={"Couldn't fetch the data..."}>
                  <Main />
                </ConnectError>
              }
            >
              <Route path="card/:id" element={<SingleCard />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    });

    const cards = getAllByTestId('card');
    fireEvent.click(cards[0]);
    store.dispatch(
      updateSingleId({ singleId: mockAPIResponse.results[0].url.match(/\d+/g) })
    );

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(getByTestId('detailed-card')).toBeInTheDocument();
    });
  });
});
