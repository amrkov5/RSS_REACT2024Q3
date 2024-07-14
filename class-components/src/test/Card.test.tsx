import { expect } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Card from '../components/Card';
import { mockAPIResponse } from './mockdata';
import { FieldsToShow } from '../types';

describe('Card tests', () => {
  it('renders Card', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Card
          resource={mockAPIResponse.resource as keyof FieldsToShow}
          data={mockAPIResponse.results[1]}
        />
      </BrowserRouter>
    );
    expect(getByTestId('card')).toBeInTheDocument();
  });

  // it('should open detailed description', () => {
  //   const { getByTestId } = render(
  //     <BrowserRouter>
  //       <Card
  //         resource={mockAPIResponse.resource}
  //         data={mockAPIResponse.results[1]}
  //       />
  //     </BrowserRouter>
  //   );
  //   const card = getByTestId('card');
  //   console.log(card);
  //   fireEvent.click(card);

  //   const singleCard = getByTestId('single-card');
  //   expect(singleCard).toBeInTheDocument();

  //   screen.debug();
  // });
});
