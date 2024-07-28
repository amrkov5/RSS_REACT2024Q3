import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { APIResponse } from '../types';

export const apiSlice = createApi({
  reducerPath: 'api',
  keepUnusedDataFor: 60,
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api' }),
  endpoints: (builder) => ({
    getItems: builder.query({
      query: ({ resourceType, query, page }) => {
        if (query && page) {
          return `/${resourceType}?search=${query}&page=${page}`;
        }
        if (query) {
          return `/${resourceType}?search=${query}`;
        }
        if (page) {
          return `/${resourceType}?page=${page}`;
        }
        return `/${resourceType}`;
      },
      transformResponse: (response: APIResponse) => {
        if (Array.isArray(response.results)) {
          return {
            ...response,
            results: response.results.map((el) => ({
              ...el,
              id: `${Date.parse(el.created)}`,
            })),
          };
        }
        return response;
      },
    }),
    getSingleCard: builder.query({
      query: ({ resourceType, id }) => `/${resourceType}/${id}`,
    }),
  }),
});

export const { useGetItemsQuery, useGetSingleCardQuery, useLazyGetItemsQuery } =
  apiSlice;
