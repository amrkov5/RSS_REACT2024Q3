import { render } from '@testing-library/react';
import NotFound from '../pages/404';

describe('Flyout tests', () => {
  it('Should draw not found page', async () => {
    const { getByTestId } = render(<NotFound />);

    const notFound = getByTestId('not-found-page');
    expect(notFound).toBeInTheDocument();
  });
});
