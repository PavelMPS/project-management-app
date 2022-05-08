import { configureStore } from '@reduxjs/toolkit';
import createBoardSlice from './CreateBoardSlice';

import mainSlice from './MainSlice';
import userSlice from './userSlice';

export const store = configureStore({
  reducer: {
    main: mainSlice,
    user: userSlice,
    board: createBoardSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
