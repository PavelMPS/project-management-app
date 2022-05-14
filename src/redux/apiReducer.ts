import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { AppDispatch } from './Store';
import { userSlice } from './UserSlice';

export const setUser = createAsyncThunk(
  'user/setUser',
  async (arg: { name: string; login: string; password: string }) => {
    const requestString = `https://immense-coast-63189.herokuapp.com/signup`;

    try {
      await axios.post(requestString, {
        name: arg.name,
        login: arg.login,
        password: arg.password,
      });
    } catch (e) {}
  }
);

export const getUser = (login: string, password: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.post(`https://immense-coast-63189.herokuapp.com/signin`, {
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
