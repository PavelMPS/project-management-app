import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';

type CreateBoardState = {
  title: string;
  isLoading: boolean;
  error: string;
};

const initialState: CreateBoardState = {
  title: '',
  isLoading: false,
  error: '',
};

export const createBoard = createAsyncThunk(
  'board/createBoard',
  async (title: string): Promise<IBoard> => {
    const path = `https://immense-coast-63189.herokuapp.com/boards`;
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3YTk5MWMxMi04NDlhLTRhNDUtYTk3ZC0wYTFiNmEyOWY4YmUiLCJsb2dpbiI6InVzZXIwMDkiLCJpYXQiOjE2NTE5NDk5Njl9.IEHFoFZ3O9SpdgjDAROiSmcGax8GVnVGkQzsbqJoL8A';
    const response: AxiosResponse<IBoard> = await axios.post(
      path,
      {
        title: title,
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

export const createBoardSlice = createSlice({
  name: 'createBoard',
  initialState,
  reducers: {},
  extraReducers: {
    [createBoard.fulfilled.type]: (state: CreateBoardState, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.title = action.payload;
      state.error = '';
    },
    [createBoard.pending.type]: (state: CreateBoardState) => {
      state.isLoading = true;
    },
    [createBoard.rejected.type]: (state: CreateBoardState, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default createBoardSlice.reducer;
export const store = (state: CreateBoardState): CreateBoardState => state;
export const boardCreateErr = (state: CreateBoardState): string => state.error;
