import { createSlice, createAsyncThunk, PayloadAction, AsyncThunk, Slice } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { EmptyObject } from 'react-hook-form';

import { fetchStatus, path } from '../constants/Constants';
import { RootState } from './Store';

const initialState: columnState = {
  columns: [] as IColumn[],
  statusColumn: fetchStatus.idle,
  error: null,
  column: {} as IColumn,
};

export const getTokenFromLocalStorage = (): string => localStorage.getItem('token') || '';

export const fetchColumns: AsyncThunk<IColumn[], string, EmptyObject> = createAsyncThunk(
  'column/fetchColumns',
  async (boardId: string): Promise<IColumn[]> => {
    const requestString = `${path.url}${path.bords}/${boardId}${path.columns}`;
    const token = getTokenFromLocalStorage();
    const response: AxiosResponse<IColumn[]> = await axios.get(requestString, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const deleteColumnFetch: AsyncThunk<
  void,
  {
    boardId: string;
    columnId: string;
  },
  EmptyObject
> = createAsyncThunk(
  'column/deleteColumnFetch',
  async (id: { boardId: string; columnId: string }): Promise<void> => {
    const requestString = `${path.url}${path.bords}/${id.boardId}${path.columns}/${id.columnId}`;
    const token = getTokenFromLocalStorage();
    await axios.delete(requestString, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
);

export const fetchColumn: AsyncThunk<
  IColumn,
  {
    boardId: string;
    columnId: string;
  },
  EmptyObject
> = createAsyncThunk(
  'column/fetchColumn',
  async (id: { boardId: string; columnId: string }): Promise<IColumn> => {
    const requestString = `${path.url}${path.bords}/${id.boardId}${path.columns}/${id.columnId}`;
    const token = getTokenFromLocalStorage();
    const response: AxiosResponse<IColumn> = await axios.get(requestString, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const updateColumnFetch: AsyncThunk<
  IColumn,
  {
    boardId: string;
    columnId: string;
    column: IColumn;
  },
  EmptyObject
> = createAsyncThunk(
  'column/updateColumnFetch',
  async (inf: { boardId: string; columnId: string; column: IColumn }): Promise<IColumn> => {
    const requestString = `${path.url}${path.bords}/${inf.boardId}${path.columns}/${inf.columnId}`;
    const token = getTokenFromLocalStorage();
    const response: AxiosResponse<IColumn> = await axios.put(
      requestString,
      {
        title: inf.column.title,
        order: +inf.column.order,
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

export const createColumnFetch: AsyncThunk<
  IColumn,
  {
    boardId: string;
    column: IColumn;
  },
  EmptyObject
> = createAsyncThunk(
  'column/createColumnFetch',
  async (inf: { boardId: string; column: IColumn }): Promise<IColumn> => {
    const requestString = `${path.url}${path.bords}/${inf.boardId}${path.columns}`;
    const token = getTokenFromLocalStorage();
    const response: AxiosResponse<IColumn> = await axios.post(
      requestString,
      {
        title: inf.column.title,
        // order: +inf.column.order,
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

const boardSlice: Slice<
  columnState,
  {
    closeBoardColumn(state: columnState): void;
  },
  'column'
> = createSlice({
  name: 'column',
  initialState,
  reducers: {
    closeBoardColumn(state: columnState) {
      state.columns = [] as IColumn[];
      state.statusColumn = fetchStatus.idle;
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchColumns.pending, (state: columnState) => {
        state.statusColumn = fetchStatus.loading;
        state.columns = [] as IColumn[];
        state.error = null;
      })
      .addCase(
        fetchColumns.fulfilled,
        (
          state: columnState,
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
      .addCase(fetchColumns.rejected, (state: columnState, action) => {
        state.statusColumn = fetchStatus.failed;
        state.error = action.error.message!;
      })

      .addCase(fetchColumn.pending, (state: columnState) => {
        state.statusColumn = fetchStatus.loading;
        state.column = {} as IColumn;
        state.error = null;
      })
      .addCase(
        fetchColumn.fulfilled,
        (
          state: columnState,
          action: PayloadAction<
            IColumn,
            string,
            {
              arg: { boardId: string; columnId: string };
              requestId: string;
              requestStatus: 'fulfilled';
            },
            never
          >
        ) => {
          state.statusColumn = fetchStatus.succeeded;
          state.column = action.payload;
        }
      )
      .addCase(fetchColumn.rejected, (state: columnState, action) => {
        state.statusColumn = fetchStatus.failed;
        state.error = action.error.message!;
      })

      .addCase(createColumnFetch.pending, (state: columnState) => {
        state.statusColumn = fetchStatus.loading;
        state.error = null;
      })
      .addCase(createColumnFetch.fulfilled, (state: columnState) => {
        state.statusColumn = fetchStatus.succeeded;
      })
      .addCase(createColumnFetch.rejected, (state: columnState, action) => {
        state.statusColumn = fetchStatus.failed;
        state.error = action.error.message!;
      })

      .addCase(deleteColumnFetch.pending, (state: columnState) => {
        state.statusColumn = fetchStatus.loading;
        state.error = null;
      })
      .addCase(deleteColumnFetch.fulfilled, (state: columnState) => {
        state.statusColumn = fetchStatus.succeeded;
      })
      .addCase(deleteColumnFetch.rejected, (state: columnState, action) => {
        state.statusColumn = fetchStatus.failed;
        state.error = action.error.message!;
      })

      .addCase(updateColumnFetch.pending, (state: columnState) => {
        state.statusColumn = fetchStatus.loading;
        state.error = null;
      })
      .addCase(updateColumnFetch.fulfilled, (state: columnState) => {
        state.statusColumn = fetchStatus.succeeded;
      })
      .addCase(updateColumnFetch.rejected, (state: columnState, action) => {
        state.statusColumn = fetchStatus.failed;
        state.error = action.error.message!;
      });
  },
});

export default boardSlice.reducer;

export const { closeBoardColumn } = boardSlice.actions;

export const selectColumns = (state: RootState): IColumn[] => state.column.columns;
export const selectColumnsError = (state: RootState): string | null => state.column.error;
export const selectStatusColumn = (state: RootState): string => state.column.statusColumn;
