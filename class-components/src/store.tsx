import { configureStore } from '@reduxjs/toolkit';
import headerReducer from './slices/headerSlice';
import selectedItemsReducer from './slices/selectedItemsSlice';
import errorsReducer from './slices/errorSlice';

const store = configureStore({
  reducer: {
    header: headerReducer,
    selectedItems: selectedItemsReducer,
    errors: errorsReducer,
  },
});

type AppDispatch = typeof store.dispatch;
type RootState = ReturnType<typeof store.getState>;
export type { AppDispatch, RootState };
export default store;
