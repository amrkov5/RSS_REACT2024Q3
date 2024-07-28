/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import RootState from './types';

const initialState = {
  wholeAppError: false,
  fetchError: false,
};

const errorSlice = createSlice({
  name: 'errorSlice',
  initialState,
  reducers: {
    toggleAppError: (state) => {
      state.wholeAppError = !state.wholeAppError;
    },
    toggleFetchError: (state) => {
      state.fetchError = !state.fetchError;
    },
  },
});

export const selectWholeAppError = (state: RootState) =>
  state.errors.wholeAppError;
export const selectFetchError = (state: RootState) => state.errors.fetchError;
export const { toggleAppError, toggleFetchError } = errorSlice.actions;

export default errorSlice.reducer;

/* eslint-enable no-param-reassign */
