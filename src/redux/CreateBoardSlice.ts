import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

type CreateBoardState = {
  title: string;
  isLoading: boolean;
  error: string;
};

const path = 'https://immense-coast-63189.herokuapp.com/boards';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3YTk5MWMxMi04NDlhLTRhNDUtYTk3ZC0wYTFiNmEyOWY4YmUiLCJsb2dpbiI6InVzZXIwMDkiLCJpYXQiOjE2NTE5NDk5Njl9.IEHFoFZ3O9SpdgjDAROiSmcGax8GVnVGkQzsbqJoL8A';

const initialState: CreateBoardState = {
  title: '',
  isLoading: false,
  error: '',
};

export const createBoard = createAsyncThunk(
  'boards/createBoard',
  async (boardTitle: string, thunkAPI) => {
    try {
      await axios.post(path, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: {
          title: boardTitle,
        },
      });
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
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
      console.log('Action payload: ' + action.payload);
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
