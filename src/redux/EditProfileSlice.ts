import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import jwt_decode from 'jwt-decode';
import axios, { AxiosResponse } from 'axios';

type EditProfileState = {
  name: string;
  login: string;
  password: string;
};

type DecodeParams = {
  iat: number;
  login: string;
  userId: string;
};

const initialState: EditProfileState = {
  name: '',
  login: '',
  password: '',
};
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3YTk5MWMxMi04NDlhLTRhNDUtYTk3ZC0wYTFiNmEyOWY4YmUiLCJsb2dpbiI6InVzZXIwMDkiLCJpYXQiOjE2NTE5NDk5Njl9.IEHFoFZ3O9SpdgjDAROiSmcGax8GVnVGkQzsbqJoL8A';
const path = `https://immense-coast-63189.herokuapp.com/users`;
export function getIdFromToken(): string {
  const decoded: DecodeParams = jwt_decode(token);
  return decoded.userId;
}

export const editProfile = createAsyncThunk(
  'profile/editProfile',
  async (arg: { userID: string; name: string; login: string; password: string }) => {
    const response: AxiosResponse<EditProfileState> = await axios.put(
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
    editProfile(state: EditProfileState, action: PayloadAction<EditProfileState>) {
      return { ...state, ...action.payload };
    },
  },
});
