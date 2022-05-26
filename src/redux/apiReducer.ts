import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { AppDispatch } from './Store';
import { logout, userSlice } from './userSlice';
import { path } from '../constants/Constants';

export const getUser =
  (login: string, password: string) =>
  async (dispatch: AppDispatch): Promise<void> => {
    try {
      dispatch(userSlice.actions.setError(null));
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

export const getUserAuth =
  (id: string, token: string) =>
  async (dispatch: AppDispatch): Promise<void> => {
    try {
      dispatch(userSlice.actions.setError(null));
      const response = await axios.get(path.url + path.users + `/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        dispatch(userSlice.actions.setToken(token));
        localStorage.setItem('isAuth', 'Auth');
      } else {
        dispatch(logout);
      }
    } catch (e) {
      const err = e as AxiosError;
      dispatch(userSlice.actions.setError(err.message));
    }
  };
