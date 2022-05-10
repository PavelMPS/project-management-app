import { configureStore } from '@reduxjs/toolkit';

import createBoardSlice from './CreateBoardSlice';
import mainSlice from './MainSlice';
import boardSlice from './ColumnSlice';
import userSlice from './userSlice';
import taskSlice from './TaskSlice';
import usersSlice from './UsersSlice';
import deleteUser from './DeleteUserSlice';

export const store = configureStore({
  reducer: {
    main: mainSlice,
    user: userSlice,
    board: createBoardSlice,
    column: boardSlice,
    tasks: taskSlice,
    users: usersSlice,
    delUser: deleteUser,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
