// import { BrowserRouter } from 'react-router-dom';
// import { render, screen, waitFor } from '@testing-library/react';
// import Main from '../components/Main';
// import { mockAPIResponse, emptyResponse } from './mockdata';
// import { APIResponse } from '../types';

// describe('Main', () => {
//   it('renders Main.tsx', () => {
//     const { getByTestId } = render(
//       <BrowserRouter>
//         <Main
//           page={1}
//           fetchError={false}
//           dataToPaint={mockAPIResponse as APIResponse}
//         />
//       </BrowserRouter>
//     );

//     expect(getByTestId('main')).toBeInTheDocument();
//   });

//   it('displays loader', () => {
//     const { getByTestId } = render(
//       <BrowserRouter>
//         <Main page={1} fetchError={false} dataToPaint={null} />
//       </BrowserRouter>
//     );

//     const loader = getByTestId('loader');
//     expect(loader).toBeInTheDocument();
//   });

//   it('displays a message if no cards are present', () => {
//     render(
//       <BrowserRouter>
//         <Main
//           page={1}
//           fetchError={false}
//           dataToPaint={emptyResponse as APIResponse}
//         />
//       </BrowserRouter>
//     );

//     const noCardsComponent = screen.getByTestId('nothing');
//     expect(noCardsComponent).toBeInTheDocument();
//   });

//   it('renders the correct number of cards', async () => {
//     const { getAllByTestId } = render(
//       <BrowserRouter>
//         <Main
//           page={1}
//           fetchError={false}
//           dataToPaint={mockAPIResponse as APIResponse}
//         />
//       </BrowserRouter>
//     );

//     await waitFor(() => {
//       expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
//     });

//     const renderedCards = getAllByTestId('card');
//     expect(renderedCards.length).toBe(mockAPIResponse.results.length);
//   });
// });
