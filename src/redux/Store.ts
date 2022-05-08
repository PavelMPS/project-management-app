import { configureStore } from '@reduxjs/toolkit';
import createBoardSlice from './CreateBoardSlice';

import mainSlice from './MainSlice';
import boardSlice from './BoardSlice';

export const store = configureStore({
  reducer: {
    main: mainSlice,
    board: createBoardSlice,
    boardPage: boardSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
