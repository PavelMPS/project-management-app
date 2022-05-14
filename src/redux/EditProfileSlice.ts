import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import jwt_decode from 'jwt-decode';
import axios, { AxiosResponse } from 'axios';
import { path } from '../constants/constants';
import { getTokenFromLocalStorage } from './ColumnSlice';

const initialState: IProfileState = {
  name: '',
  login: '',
  password: '',
};

export function getIdFromToken(token: string): string {
  const decoded: IDecodeParams = jwt_decode(token);
  return decoded.userId;
}

export const editProfile = createAsyncThunk(
  'profile/editProfile',
  async (arg: { userID: string; name: string; login: string; password: string }) => {
    const token = getTokenFromLocalStorage();
    const response: AxiosResponse<IProfileState> = await axios.put(
      path.url + path.users,
      {
        name: arg.name,
        login: arg.login,
        password: arg.password,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

export const editProfileSlice = createSlice({
  name: 'editProfile',
  initialState,
  reducers: {
    editProfile(state: IProfileState, action: PayloadAction<IProfileState>) {
      return { ...state, ...action.payload };
    },
  },
});
