import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';

import { fetchStatus, path } from '../constants/Constants';
import { RootState } from './Store';

const initialState: taskState = {
  tasks: [] as ITask[],
  statusTasks: fetchStatus.idle,
  error: null,
  task: {} as ITask,
};

export const fetchTasks = createAsyncThunk(
  'main/fetchTasks',
  async (id: { boardId: string; columnId: string }): Promise<ITask[]> => {
    const requestString = `${path.url}${path.bords}/${id.boardId}${path.columns}/${id.columnId}${path.tasks}`;
    let token = '';
    if (localStorage.getItem('token')) {
      token = localStorage.getItem('token') || '';
    }
    const response: AxiosResponse<ITask[]> = await axios.get(requestString, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const deleteTaskFetch = createAsyncThunk(
  'main/deleteTaskFetch',
  async (id: { boardId: string; columnId: string; taskId: string }): Promise<void> => {
    const requestString = `${path.url}${path.bords}/${id.boardId}${path.columns}/${id.columnId}${path.tasks}/${id.taskId}`;
    let token = '';
    if (localStorage.getItem('token')) {
      token = localStorage.getItem('token') || '';
    }
    const response: AxiosResponse<ITask[]> = await axios.delete(requestString, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
);

export const fetchTask = createAsyncThunk(
  'main/fetchTask',
  async (id: { boardId: string; columnId: string; taskId: string }): Promise<ITask> => {
    const requestString = `${path.url}${path.bords}/${id.boardId}${path.columns}/${id.columnId}${path.tasks}/${id.taskId}`;
    let token = '';
    if (localStorage.getItem('token')) {
      token = localStorage.getItem('token') || '';
    }
    const response: AxiosResponse<ITask> = await axios.get(requestString, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const updateTaskFetch = createAsyncThunk(
  'main/updateTaskFetch',
  async (id: { boardId: string; columnId: string; taskId: string }): Promise<ITask> => {
    const requestString = `${path.url}${path.bords}/${id.boardId}${path.columns}/${id.columnId}${path.tasks}/${id.taskId}`;
    let token = '';
    if (localStorage.getItem('token')) {
      token = localStorage.getItem('token') || '';
    }
    const response: AxiosResponse<ITask> = await axios.put(
      requestString,
      {
        title: 'Task: pet the cat',
        order: 9,
        description: 'Domestic cat needs to be stroked gently',
        userId: '1a330885-3f22-4b17-8ee5-93a2a1546055',
        boardId: 'c43928c3-5d78-4db0-8417-2af54e22f322',
        columnId: 'dd7966b5-0eaf-49d5-86da-e2acab85691e',
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

const boardSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    closeBoardTask(state: taskState) {
      state.tasks = [] as ITask[];
      state.statusTasks = fetchStatus.idle;
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTasks.pending, (state: taskState) => {
        state.statusTasks = fetchStatus.loading;
        state.tasks = [] as ITask[];
        state.error = null;
      })
      .addCase(
        fetchTasks.fulfilled,
        (
          state: taskState,
          action: PayloadAction<
            ITask[],
            string,
            {
              arg: { boardId: string; columnId: string };
              requestId: string;
              requestStatus: 'fulfilled';
            },
            never
          >
        ) => {
          state.statusTasks = fetchStatus.succeeded;
          const newTasks = state.tasks.concat(action.payload);
          state.tasks = newTasks;
        }
      )
      .addCase(fetchTasks.rejected, (state: taskState, action) => {
        state.statusTasks = fetchStatus.failed;
        state.error = action.error.message!;
      })
      .addCase(fetchTask.pending, (state: taskState) => {
        state.statusTasks = fetchStatus.loading;
        state.task = {} as ITask;
        state.error = null;
      })
      .addCase(
        fetchTask.fulfilled,
        (
          state: taskState,
          action: PayloadAction<
            ITask,
            string,
            {
              arg: { boardId: string; columnId: string; taskId: string };
              requestId: string;
              requestStatus: 'fulfilled';
            },
            never
          >
        ) => {
          state.statusTasks = fetchStatus.succeeded;
          state.task = action.payload;
          console.log(action.payload);
        }
      )
      .addCase(fetchTask.rejected, (state: taskState, action) => {
        state.statusTasks = fetchStatus.failed;
        state.error = action.error.message!;
      })
      .addCase(updateTaskFetch.pending, (state: taskState) => {
        state.statusTasks = fetchStatus.loading;
        state.error = null;
      })
      .addCase(updateTaskFetch.fulfilled, (state: taskState) => {
        state.statusTasks = fetchStatus.succeeded;
      })
      .addCase(updateTaskFetch.rejected, (state: taskState, action) => {
        state.statusTasks = fetchStatus.failed;
        state.error = action.error.message!;
      });
  },
});

export default boardSlice.reducer;

export const { closeBoardTask } = boardSlice.actions;

export const selectTasks = (state: RootState): ITask[] => state.tasks.tasks;
export const selectStatusTasks = (state: RootState): string => state.tasks.statusTasks;
