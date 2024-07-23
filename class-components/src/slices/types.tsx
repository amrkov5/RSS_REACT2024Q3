import { Data } from '../types';

type HeaderState = {
  type: string;
  text: string;
  page: number;
  singleId: number;
};

type ErrorState = {
  wholeAppError: boolean;
  fetchError: boolean;
};

export type SelectedItemState = {
  selectedArr: Data[] | [];
};

type RootState = {
  header: HeaderState;
  selectedItems: SelectedItemState;
  errors: ErrorState;
};

export default RootState;
