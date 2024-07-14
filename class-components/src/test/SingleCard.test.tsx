import { render, waitFor } from '@testing-library/react';
import { BrowserRouter, useOutletContext } from 'react-router-dom';
import { describe, expect, Mock } from 'vitest';
import SingleCard from '../components/SingleCard';
import { mockAPIResponse } from './mockdata';
import { Species } from '../types';

vi.mock('react-router-dom', async () => {
  const original = await vi.importActual('react-router-dom');
  return {
    ...original,
    useOutletContext: vi.fn(),
    useParams: () => ({ resourceType: 'species' }),
    useNavigate: () => () => {},
  };
});

const mockedImplementation = async (): Promise<Response> => {
  const mockedData: Species = mockAPIResponse.results[0] as Species;

  const response = new Response(JSON.stringify(mockedData), {
    status: 200,
    headers: {
      'Content-type': 'application/json',
    },
  });

  return Promise.resolve(response);
};

describe('Single card tests', () => {
  const fetchSpy = vi.spyOn(window, 'fetch');

  fetchSpy.mockImplementation(mockedImplementation);

  it('should show loader in detailed description', () => {
    const mockContextValue = { link: 'test-link', name: 'test-name' };
    (useOutletContext as Mock).mockReturnValue(mockContextValue);

    const { getByTestId } = render(
      <BrowserRouter>
        <SingleCard />
      </BrowserRouter>
    );

    const loader = getByTestId('loader');
    expect(loader).toBeInTheDocument();
  });

  it('should show correct info in the detailed description', async () => {
    const mockContextValue = { link: 'test-link', name: 'test-name' };

    (useOutletContext as Mock).mockReturnValue(mockContextValue);

    const { getByTestId, getByText } = render(
      <BrowserRouter>
        <SingleCard />
      </BrowserRouter>
    );

    const loader = getByTestId('loader');

    await waitFor(() => {
      expect(loader).not.toBeInTheDocument();
    });

    const name = getByText(mockAPIResponse.results[0].name);
    const classification = getByText(mockAPIResponse.results[0].classification);
    const height = getByText(mockAPIResponse.results[0].average_height);
    const lifespan = getByText(mockAPIResponse.results[0].average_lifespan);
    const designation = getByText(mockAPIResponse.results[0].designation);
    const hair = getByText(mockAPIResponse.results[0].hair_colors);
    const skin = getByText(mockAPIResponse.results[0].skin_colors);
    expect(name).toBeInTheDocument();
    expect(classification).toBeInTheDocument();
    expect(height).toBeInTheDocument();
    expect(lifespan).toBeInTheDocument();
    expect(designation).toBeInTheDocument();
    expect(hair).toBeInTheDocument();
    expect(skin).toBeInTheDocument();
  });
});
