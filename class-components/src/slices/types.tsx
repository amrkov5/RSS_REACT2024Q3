type HeaderState = {
  type: string;
  text: string;
  page: number;
  singleId: number;
};

export type SelectedItemState = {
  selectedArr: string[];
};

type RootState = {
  header: HeaderState;
  selectedItems: SelectedItemState;
};

export default RootState;
