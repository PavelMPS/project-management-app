import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import jwt_decode from 'jwt-decode';
import axios, { AxiosResponse } from 'axios';
import { fetchStatus, path } from '../constants/Constants';
import { getTokenFromLocalStorage } from './ColumnSlice';

const initialState: IProfileState = {
  name: '',
  login: '',
  password: '',
  status: fetchStatus.idle,
  error: null,
};

export function getIdFromToken(token: string): string {
  const decoded: IDecodeParams = jwt_decode(token);
  return decoded.userId;
}

export const editProfile = createAsyncThunk(
  'profile/editProfile',
  async (arg: { userId: string; name: string; login: string; password: string }) => {
    const token = getTokenFromLocalStorage();
    const response: AxiosResponse<IProfileState> = await axios.put(
      `${path.url}${path.users}/${arg.userId}`,
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

const editProfileSlice = createSlice({
  name: 'editProfile',
  initialState,
  reducers: {
    editProfile(state: IProfileState, action: PayloadAction<IProfileState>) {
      return { ...state, ...action.payload };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(editProfile.pending, (state: IProfileState) => {
        state.status = fetchStatus.loading;
        state.error = null;
      })
      .addCase(editProfile.fulfilled, (state: IProfileState) => {
        state.status = fetchStatus.succeeded;
      })
      .addCase(editProfile.rejected, (state: IProfileState, action) => {
        state.status = fetchStatus.failed;
        state.error = action.error.message!;
      });
  },
});

export default editProfileSlice.reducer;

export const editProfileError = (state: IProfileState): string | null => state.error;
