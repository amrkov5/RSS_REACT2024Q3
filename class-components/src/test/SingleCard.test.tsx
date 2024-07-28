import {
  fireEvent,
  render,
  waitForElementToBeRemoved,
  within,
} from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect } from 'vitest';
import { Provider } from 'react-redux';
import SingleCard from '../components/SingleCard';
import { mockAPIResponse } from './mockdata';
import store from '../store';
import { updateSingleId, updateType } from '../slices/headerSlice';
import Main from '../components/Main';
import ConnectError from '../components/connectComponent';

const navigate = vi.fn();

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = (await importOriginal()) as object;
  return {
    ...actual,
    useNavigate: () => navigate,
  };
});

describe('Single card tests', () => {
  it('should show loader in detailed description', () => {
    store.dispatch(updateType({ type: 'species' }));
    store.dispatch(updateSingleId({ singleId: '1' }));
    const { getByTestId } = render(
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
    const outlet = getByTestId('outlet');

    const loader = within(outlet).getByTestId('loader');
    expect(loader).toBeInTheDocument();
  });

  it('should show correct info in the detailed description', async () => {
    store.dispatch(updateType({ type: 'species' }));
    store.dispatch(updateSingleId({ singleId: '1' }));

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

    await waitForElementToBeRemoved(getAllByTestId('loader'));

    const outlet = getByTestId('outlet');

    const name = within(outlet).getByText(mockAPIResponse.results[0].name);
    const classification = within(outlet).getByText(
      mockAPIResponse.results[0].classification
    );
    const height = within(outlet).getByText(
      mockAPIResponse.results[0].average_height
    );
    const lifespan = within(outlet).getByText(
      mockAPIResponse.results[0].average_lifespan
    );
    const designation = within(outlet).getByText(
      mockAPIResponse.results[0].designation
    );
    const hair = within(outlet).getByText(
      mockAPIResponse.results[0].hair_colors
    );
    const skin = within(outlet).getByText(
      mockAPIResponse.results[0].skin_colors
    );
    expect(name).toBeInTheDocument();
    expect(classification).toBeInTheDocument();
    expect(height).toBeInTheDocument();
    expect(lifespan).toBeInTheDocument();
    expect(designation).toBeInTheDocument();
    expect(hair).toBeInTheDocument();
    expect(skin).toBeInTheDocument();
  });

  it('close button should close detailed description', async () => {
    store.dispatch(updateType({ type: 'species' }));
    store.dispatch(updateSingleId({ singleId: '1' }));
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

    await waitForElementToBeRemoved(getAllByTestId('loader'));
    const outlet = getByTestId('outlet');

    fireEvent.click(within(outlet).getByText('Close'));
    store.dispatch(updateSingleId({ singleId: null }));
    expect(navigate).toBeCalled();
  });
});
