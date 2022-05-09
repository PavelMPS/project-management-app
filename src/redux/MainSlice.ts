import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';

import { fetchStatus, path } from '../constants/Constants';
import { RootState } from './Store';

const initialState: mainState = {
  boards: [] as IBoard[],
  status: fetchStatus.idle,
  error: null,
  openBoard: {} as IBoard,
};

export const fetchBoards = createAsyncThunk('main/fetchBoards', async (): Promise<IBoard[]> => {
  const requestString = `${path.url}${path.bords}`;
  let token = '';
  if (localStorage.getItem('token')) {
    token = localStorage.getItem('token') || '';
  }
  const response: AxiosResponse<IBoard[]> = await axios.get(requestString, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

export const deleteBoardFetch = createAsyncThunk(
  'main/deleteBoardFetch',
  async (boardId: string) => {
    const requestString = `${path.url}${path.bords}/${boardId}`;
    let token = '';
    if (localStorage.getItem('token')) {
      token = localStorage.getItem('token') || '';
    }
    const response = await axios.delete(requestString, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
);

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    openBoard(
      state: mainState,
      action: {
        payload: IBoard;
        type: string;
      }
    ) {
      state.openBoard = action.payload;
    },
    deleteBoard(
      state: mainState,
      action: {
        payload: string;
        type: string;
      }
    ) {
      const board: IBoard = state.boards.find(
        (board: IBoard) => board.id === action.payload
      ) as IBoard;
      const boardIndex = state.boards.indexOf(board);
      if (boardIndex !== -1) {
        state.boards.splice(boardIndex, 1);
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBoards.pending, (state: mainState) => {
        state.status = fetchStatus.loading;
        state.boards = [] as IBoard[];
        state.error = null;
      })
      .addCase(
        fetchBoards.fulfilled,
        (
          state: mainState,
          action: PayloadAction<
            IBoard[],
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
      })
      .addCase(deleteBoardFetch.pending, (state: mainState) => {
        state.status = fetchStatus.loading;
        state.error = null;
      })
      .addCase(deleteBoardFetch.fulfilled, (state: mainState) => {
        state.status = fetchStatus.succeeded;
      })
      .addCase(deleteBoardFetch.rejected, (state: mainState, action) => {
        state.status = fetchStatus.failed;
        state.error = action.error.message!;
      });
  },
});

export default mainSlice.reducer;

export const { deleteBoard, openBoard } = mainSlice.actions;

export const selectBoards = (state: RootState): IBoard[] => state.main.boards;
export const selectBoardsFetchStatus = (state: RootState): string => state.main.status;
export const selectBoardsError = (state: RootState): string | null => state.main.error;
export const selectBoard = (state: RootState): IBoard => state.main.openBoard;
