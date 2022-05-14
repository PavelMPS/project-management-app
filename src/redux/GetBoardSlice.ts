import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchStatus, path } from '../constants/constants';

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
  columns: ColumnState[];
};

export type MainState = {
  idBoard: BoardState;
  status: string;
  error: string | null;
};

const initialState: MainState = {
  idBoard: { id: '', title: '', columns: [] },
  status: fetchStatus.idle,
  error: null,
};

export const getBoardById = createAsyncThunk(
  'idBoard/getIdBoard',
  async (boardId: string): Promise<BoardState> => {
    const requestString = `${path.url}${path.bords}/${boardId}`;
    let token = '';
    if (localStorage.getItem('token')) {
      token = localStorage.getItem('token') || '';
    }
    const response = await axios.get(requestString, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Hello');
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
        state.idBoard = { id: '', title: '', columns: [] } as BoardState;
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
  // extraReducers: {
  //   [getBoardById.pending.type]: (state: MainState) => {
  //     state.status = fetchStatus.loading;
  //     state.error = null;
  //     state.board = { id: '', title: '', columns: [] };
  //   },
  //   [getBoardById.fulfilled.type]: (state: MainState, action: PayloadAction<BoardState>) => {
  //     state.board = action.payload;
  //     state.status = fetchStatus.succeeded;
  //   },
  //   [getBoardById.rejected.type]: (state: MainState, action) => {
  //     state.error = action.error.message;
  //     state.status = fetchStatus.failed;
  //   },
  // },
});

export default getBoardSlice.reducer;
export const { getBoard } = getBoardSlice.actions;

export const selectedIdBoard = (state: MainState): MainState => state;
