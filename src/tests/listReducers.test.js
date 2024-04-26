import { listReducer } from '../redux/reducer';
import { SET_LIST } from '../redux/constant';

describe('listReducer', () => {
  it('should return the initial state', () => {
    expect(listReducer(undefined, {})).toEqual([]);
  });

  it('should handle SET_LIST action', () => {
    const action = {
      type: SET_LIST,
      data: [{ name: 'Luke Skywalker', height: '172' }] 
    };
    expect(listReducer([], action)).toEqual(action.data);
  });
});
