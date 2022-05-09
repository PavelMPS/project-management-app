import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ILoginData } from '../components/login-page/LoginPage';
import { IUserCredentials } from '../components/signup-page/SignupPage';

interface userSlice {
  name: string;
  login: string;
  password: string;
  error: string;
  token: string;
  isAuth: boolean;
  authLogin: string;
  authPass: string;
}

const initialState: userSlice = {
  name: '',
  login: '',
  password: '',
  error: '',
  token: '',
  isAuth: false,
  authLogin: '',
  authPass: '',
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
    setError: (state, action: PayloadAction<string>) => {
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
      state.token = '';
    },
  },
});

export const { setCredentials, setError, setToken, setAuthCredentials, logout } = userSlice.actions;
export default userSlice.reducer;
