import { render } from '@testing-library/react';
import Page from '../../app/page';

const routerMock = vi.fn();

vi.mock('next/navigation', () => {
  return {
    __esModule: true,
    useRouter: () => ({
      back: vi.fn(),
      forward: vi.fn(),
      push: routerMock,
      replace: vi.fn(),
      refresh: vi.fn(),
      prefetch: vi.fn(),
    }),
    useSearchParams: () => ({
      get: vi.fn(),
    }),
    usePathname: () => '/species',
  };
});

describe('layout test', () => {
  it('should draw layout', async () => {
    const { getByTestId } = render(<Page />);

    const loader = getByTestId('loader');
    expect(loader).toBeInTheDocument();
  });
});
