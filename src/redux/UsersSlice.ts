import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';

import { fetchStatus, path } from '../constants/constants';
import { RootState } from './Store';

const initialState: usersState = {
  users: [] as IUser[],
  statusUsers: fetchStatus.idle,
  error: null,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (): Promise<IUser[]> => {
  const requestString = `${path.url}${path.users}`;
  let token = '';
  if (localStorage.getItem('token')) {
    token = localStorage.getItem('token') || '';
  }
  const response: AxiosResponse<IUser[]> = await axios.get(requestString, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

const boardSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state: usersState) => {
        state.statusUsers = fetchStatus.loading;
        state.users = [] as IUser[];
        state.error = null;
      })
      .addCase(
        fetchUsers.fulfilled,
        (
          state: usersState,
          action: PayloadAction<
            IUser[],
            string,
            {
              arg: void;
              requestId: string;
              requestStatus: 'fulfilled';
            },
            never
          >
        ) => {
          state.statusUsers = fetchStatus.succeeded;
          state.users = action.payload;
        }
      )
      .addCase(fetchUsers.rejected, (state: usersState, action) => {
        state.statusUsers = fetchStatus.failed;
        state.error = action.error.message!;
      });
  },
});

export default boardSlice.reducer;

export const selectUsers = (state: RootState): IUser[] => state.users.users;
