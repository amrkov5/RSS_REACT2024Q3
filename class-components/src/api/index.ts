import { BASE } from '../constants';
import { APIResponse, Data } from '../types';

async function getAllPages(next: string) {
  let resArr: Data[] = [];

  async function fetchAdditionalData(nextData: string | null) {
    if (!nextData) {
      return;
    }
    const response = await fetch(nextData);
    const data: APIResponse = await response.json();
    resArr = [...resArr, ...data.results];
    await fetchAdditionalData(data.next);
  }

  await fetchAdditionalData(next);

  return resArr;
}

async function getAPIData(
  type: string,
  text: string,
  link?: string
): Promise<void | APIResponse> {
  const path = link || `${BASE}${type}?search=${text}`;
  const response: APIResponse = await fetch(path)
    .then((resp) => resp.json())
    .then(async (data) => {
      const fullData = data;
      fullData.resource = type;
      if (fullData.next && !text && !link) {
        const allData = await getAllPages(fullData.next);
        fullData.results.push(allData);
        fullData.results = fullData.results.flat();
        fullData.next = null;
      }
      return fullData;
    })
    .catch(() => {
      throw new Error('Failed to fetch data.');
    });
  return response;
}

export default getAPIData;
