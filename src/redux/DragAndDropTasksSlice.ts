import { createSlice } from '@reduxjs/toolkit';
import { TaskState } from './GetBoardSlice';

const initialState: TaskState[] | [] = [];

const dragAndDropTasksSlice = createSlice({
  name: 'dragAndDropTasks',
  initialState,
  reducers: {
    updateTasks(state, action) {
      return [...action.payload];
    },
  },
});

export default dragAndDropTasksSlice.reducer;
export const { updateTasks } = dragAndDropTasksSlice.actions;
