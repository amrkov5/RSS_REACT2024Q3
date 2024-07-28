/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import RootState from './types';

const headerSlice = createSlice({
  name: 'header',
  initialState: {
    type: '',
    text: '',
    page: 1,
    singleId: null,
  },
  reducers: {
    updateType: (state, action) => {
      const { type } = action.payload;
      state.type = type;
    },
    updateText: (state, action) => {
      const { text } = action.payload;
      state.text = text;
    },
    updatePage: (state, action) => {
      const { page } = action.payload;
      state.page = page;
    },
    updateSingleId: (state, action) => {
      const { singleId } = action.payload;
      state.singleId = singleId;
    },
  },
});

const selectPageNum = (state: RootState) => state.header.page;
const selectType = (state: RootState) => state.header.type;
const selectText = (state: RootState) => state.header.text;
const selectSingleId = (state: RootState) => state.header.singleId;

export const { updateType, updateText, updatePage, updateSingleId } =
  headerSlice.actions;
export { selectPageNum, selectType, selectText, selectSingleId };
export default headerSlice.reducer;
/* eslint-enable no-param-reassign */
