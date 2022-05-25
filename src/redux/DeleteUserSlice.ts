import { AsyncThunk, createAsyncThunk, createSlice, Slice } from '@reduxjs/toolkit';
import axios from 'axios';

import { EmptyObject } from 'react-hook-form';
import { fetchStatus, path } from '../constants/Constants';
import { getTokenFromLocalStorage } from './ColumnSlice';
import { getIdFromToken } from './EditProfileSlice';
import { RootState } from './Store';

const initialState: IDeleteUserState = {
  status: fetchStatus.idle,
  error: null,
  isLoading: false,
};

export const deleteUser: AsyncThunk<void, void, EmptyObject> = createAsyncThunk(
  'delUser/deleteUser',
  async () => {
    const token = getTokenFromLocalStorage();
    const userId = getIdFromToken(token);
    const requestString = `${path.url}${path.users}/${userId}`;
    const response = await axios.delete(requestString, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
);

const deleteUserSLice: Slice<IDeleteUserState, EmptyObject, 'delUser'> = createSlice({
  name: 'delUser',
  initialState,
  reducers: {},
  extraReducers: {
    [deleteUser.pending.type]: (state: IDeleteUserState) => {
      state.isLoading = true;
      state.error = null;
    },
    [deleteUser.fulfilled.type]: (state: IDeleteUserState) => {
      state.status = fetchStatus.succeeded;
      state.isLoading = false;
    },
    [deleteUser.rejected.type]: (state: IDeleteUserState, action) => {
      state.status = fetchStatus.failed;
      state.isLoading = false;
      state.error = action.error.message;
    },
  },
});

export const selectDeleteUserError = (state: RootState): string | null => state.delUser.error;

export default deleteUserSLice.reducer;
