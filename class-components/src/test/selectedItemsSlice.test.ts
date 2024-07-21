import selectedItemsReducer, {
  addItem,
  removeItem,
} from '../slices/selectedItemsSlice';
import { mockAPIResponse } from './mockdata';

describe('selectedItemsSlice tests', () => {
  it('should add card into selected arr', () => {
    const initialState = {
      selectedArr: [],
    };
    const action = addItem(mockAPIResponse.results[0]);
    const newState = selectedItemsReducer(initialState, action);
    expect(newState.selectedArr[0]).toEqual(mockAPIResponse.results[0]);
  });

  it('should remove card into selected arr', () => {
    const initialState = {
      selectedArr: [mockAPIResponse.results[0]],
    };
    const action = removeItem(mockAPIResponse.results[0]);
    const newState = selectedItemsReducer(initialState, action);
    expect(newState.selectedArr[0]).toEqual(undefined);
  });
});
