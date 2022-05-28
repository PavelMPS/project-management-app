import { createSlice } from '@reduxjs/toolkit';

import { themes } from '../constants/Constants';
import { RootState } from './Store';

const initialState: themeState = {
  theme: themes.light,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state: themeState, action) {
      state.theme = action.payload;
    },
  },
});

export default themeSlice.reducer;

export const { setTheme } = themeSlice.actions;

export const selectTheme = (state: RootState): string => state.theme.theme;
