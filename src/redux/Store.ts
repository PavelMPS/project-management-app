import { configureStore } from '@reduxjs/toolkit';

import createBoardSlice from './CreateBoardSlice';
import mainSlice from './MainSlice';
import boardSlice from './ColumnSlice';
import userSlice from './userSlice';
import taskSlice from './TaskSlice';
import usersSlice from './UsersSlice';
import deleteUser from './DeleteUserSlice';
import GetBoardSlice from './GetBoardSlice';
import EditProfileSlice from './EditProfileSlice';
import DragAndDropTasksSlice from './DragAndDropTasksSlice';
import DragAndDropColumnSlice from './DragAndDropColumnSlice';

export const store = configureStore({
  reducer: {
    main: mainSlice,
    user: userSlice,
    board: createBoardSlice,
    idBoard: GetBoardSlice,
    column: boardSlice,
    tasks: taskSlice,
    users: usersSlice,
    delUser: deleteUser,
    edit: EditProfileSlice,
    dragTask: DragAndDropTasksSlice,
    dragColumn: DragAndDropColumnSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
