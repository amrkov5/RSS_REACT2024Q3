type HeaderState = {
  type: string;
  text: string;
  page: number;
  singleId: number;
};

type SelectedItemState = {
  selectedArr: string[];
};

type RootState = {
  header: HeaderState;
  selectedItems: SelectedItemState;
};

export default RootState;
