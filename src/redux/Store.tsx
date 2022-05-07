import { configureStore } from '@reduxjs/toolkit';
import CreateBoardSlice from './CreateBoardSlice';

import mainSlice from './MainSlice';

export const store = configureStore({
  reducer: {
    main: mainSlice,
    createBoard: CreateBoardSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
