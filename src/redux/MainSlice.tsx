import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';

import { fetchStatus } from '../constants/Constants';
import { RootState } from './Store';

const initialState: mainState = {
  boards: {} as IBoard,
  status: fetchStatus.idle,
  error: null,
};

export const fetchBoards = createAsyncThunk('cards/fetchBoards', async (): Promise<IBoard> => {
  const requestString = `http://localhost:4000/boards`;
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkNTkxZTAwMi00MWI3LTQxOTktYjFjYS1lNDJjZGU5MDc1NzciLCJsb2dpbiI6InVzZXIwMDEiLCJpYXQiOjE2NTE5MjIxNDZ9.1LXR69B8PbWSItovlTONLqhRWVNx0ZLBcDiV9YBZcDM';
  const response: AxiosResponse<IBoard> = await axios.get(requestString, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchBoards.pending, (state: mainState) => {
        state.status = fetchStatus.loading;
        state.boards = {} as IBoard;
      })
      .addCase(
        fetchBoards.fulfilled,
        (
          state: mainState,
          action: PayloadAction<
            IBoard,
            string,
            {
              arg: void;
              requestId: string;
              requestStatus: 'fulfilled';
            },
            never
          >
        ) => {
          state.status = fetchStatus.succeeded;
          state.boards = action.payload;
        }
      )
      .addCase(fetchBoards.rejected, (state: mainState, action) => {
        state.status = fetchStatus.failed;
        state.error = action.error.message!;
      });
  },
});

export default mainSlice.reducer;

export const selectBoards = (state: RootState): IBoard => state.main.boards;
export const selectBoardsFetchStatus = (state: RootState): string => state.main.status;
