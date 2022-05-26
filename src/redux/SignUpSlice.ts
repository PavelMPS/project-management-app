import { AsyncThunk, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EmptyObject } from 'react-hook-form';
import axios from 'axios';

import { path } from '../constants/Constants';
import { RootState } from './Store';

export const setUser: AsyncThunk<string, IUserState, EmptyObject> = createAsyncThunk(
  'user/setUser',
  async (arg: { name: string; login: string; password: string }): Promise<string> => {
    const response = await axios.post(path.url + path.signUp, {
      name: arg.name,
      login: arg.login,
      password: arg.password,
    });
    return response.data;
  }
);

const initialState: ISignUpState = {
  error: null,
  isLoading: false,
  isRegistrationSucces: false,
};

export const signupSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    setSignupError: (state) => {
      state.error = '';
    },
  },
  extraReducers: {
    [setUser.fulfilled.type]: (state: ISignUpState, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isRegistrationSucces = true;
      state.error = action.payload;
    },
    [setUser.pending.type]: (state: ISignUpState) => {
      state.isLoading = true;
    },
    [setUser.rejected.type]: (state: ISignUpState, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
  },
});

export const { setSignupError } = signupSlice.actions;
export default signupSlice.reducer;

export const sigupUserError = (state: RootState): string | null => state.signUp.error;
