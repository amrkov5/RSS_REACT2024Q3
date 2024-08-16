import { createSlice } from '@reduxjs/toolkit';

import countryList from '../assets/data';
import { RootState } from '../store';

const countrySlice = createSlice({
  name: 'countries',
  initialState: countryList,
  reducers: {},
});

export const selectCountry = (state: RootState) => state.countryData;

export default countrySlice.reducer;
