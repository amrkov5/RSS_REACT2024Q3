import { configureStore } from '@reduxjs/toolkit';
import headerReducer from './slices/headerSlice';
import selectedItemsReducer from './slices/selectedItemsSlice';
import { apiSlice } from './slices/apiSlice';

const store = configureStore({
  reducer: {
    header: headerReducer,
    selectedItems: selectedItemsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
