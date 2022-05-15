import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { EmptyObject } from 'react-hook-form';

import { AppDispatch } from './Store';
import { userSlice } from './UserSlice';
import { path } from '../constants/constants';

export const setUser: AsyncThunk<void, IUserState, EmptyObject> = createAsyncThunk(
  'user/setUser',
  async (arg: { name: string; login: string; password: string }): Promise<void> => {
    try {
      await axios.post(path.url + path.signUp, {
        name: arg.name,
        login: arg.login,
        password: arg.password,
      });
    } catch (e) {}
  }
);

export const getUser =
  (login: string, password: string) =>
  async (dispatch: AppDispatch): Promise<void> => {
    try {
      const response = await axios.post(path.url + path.signIn, {
        login: login,
        password: password,
      });
      dispatch(userSlice.actions.setToken(response.data.token));
      localStorage.setItem('token', response.data.token);
    } catch (e) {
      const err = e as AxiosError;
      dispatch(userSlice.actions.setError(err.message));
    }
  };
