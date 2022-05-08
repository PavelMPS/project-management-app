import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';

import { fetchStatus, path, token } from '../constants/Constants';
import { RootState } from './Store';

// "id": "1a330885-3f22-4b17-8ee5-93a2a1546055",

const initialState: boardState = {
  board: {} as IBoard,
  columns: [] as IColumn[],
  tasks: [] as ITask[],
  statusColumn: fetchStatus.idle,
  statusTasks: fetchStatus.idle,
  error: null,
};

export const fetchColumns = createAsyncThunk(
  'main/fetchColumns',
  async (boardId: string): Promise<IColumn[]> => {
    const requestString = `${path.url}${path.bords}/${boardId}${path.columns}`;
    const response: AxiosResponse<IColumn[]> = await axios.get(requestString, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const deleteColumnFetch = createAsyncThunk(
  'main/deleteColumnFetch',
  async (id: { boardId: string; columnId: string }): Promise<void> => {
    const requestString = `${path.url}${path.bords}/${id.boardId}${path.columns}/${id.columnId}`;
    const response: AxiosResponse<IColumn[]> = await axios.delete(requestString, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
);

export const fetchTasks = createAsyncThunk(
  'main/fetchTasks',
  async (id: { boardId: string; columnId: string }): Promise<ITask[]> => {
    const requestString = `${path.url}${path.bords}/${id.boardId}${path.columns}/${id.columnId}${path.tasks}`;
    const response: AxiosResponse<ITask[]> = await axios.get(requestString, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

const boardSlice = createSlice({
  name: 'boardPage',
  initialState,
  reducers: {
    openBoard(
      state: boardState,
      action: {
        payload: IBoard;
        type: string;
      }
    ) {
      state.board = action.payload;
      console.log(state.board);
    },
    closeBoard(state: boardState) {
      state.columns = [] as IColumn[];
      state.tasks = [] as ITask[];
      state.board = {} as IBoard;
      state.statusColumn = fetchStatus.idle;
      state.statusTasks = fetchStatus.idle;
      state.error = null;
    },
    deleteColumn(
      state: boardState,
      action: {
        payload: string;
        type: string;
      }
    ) {
      const column: IColumn = state.columns.find(
        (column: IColumn) => column.id === action.payload
      ) as IColumn;
      const columnIndex = state.columns.indexOf(column);
      if (columnIndex !== -1) {
        state.columns.splice(columnIndex, 1);
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchColumns.pending, (state: boardState) => {
        state.statusColumn = fetchStatus.loading;
        state.columns = [] as IColumn[];
        state.error = null;
      })
      .addCase(
        fetchColumns.fulfilled,
        (
          state: boardState,
          action: PayloadAction<
            IColumn[],
            string,
            {
              arg: string;
              requestId: string;
              requestStatus: 'fulfilled';
            },
            never
          >
        ) => {
          state.statusColumn = fetchStatus.succeeded;
          state.columns = action.payload;
        }
      )
      .addCase(fetchColumns.rejected, (state: boardState, action) => {
        state.statusColumn = fetchStatus.failed;
        state.error = action.error.message!;
      })
      .addCase(fetchTasks.pending, (state: boardState) => {
        state.statusTasks = fetchStatus.loading;
        state.tasks = [] as ITask[];
        state.error = null;
        console.log('loading', state.tasks);
      })
      .addCase(
        fetchTasks.fulfilled,
        (
          state: boardState,
          action: PayloadAction<
            ITask[],
            string,
            {
              arg: { boardId: string; columnId: string };
              requestId: string;
              requestStatus: 'fulfilled';
            },
            never
          >
        ) => {
          state.statusTasks = fetchStatus.succeeded;
          const newTasks = state.tasks.concat(action.payload);
          state.tasks = newTasks;
          console.log('succeeded', state.tasks);
        }
      )
      .addCase(fetchTasks.rejected, (state: boardState, action) => {
        state.statusTasks = fetchStatus.failed;
        state.error = action.error.message!;
      })
      .addCase(deleteColumnFetch.pending, (state: boardState) => {
        state.statusColumn = fetchStatus.loading;
        state.error = null;
      })
      .addCase(deleteColumnFetch.fulfilled, (state: boardState) => {
        state.statusColumn = fetchStatus.succeeded;
      })
      .addCase(deleteColumnFetch.rejected, (state: boardState, action) => {
        state.statusColumn = fetchStatus.failed;
        state.error = action.error.message!;
      });
  },
});

export default boardSlice.reducer;

export const { openBoard, closeBoard, deleteColumn } = boardSlice.actions;

export const selectColumns = (state: RootState): IColumn[] => state.boardPage.columns;
export const selectTasks = (state: RootState): ITask[] => state.boardPage.tasks;
export const selectBoard = (state: RootState): IBoard => state.boardPage.board;
export const selectStatusColumn = (state: RootState): string => state.boardPage.statusColumn;
export const selectStatusTasks = (state: RootState): string => state.boardPage.statusTasks;
