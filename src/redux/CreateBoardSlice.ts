import { AsyncThunk, createAsyncThunk, createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { EmptyObject } from 'react-hook-form';
import { path } from '../constants/Constants';
import { getTokenFromLocalStorage } from './ColumnSlice';
import { RootState } from './Store';

const initialState: ICreateBoardState = {
  title: '',
  isLoading: false,
  error: '',
};

export const createBoard: AsyncThunk<IBoard, { title: string; description: string }, EmptyObject> =
  createAsyncThunk(
    'board/createBoard',
    async (arg: { title: string; description: string }): Promise<IBoard> => {
      const token = getTokenFromLocalStorage();
      const response: AxiosResponse<IBoard> = await axios.post(
        path.url + path.bords,
        {
          title: arg.title,
          description: arg.description,
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

export const createBoardSlice: Slice<ICreateBoardState, EmptyObject, 'createBoard'> = createSlice({
  name: 'createBoard',
  initialState,
  reducers: {},
  extraReducers: {
    [createBoard.fulfilled.type]: (state: ICreateBoardState, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.title = action.payload;
      state.error = '';
    },
    [createBoard.pending.type]: (state: ICreateBoardState) => {
      state.isLoading = true;
    },
    [createBoard.rejected.type]: (state: ICreateBoardState, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
  },
});

export const boardCreateError = (state: RootState): string => state.board.error;

export default createBoardSlice.reducer;
export const store = (state: ICreateBoardState): ICreateBoardState => state;
export const boardCreateErr = (state: ICreateBoardState): string => state.error;
