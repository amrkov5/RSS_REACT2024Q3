// vitest.setup.js
import '@testing-library/jest-dom';
import { vi } from 'vitest';

// vi.mock('next/router', () => ({
//   useRouter() {
//     return {
//       route: '/',
//       pathname: '',
//       query: { type: 'species' },
//       asPath: '',
//       push: vi.fn(),
//       replace: vi.fn(),
//       reload: vi.fn(),
//       back: vi.fn(),
//       prefetch: vi.fn().mockResolvedValue(undefined),
//       beforePopState: vi.fn(),
//       events: {
//         on: vi.fn(),
//         off: vi.fn(),
//         emit: vi.fn(),
//       },
//     };
//   },
// }));
