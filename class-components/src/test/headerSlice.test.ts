import headerReducer, {
  updatePage,
  updateSingleId,
  updateText,
  updateType,
} from '../slices/headerSlice';
import { mockAPIResponse } from './mockdata';

describe('headerSlice tests', () => {
  const initialState = {
    type: '1',
    text: '',
    page: 1,
    singleId: null,
  };

  it('should update type', () => {
    const action = updateType({ type: 'people' });
    const newState = headerReducer(initialState, action);
    expect(newState.type).toEqual('people');
  });

  it('should update text', () => {
    const action = updateText({ text: 'textSearchQuery' });
    const newState = headerReducer(initialState, action);
    expect(newState.text).toEqual('textSearchQuery');
  });

  it('should update page', () => {
    const action = updatePage({ page: 2 });
    const newState = headerReducer(initialState, action);
    expect(newState.page).toEqual(2);
  });

  it('should update singleId', () => {
    const action = updateSingleId({ singleId: mockAPIResponse.results[0].id });
    const newState = headerReducer(initialState, action);
    expect(newState.singleId).toEqual(mockAPIResponse.results[0].id);
  });
});
