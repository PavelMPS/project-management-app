import { AsyncThunk, createAsyncThunk, createSlice, Slice } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { EmptyObject } from 'react-hook-form';
import { path } from '../constants/Constants';
import { getTokenFromLocalStorage } from './ColumnSlice';
import { RootState } from './Store';

const initialState: IUpdateBoardState = {
  title: '',
  description: '',
  isLoading: false,
  error: '',
};

export const updateBoard: AsyncThunk<
  IBoard,
  { title: string; description: string; boardId: string },
  EmptyObject
> = createAsyncThunk(
  'board/updateBoard',
  async (arg: { title: string; description: string; boardId: string }): Promise<IBoard> => {
    const token = getTokenFromLocalStorage();
    const response: AxiosResponse<IBoard> = await axios.put(
      `${path.url}${path.bords}/${arg.boardId}`,
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

export const updateBoardSlice: Slice<IUpdateBoardState, EmptyObject, 'createBoard'> = createSlice({
  name: 'createBoard',
  initialState,
  reducers: {},
  extraReducers: {
    [updateBoard.fulfilled.type]: (state: ICreateBoardState) => {
      state.isLoading = false;
      state.error = '';
    },
    [updateBoard.pending.type]: (state: ICreateBoardState) => {
      state.isLoading = true;
    },
    [updateBoard.rejected.type]: (state: ICreateBoardState, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
  },
});

export const boardCreateError = (state: RootState): string => state.board.error;

export default updateBoardSlice.reducer;
export const boardUpdateErr = (state: RootState): string => state.updateBoard.error;
