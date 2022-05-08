import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserCredentials } from '../components/signup-page/SignupPage';

interface userSlice {
  name: string;
  login: string;
  password: string;
  error: string;
}

const initialState: userSlice = {
  name: '',
  login: '',
  password: '',
  error: '',
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
  },
});

export const { setCredentials, setError } = userSlice.actions;
export default userSlice.reducer;
