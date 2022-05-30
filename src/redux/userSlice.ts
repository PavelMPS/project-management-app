import { AsyncThunk, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { EmptyObject } from 'react-hook-form';

import { ILoginData } from '../components/LoginPage/LoginPage';
import { IUserCredentials } from '../components/SignupPage/SignupPage';
import { path } from '../constants/Constants';
import { RootState } from './Store';

export const getUser: AsyncThunk<string, IRegistrationRequest, EmptyObject> = createAsyncThunk(
  'user/getUser',
  async (args): Promise<string> => {
    const response = await axios.post(path.url + path.signIn, {
      login: args.login,
      password: args.password,
    });
    return response.data;
  }
);

export const getUserAuth: AsyncThunk<string, { id: string; token: string }, EmptyObject> =
  createAsyncThunk('user/getUserAuth', async (args: { id: string; token: string }) => {
    const response = await axios.get(path.url + path.users + `/${args.id}`, {
      headers: {
        Authorization: `Bearer ${args.token}`,
      },
    });
    return response.data;
  });

const initialState: IUserSlice = {
  name: '',
  login: '',
  password: '',
  error: null,
  token: '',
  isAuth: false,
  authLogin: '',
  authPass: '',
  isLoading: false,
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<IUserCredentials>) => {
      state.name = action.payload.name;
      state.login = action.payload.login;
      state.password = action.payload.password;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      if (state.token) {
        state.isAuth = true;
      }
    },
    setAuthCredentials: (state, action: PayloadAction<ILoginData>) => {
      state.authLogin = action.payload.login;
      state.authPass = action.payload.password;
    },
    logout: (state) => {
      state.name = '';
      state.login = '';
      state.password = '';
      state.authLogin = '';
      state.authPass = '';
      state.isAuth = false;
      localStorage.removeItem('token');
      localStorage.removeItem('isAuth');
      state.token = '';
    },
  },
  extraReducers: {
    [getUser.fulfilled.type]: (state: IUserSlice, action) => {
      state.isLoading = false;
      localStorage.setItem('token', action.payload.token);
      state.token = action.payload.token;
      state.isAuth = true;
    },
    [getUser.pending.type]: (state: IUserSlice) => {
      state.isLoading = true;
      state.error = '';
    },
    [getUser.rejected.type]: (state: IUserSlice, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    [getUserAuth.fulfilled.type]: (state: IUserSlice, action) => {
      state.isLoading = false;
      state.token = action.payload;
      localStorage.setItem('isAuth', 'Auth');
      state.isAuth = true;
    },
    [getUserAuth.pending.type]: (state: IUserSlice) => {
      state.isLoading = true;
      state.error = '';
    },
    [getUserAuth.rejected.type]: (state: IUserSlice, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
      state = initialState;
      localStorage.removeItem('token');
      localStorage.removeItem('isAuth');
    },
  },
});

export const { setCredentials, setError, setToken, setAuthCredentials, logout } = userSlice.actions;
export default userSlice.reducer;

export const selectUserError = (state: RootState): string | null => state.user.error;
