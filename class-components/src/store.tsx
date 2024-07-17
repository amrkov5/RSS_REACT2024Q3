import { configureStore } from '@reduxjs/toolkit';
import headerReducer from './slices/headerSlice';
import { apiSlice } from './slices/apiSlice';

const store = configureStore({
  reducer: {
    header: headerReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
