type HeaderState = {
  type: string;
  text: string;
  page: number;
  singleId: number;
};

type RootState = {
  header: HeaderState;
};

export type { HeaderState, RootState };
