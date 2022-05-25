import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ILoginData } from '../components/LoginPage/LoginPage';
import { IUserCredentials } from '../components/SignupPage/SignupPage';
import { setUser } from './apiReducer';
import { RootState } from './Store';

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
  statusCode: null,
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
      localStorage.clear();
      state.token = '';
    },
  },
  extraReducers: {
    [setUser.fulfilled.type]: (state: IUserSlice, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = '';
    },
    [setUser.pending.type]: (state: IUserSlice) => {
      state.isLoading = true;
    },
    [setUser.rejected.type]: (state: IUserSlice, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      state.statusCode = action.statusCode;
      console.log(state.statusCode);
    },
  },
});

export const { setCredentials, setError, setToken, setAuthCredentials, logout } = userSlice.actions;
export default userSlice.reducer;

export const selectUserError = (state: RootState): string | null => state.user.error;
