import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '../../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../../utils/cookie';

export interface UserState {
  user: TUser | null;
  authChecked: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  authChecked: false,
  loading: false,
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (sliceState) => {
      sliceState.user = null;
      sliceState.authChecked = false;
      sliceState.loading = false;
      sliceState.error = null;
    }
  },
  selectors: {
    selectUser: (sliceState) => sliceState.user,
    selectIsAuthChecked: (sliceState) => sliceState.authChecked,
    selectIsLoading: (sliceState) => sliceState.loading,
    selectError: (sliceState) => sliceState.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (sliceState) => {
        sliceState.loading = true;
        sliceState.error = null;
      })
      .addCase(registerUser.rejected, (sliceState, action) => {
        sliceState.loading = false;
        sliceState.error = action.error.message as string | null;
      })
      .addCase(registerUser.fulfilled, (sliceState, action) => {
        sliceState.loading = false;
        sliceState.user = action.payload.user;
        sliceState.error = null;
        sliceState.authChecked = true;
      })
      .addCase(loginUser.pending, (sliceState) => {
        sliceState.loading = true;
      })
      .addCase(loginUser.rejected, (sliceState, action) => {
        sliceState.loading = false;
        sliceState.error = action.error.message as string | null;
      })
      .addCase(loginUser.fulfilled, (sliceState, action) => {
        sliceState.loading = false;
        sliceState.user = action.payload.user;
        sliceState.error = null;
        sliceState.authChecked = true;
      })
      .addCase(getUser.pending, (sliceState) => {
        sliceState.loading = true;
      })
      .addCase(getUser.rejected, (sliceState, action) => {
        sliceState.loading = false;
        sliceState.error = action.payload as string;
        sliceState.authChecked = true;
      })
      .addCase(getUser.fulfilled, (sliceState, action) => {
        sliceState.loading = false;
        sliceState.user = action.payload.user;
        sliceState.error = null;
        sliceState.authChecked = true;
      })
      .addCase(logout.pending, (sliceState) => {
        sliceState.loading = true;
      })
      .addCase(logout.rejected, (sliceState, action) => {
        sliceState.loading = false;
        sliceState.error = action.payload as string;
      })
      .addCase(logout.fulfilled, (sliceState, action) => {
        sliceState.loading = false;
        sliceState.user = null;
        sliceState.error = null;
        sliceState.authChecked = true;
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
      })
      .addCase(updateUser.pending, (sliceState) => {
        sliceState.loading = true;
      })
      .addCase(updateUser.rejected, (sliceState, action) => {
        sliceState.loading = false;
        sliceState.error = action.payload as string;
      })
      .addCase(updateUser.fulfilled, (sliceState, action) => {
        sliceState.loading = false;
        sliceState.user = action.payload.user;
        sliceState.error = null;
        sliceState.authChecked = true;
      });
  }
});

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (data: TRegisterData, { rejectWithValue }) => {
    try {
      const registerData = await registerUserApi(data);
      localStorage.setItem('refreshToken', registerData.refreshToken);
      setCookie('accessToken', registerData.accessToken);
      return registerData;
    } catch (error) {
      return rejectWithValue('Ошибка при регистрации');
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (data: TLoginData, { rejectWithValue }) => {
    try {
      const loginData = await loginUserApi(data);
      localStorage.setItem('refreshToken', loginData.refreshToken);
      setCookie('accessToken', loginData.accessToken);
      return loginData;
    } catch (error) {
      return rejectWithValue('Ошибка при регистрации');
    }
  }
);

export const getUser = createAsyncThunk(
  'user/getUser',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getUserApi();
      return data;
    } catch (error) {
      return rejectWithValue('Ошибка при получении данных пользователя');
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data: TRegisterData, { rejectWithValue }) => {
    try {
      const userData = await updateUserApi(data);
      return userData;
    } catch (error) {
      return rejectWithValue('Ошибка при обновлении данных пользователя');
    }
  }
);

export const logout = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
    } catch (error) {
      return rejectWithValue('Ошибка при выходе');
    }
  }
);

export const { selectIsAuthChecked, selectIsLoading, selectUser, selectError } =
  userSlice.selectors;

export const userSliceReducer = userSlice.reducer;
