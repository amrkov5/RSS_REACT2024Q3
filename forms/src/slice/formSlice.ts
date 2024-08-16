import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

import { RootState } from '../store';

export interface FormData {
  name: string;
  age: number | string;
  email: string;
  password: string;
  rPassword: string;
  gender: string;
  country: string;
  conditionsChecked: boolean;
  isNew?: boolean;
  id?: string;
  picData: string | FileList;
}

export interface FormState {
  data: FormData[];
}

const initialState: FormState = {
  data: [],
};

const formSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    addData: {
      reducer(state, action: PayloadAction<FormData>) {
        state.data.push(action.payload);
      },
      prepare(data) {
        return {
          payload: { ...data, id: nanoid() },
        };
      },
    },
    setAsRead: (state, action) => {
      const elIndex = state.data.findIndex((el) => el.id === action.payload);
      state.data[elIndex].isNew = false;
    },
  },
});

export const selectData = (state: RootState) => state.formData;
export const { addData, setAsRead } = formSlice.actions;
export default formSlice.reducer;
