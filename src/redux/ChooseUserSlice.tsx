import { createSlice } from '@reduxjs/toolkit';

import { RootState } from './Store';

const initialState: choseUserState = {
  user: '',
};

const chooseUserSlice = createSlice({
  name: 'chooseUser',
  initialState,
  reducers: {
    setChoosenUser(state: choseUserState, action) {
      state.user = action.payload;
    },
  },
});

export default chooseUserSlice.reducer;

export const { setChoosenUser } = chooseUserSlice.actions;

export const selectChoosenUser = (state: RootState): string => state.chooseUser.user;
