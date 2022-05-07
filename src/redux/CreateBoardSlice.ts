import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

type CreateBoardState = {
  title: string;
  isClosed: boolean;
  isLoading: boolean;
  error: string;
};

const path = 'https://immense-coast-63189.herokuapp.com/';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkNTkxZTAwMi00MWI3LTQxOTktYjFjYS1lNDJjZGU5MDc1NzciLCJsb2dpbiI6InVzZXIwMDEiLCJpYXQiOjE2NTE5MjIxNDZ9.1LXR69B8PbWSItovlTONLqhRWVNx0ZLBcDiV9YBZcDM';

const initialState: CreateBoardState = {
  title: '',
  isClosed: false,
  isLoading: false,
  error: '',
};

const createBoard = createAsyncThunk('boards/createBoard', async (title, thunkAPI) => {
  try {
    await axios.post(path, {
      headers: {
        Authorization: `Bearer ${token}`,
        Body: {
          title: title,
        },
      },
    });
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});

const CreateBoardSlice = createSlice({
  name: 'createBoard',
  initialState,
  reducers: {},
  extraReducers: {
    [createBoard.fulfilled.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.title = action.payload;
      state.error = '';
    },
    [createBoard.pending.type]: (state) => {
      state.isLoading = true;
    },
    [createBoard.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default CreateBoardSlice.reducer;
