import { BASE } from '../constants';
import { APIResponse } from '../types';

async function getAPIData(
  type: string,
  text: string
): Promise<void | APIResponse> {
  const response: APIResponse = await fetch(`${BASE}${type}?search=${text}`)
    .then((resp) => resp.json())
    .then((data) => {
      const fullData = data;
      fullData.resource = type;
      return fullData;
    })
    .catch(() => {
      throw new Error('Failed to fetch data.');
    });
  return response;
}

// async function getAdditionalPages(next: string) {
//   const response = await fetch(next);
//   const data: APIResponse = await response.json();
//   const resArr = data.results;
//   return resArr;
// }

export default getAPIData;
