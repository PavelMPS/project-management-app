import { AsyncThunk, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { EmptyObject } from 'react-hook-form';
import { fetchStatus, path } from '../constants/Constants';
import { getTokenFromLocalStorage } from './ColumnSlice';

const initialState: columnState = {
  columns: [] as IColumn[],
  statusColumn: fetchStatus.idle,
  error: null,
  column: {} as IColumn,
};

export const updateColumnDrag: AsyncThunk<
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

const dragAndDropColumnsSlice = createSlice({
  name: 'dragAndDropColumn',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(updateColumnDrag.pending, (state: columnState) => {
        state.statusColumn = fetchStatus.loading;
        state.error = null;
      })
      .addCase(updateColumnDrag.rejected, (state: columnState, action) => {
        state.statusColumn = fetchStatus.failed;
        state.error = action.error.message!;
      });
  },
});

export default dragAndDropColumnsSlice.reducer;
