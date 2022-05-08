import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

type EditProfileState = {
  name: string;
  login: string;
  password: string;
};

const initialState: EditProfileState = {
  name: '',
  login: '',
  password: '',
};

export const editProfile = createAsyncThunk(
  'profile/editProfile',
  async (userID: string, thunkAPI) => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3YTk5MWMxMi04NDlhLTRhNDUtYTk3ZC0wYTFiNmEyOWY4YmUiLCJsb2dpbiI6InVzZXIwMDkiLCJpYXQiOjE2NTE5NDk5Njl9.IEHFoFZ3O9SpdgjDAROiSmcGax8GVnVGkQzsbqJoL8A';
    try {
    } catch (e) {}
  }
);
