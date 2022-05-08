import { configureStore } from '@reduxjs/toolkit';

import mainSlice from './MainSlice';
import userSlice from './userSlice';

export const store = configureStore({
  reducer: {
    main: mainSlice,
    user: userSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
