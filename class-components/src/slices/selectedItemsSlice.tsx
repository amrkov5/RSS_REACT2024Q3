/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import RootState, { SelectedItemState } from './types';

const initialState: SelectedItemState = {
  selectedArr: [],
};

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const id: string = action.payload;
      state.selectedArr = [...state.selectedArr, id];
    },
    removeItem: (state, action) => {
      state.selectedArr = state.selectedArr.filter(
        (el) => el !== action.payload
      );
    },
  },
});

export const selectItemsArr = (state: RootState) =>
  state.selectedItems.selectedArr;
export const { removeItem, addItem } = selectedItemsSlice.actions;

export default selectedItemsSlice.reducer;

/* eslint-enable no-param-reassign */
