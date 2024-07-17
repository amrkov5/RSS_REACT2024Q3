// import { fireEvent, render, waitFor } from '@testing-library/react';
// import { BrowserRouter } from 'react-router-dom';
// import ButtonsBlock from '../components/ButtonsBlock';
// import { Species } from '../types';
// import { mockAPIResponse } from './mockdata';

// const mockedImplementation = async (): Promise<Response> => {
//   const mockedData: Species = mockAPIResponse.results[0] as Species;

//   const response = new Response(JSON.stringify(mockedData), {
//     status: 200,
//     headers: {
//       'Content-type': 'application/json',
//     },
//   });

//   return Promise.resolve(response);
// };

// describe('Buttons block', () => {
//   const fetchSpy = vi.spyOn(window, 'fetch');

//   fetchSpy.mockImplementation(mockedImplementation);

//   it('changes page in URL', async () => {
//     const page = 1;
//     const { getByTestId } = render(
//       <BrowserRouter>
//         <ButtonsBlock page={page} prev="0" next="0" />
//       </BrowserRouter>
//     );

//     const next = getByTestId('next-btn');
//     fireEvent.click(next);
//     await waitFor(() => {
//       expect(window.location.pathname).toContain(`page${page + 1}`);
//     });
//   });
// });
