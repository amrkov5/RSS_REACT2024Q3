import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import headerReducer from './slices/headerSlice';
import selectedItemsReducer from './slices/selectedItemsSlice';
import errorsReducer from './slices/errorSlice';
import { apiSlice } from './slices/apiSlice';

const store = configureStore({
  reducer: {
    header: headerReducer,
    selectedItems: selectedItemsReducer,
    errors: errorsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, thunk),
});

export default store;
