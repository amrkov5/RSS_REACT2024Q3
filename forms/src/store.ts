import { configureStore } from '@reduxjs/toolkit';
import countryReducer from './slice/countrySlice';
import formReducer, { FormState } from './slice/formSlice';

export interface RootState {
  formData: FormState;
  countryData: string[];
}

const store = configureStore({
  reducer: {
    formData: formReducer,
    countryData: countryReducer,
  },
});

export default store;
