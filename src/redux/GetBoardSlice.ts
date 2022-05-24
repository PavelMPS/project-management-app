import { AsyncThunk, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { EmptyObject } from 'react-hook-form';
import { fetchStatus, path } from '../constants/Constants';
import { getTokenFromLocalStorage } from './ColumnSlice';
import { RootState } from './Store';

type FilesState = {
  filename: string;
  filesize: number;
};

export type TaskState = {
  id: string;
  title: string;
  order: number;
  done: boolean;
  description: string;
  userId: string;
  files: FilesState[];
};

export type ColumnState = {
  id: string;
  title: string;
  order: number;
  tasks: TaskState[];
};

export type BoardState = {
  id: string;
  title: string;
  description?: string;
  columns: ColumnState[];
};

export type MainState = {
  idBoard: BoardState;
  status: string;
  error: string | null;
};

const initialState: MainState = {
  idBoard: { id: '', title: '', description: '', columns: [] },
  status: fetchStatus.idle,
  error: null,
};

export const getBoardById: AsyncThunk<BoardState, string, EmptyObject> = createAsyncThunk(
  'idBoard/getIdBoard',
  async (boardId: string): Promise<BoardState> => {
    console.log('get board!');
    const requestString = `${path.url}${path.bords}/${boardId}`;
    const token = getTokenFromLocalStorage();
    const response = await axios.get(requestString, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    response.data.columns
      .sort((a: ColumnState, b: ColumnState) => (a.order > b.order ? 1 : -1))
      .map((column: ColumnState) => {
        column.tasks.sort((a: TaskState, b: TaskState) => (a.order > b.order ? 1 : -1));
      });
    return response.data;
  }
);

const getBoardSlice = createSlice({
  name: 'idBoard',
  initialState,
  reducers: {
    getBoard(state: MainState, action) {
      return (state.idBoard = action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getBoardById.pending, (state: MainState) => {
        state.status = fetchStatus.loading;
        state.idBoard = { id: '', title: '', description: '', columns: [] } as BoardState;
        state.error = null;
      })
      .addCase(
        getBoardById.fulfilled,
        (
          state: MainState,
          action: PayloadAction<
            BoardState,
            string,
            {
              arg: string;
              requestId: string;
              requestStatus: 'fulfilled';
            },
            never
          >
        ) => {
          state.status = fetchStatus.succeeded;
          state.idBoard = action.payload;
        }
      )
      .addCase(getBoardById.rejected, (state: MainState, action) => {
        state.status = fetchStatus.failed;
        state.error = action.error.message!;
      });
  },
});

export default getBoardSlice.reducer;
export const { getBoard } = getBoardSlice.actions;

export const selectedIdBoard = (state: MainState): MainState => state;
export const selectedBoard = (state: RootState): BoardState => state.idBoard.idBoard;
export const selectGetBoardsError = (state: RootState): string | null => state.idBoard.error;
export const statusGetBoardId = (state: RootState): string => state.idBoard.status;
