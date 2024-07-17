import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
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
    }),
    getSingleCard: builder.query({
      query: ({ resourceType, id }) => `/${resourceType}/${id}`,
    }),
  }),
});

export const { useGetItemsQuery, useGetSingleCardQuery, useLazyGetItemsQuery } =
  apiSlice;
