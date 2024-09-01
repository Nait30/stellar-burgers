import { TAuthResponse, TRegisterData } from '@api';
import {
  getUser,
  loginUser,
  logout,
  registerUser,
  updateUser,
  userSliceReducer,
  UserState
} from './userSlice';
import { TUser } from '@utils-types';

describe('test userSlice', () => {
  const initialState: UserState = {
    user: null,
    authChecked: false,
    loading: false,
    error: null
  };
  const testApiResponse: TAuthResponse = {
    success: true,
    refreshToken: 'test',
    accessToken: 'test',
    user: {
      email: 'test@test.test',
      name: 'test'
    }
  };
  const userTest: TUser = {
    email: 'test@test.test',
    name: 'test'
  };
  const testRegisterData: TRegisterData = {
    email: 'test@test.test',
    name: 'test',
    password: 'test'
  };

  describe('register', () => {
    test('loading should be true', () => {
      const expectedState: UserState = {
        user: null,
        authChecked: false,
        loading: true,
        error: null
      };
      const state = userSliceReducer(
        initialState,
        registerUser.pending('', testRegisterData)
      );
      expect(state).toEqual(expectedState);
    });

    test('error', () => {
      const error = new Error('test');

      const expectedState: UserState = {
        user: null,
        authChecked: false,
        loading: false,
        error: error.message
      };

      const state = userSliceReducer(
        initialState,
        registerUser.rejected(error, '', testRegisterData)
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
      const expectedState: UserState = {
        user: userTest,
        authChecked: true,
        loading: false,
        error: null
      };
      const state = userSliceReducer(
        initialState,
        registerUser.fulfilled(testApiResponse, '', testRegisterData)
      );
      expect(state).toEqual(expectedState);
    });
  });

  describe('loginUser', () => {
    test('loading should be true', () => {
      const expectedState: UserState = {
        user: null,
        authChecked: false,
        loading: true,
        error: null
      };
      const state = userSliceReducer(
        initialState,
        loginUser.pending('', testRegisterData)
      );
      expect(state).toEqual(expectedState);
    });

    test('error', () => {
      const error = new Error('test');

      const expectedState: UserState = {
        user: null,
        authChecked: false,
        loading: false,
        error: error.message
      };

      const state = userSliceReducer(
        initialState,
        loginUser.rejected(error, '', testRegisterData)
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
      const expectedState: UserState = {
        user: userTest,
        authChecked: true,
        loading: false,
        error: null
      };
      const state = userSliceReducer(
        initialState,
        loginUser.fulfilled(testApiResponse, '', testRegisterData)
      );
      expect(state).toEqual(expectedState);
    });
  });

  describe('getUser', () => {
    test('loading should be true', () => {
      const expectedState: UserState = {
        user: null,
        authChecked: false,
        loading: true,
        error: null
      };
      const state = userSliceReducer(initialState, getUser.pending(''));
      expect(state).toEqual(expectedState);
    });

    test('error', () => {
      const error = new Error('test');

      const expectedState: UserState = {
        user: null,
        authChecked: true,
        loading: false,
        error: error.message
      };

      const state = userSliceReducer(initialState, getUser.rejected(error, ''));

      expect(state).toEqual(expectedState);
    });

    test('loading should be false', () => {
      const expectedState: UserState = {
        user: userTest,
        authChecked: true,
        loading: false,
        error: null
      };
      const state = userSliceReducer(
        initialState,
        getUser.fulfilled(testApiResponse, '')
      );
      expect(state).toEqual(expectedState);
    });
  });

  describe('logout', () => {
    test('loading should be true', () => {
      const expectedState: UserState = {
        user: null,
        authChecked: false,
        loading: true,
        error: null
      };
      const state = userSliceReducer(initialState, logout.pending(''));
      expect(state).toEqual(expectedState);
    });

    test('error', () => {
      const error = new Error('test');

      const expectedState: UserState = {
        user: null,
        authChecked: false,
        loading: false,
        error: error.message
      };

      const state = userSliceReducer(initialState, logout.rejected(error, ''));

      expect(state).toEqual(expectedState);
    });

    test('loading should be false', () => {
      const expectedState: UserState = {
        user: null,
        authChecked: true,
        loading: false,
        error: null
      };
      const state = userSliceReducer(
        { ...initialState, user: userTest },
        logout.fulfilled(undefined, 'test')
      );
      expect(state).toEqual(expectedState);
    });
  });

  describe('updateUser', () => {
    test('loading should be true', () => {
      const expectedState: UserState = {
        user: userTest,
        authChecked: false,
        loading: true,
        error: null
      };
      const state = userSliceReducer(
        {...initialState,
          user: userTest
        },
        updateUser.pending('', testRegisterData)
      );
      expect(state).toEqual(expectedState);
    });

    test('error', () => {
      const error = new Error('test');

      const expectedState: UserState = {
        user: null,
        authChecked: false,
        loading: false,
        error: error.message
      };

      const state = userSliceReducer(
        initialState,
        updateUser.rejected(error, '', testRegisterData)
      );

      expect(state).toEqual(expectedState);
    });

    test('loading should be false', () => {
      const expectedState: UserState = {
        user: userTest,
        authChecked: true,
        loading: false,
        error: null
      };
      const state = userSliceReducer(
        { ...initialState, user: userTest },
        updateUser.fulfilled(testApiResponse, 'test', testRegisterData)
      );
      expect(state).toEqual(expectedState);
    });
  });
});
