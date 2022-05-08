import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { AppDispatch } from './Store';
import { setError } from './userSlice';

export const setUser = createAsyncThunk(
  'user/setUser',
  async (arg: { name: string; login: string; password: string }) => {
    const requestString = `https://immense-coast-63189.herokuapp.com/signup`;
    async (dispatch: AppDispatch) => {
      try {
        await axios.post(requestString, {
          name: arg.name,
          login: arg.login,
          password: arg.password,
        });
      } catch (e) {
        const err = e as AxiosError;
        dispatch(setError(err.message));
      }
    };
  }
);
