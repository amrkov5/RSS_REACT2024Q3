import { BASE } from '../constants';
import { APIResponse } from '../types';

async function getAPIData(
  type: string,
  text: string
): Promise<void | APIResponse> {
  const response: APIResponse = await fetch(`${BASE}${type}?search=${text}`)
    .then((resp) => resp.json())
    .catch(() => {
      throw new Error('Failed to fetch data.');
    });
  // console.log('api resp', response);
  return response;
}

// async function getAdditionalPages(next: string) {
//   const response = await fetch(next);
//   const data: APIResponse = await response.json();
//   const resArr = data.results;
//   return resArr;
// }

export default getAPIData;
