import {
  getOrders,
  initialState,
  orderSliceReducer,
  OrderState
} from './orderSlice';

describe('testOrders', () => {
  test('loading should be true', () => {
    const expectedState = {
      ...initialState,
      loading: true
    };
    const state = orderSliceReducer(initialState, getOrders.pending(''));
    expect(state).toEqual(expectedState);
  });

  test('error', () => {
    const error = new Error('test');

    const expectedState: OrderState = {
      ...initialState,
      error: error.message
    };

    const state = orderSliceReducer(
      initialState,
      getOrders.rejected(error, '')
    );

    expect(state).toEqual(expectedState);
  });

  test('loading should be false', () => {
    const testOrders = [
      {
        _id: '1',
        status: 'done',
        name: 'test',
        createdAt: '31.08.2024',
        updatedAt: '31.08.2024',
        number: 1,
        ingredients: ['test', 'test1']
      }
    ];
    const expectedState = {
      ...initialState,
      orders: testOrders
    };
    const state = orderSliceReducer(
      initialState,
      getOrders.fulfilled(testOrders, '')
    );
    expect(state).toEqual(expectedState);
  });
});
