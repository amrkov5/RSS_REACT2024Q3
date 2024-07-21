import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

describe('App tests', () => {
  it('Should render app', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(getByTestId('app')).toBeInTheDocument();
  });
});
