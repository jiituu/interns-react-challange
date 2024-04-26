import { listData } from '../redux/action';
import { LIST_DATA } from '../redux/constant';

describe('listData', () => {
  it('should create an action to list data', () => {
    const expectedAction = {
      type: LIST_DATA
    };
    expect(listData()).toEqual(expectedAction);
  });
});
