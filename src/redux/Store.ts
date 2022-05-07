import { configureStore } from '@reduxjs/toolkit';

import mainSlice from './MainSlice';

export const store = configureStore({
  reducer: {
    main: mainSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
