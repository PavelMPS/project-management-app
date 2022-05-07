import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';

import { fetchStatus } from '../constants/Constants';
import { RootState } from './Store';

const initialState: mainState = {
  boards: [] as IBoard[],
  status: fetchStatus.idle,
  error: null,
  openBoard: {} as IBoard,
};

export const fetchBoards = createAsyncThunk('main/fetchBoards', async (): Promise<IBoard> => {
  const requestString = `https://immense-coast-63189.herokuapp.com/boards`;
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkNzYzMTU3ZS1mZDVlLTRkZDAtOTE2Yy02NTM0ZGM3N2EwNDkiLCJsb2dpbiI6InVzZXIwMDExIiwiaWF0IjoxNjUxOTMzMTg1fQ.SRGwKRF-OjmHBkGc35GsIIJvY4udRCol03RS9HmO6yY';
  const response: AxiosResponse<IBoard> = await axios.get(requestString, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

export const deleteBoardFetch = createAsyncThunk(
  'main/deleteBoardFetch',
  async (boardId: string) => {
    const requestString = `https://immense-coast-63189.herokuapp.com/boards/${boardId}`;
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkNzYzMTU3ZS1mZDVlLTRkZDAtOTE2Yy02NTM0ZGM3N2EwNDkiLCJsb2dpbiI6InVzZXIwMDExIiwiaWF0IjoxNjUxOTMzMTg1fQ.SRGwKRF-OjmHBkGc35GsIIJvY4udRCol03RS9HmO6yY';
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
    deleteBoard(
      state: mainState,
      action: {
        payload: string;
        type: string;
      }
    ) {
      const board = state.boards.find((board: IBoard) => board.id === action.payload);
      const boardIndex = state.boards.indexOf(board);
      if (boardIndex !== -1) {
        state.boards.splice(boardIndex, 1);
      }
    },
    openBoard(
      state: mainState,
      action: {
        payload: IBoard;
        type: string;
      }
    ) {
      state.openBoard = action.payload;
      console.log(state.openBoard);
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
export const selectBoard = (state: RootState): IBoard => state.main.openBoard;
export const selectBoardsFetchStatus = (state: RootState): string => state.main.status;
export const selectBoardsError = (state: RootState): string | null => state.main.error;
