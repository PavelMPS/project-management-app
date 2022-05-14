import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchStatus, path } from '../constants/constants';
import { getIdFromToken } from './EditProfileSlice';

type DeleteUserState = {
  status: string;
  error: string | null;
  isLoading: boolean;
};

const initialState: DeleteUserState = {
  status: fetchStatus.idle,
  error: null,
  isLoading: false,
};

export const deleteUser = createAsyncThunk('delUser/deleteUser', async () => {
  let token = '';
  if (localStorage.getItem('token')) {
    token = localStorage.getItem('token') || '';
  }
  const userId = getIdFromToken(token);
  const requestString = `${path.url}${path.users}/${userId}`;
  const response = await axios.delete(requestString, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
});

const deleteUserSLice = createSlice({
  name: 'delUser',
  initialState,
  reducers: {},
  extraReducers: {
    [deleteUser.pending.type]: (state: DeleteUserState) => {
      state.isLoading = true;
    },
    [deleteUser.fulfilled.type]: (state: DeleteUserState) => {
      state.status = fetchStatus.succeeded;
      state.isLoading = false;
    },
    [deleteUser.rejected.type]: (state: DeleteUserState) => {
      state.status = fetchStatus.failed;
      state.isLoading = false;
    },
  },
});

export default deleteUserSLice.reducer;
