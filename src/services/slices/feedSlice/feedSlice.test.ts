import {
  feedSliceReducer,
  FeedState,
  getFeed,
  initialState
} from './feedSlice';

describe('feedSliceTest', () => {
  test('loading should be true', () => {
    const state = feedSliceReducer(initialState, getFeed.pending(''));

    expect(state).toEqual({
      loading: true,
      error: null,
      modalOrder: null,
      orders: [],
      total: 0,
      totalToday: 0
    });
  });

  test('getFeed', () => {
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

    const testResponse = {
      orders: testOrders,
      total: 1,
      totalToday: 1,
      success: true
    };

    const expectedState = {
      orders: testOrders,
      total: 1,
      totalToday: 1,
      loading: false,
      error: null,
      modalOrder: null
    };

    const state = feedSliceReducer(
      initialState,
      getFeed.fulfilled(testResponse, '')
    );

    expect(state).toEqual(expectedState);
  });

  test('test error', () => {
    const error = new Error('test');

    const expectedState: FeedState = {
      ...initialState,
      error: error.message
    };

    const state = feedSliceReducer(initialState, getFeed.rejected(error, ''));

    expect(state).toEqual(expectedState);
  });
});
