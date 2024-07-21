import { http, HttpResponse } from 'msw';
import { emptyResponse, mockAPIResponse } from '../mockdata';

const handlers = [
  http.get('https://swapi.dev/api/species', () => {
    return HttpResponse.json(mockAPIResponse);
  }),
  http.get('https://swapi.dev/api/nothing', () => {
    return HttpResponse.json(emptyResponse);
  }),
  http.get('https://swapi.dev/api/species/1', () => {
    return HttpResponse.json(mockAPIResponse.results[0]);
  }),
];

export default handlers;
