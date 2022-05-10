import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import jwt_decode from 'jwt-decode';
import axios, { AxiosResponse } from 'axios';

export type ProfileState = {
  name: string;
  login: string;
  password: string;
};

type DecodeParams = {
  iat: number;
  login: string;
  userId: string;
};

const initialState: ProfileState = {
  name: '',
  login: '',
  password: '',
};
const path = `https://immense-coast-63189.herokuapp.com/users`;
export function getIdFromToken(token: string): string {
  const decoded: DecodeParams = jwt_decode(token);
  return decoded.userId;
}

export const editProfile = createAsyncThunk(
  'profile/editProfile',
  async (arg: { userID: string; name: string; login: string; password: string }) => {
    let token = '';
    if (localStorage.getItem('token')) {
      token = localStorage.getItem('token') || '';
    }
    const response: AxiosResponse<ProfileState> = await axios.put(
      `${path}/${arg.userID}`,
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
    editProfile(state: ProfileState, action: PayloadAction<ProfileState>) {
      return { ...state, ...action.payload };
    },
  },
});
