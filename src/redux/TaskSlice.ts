import { createSlice, createAsyncThunk, PayloadAction, AsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { EmptyObject } from 'react-hook-form';

import { fetchStatus, path } from '../constants/Constants';
import { getTokenFromLocalStorage } from './ColumnSlice';
import { RootState } from './Store';

const initialState: taskState = {
  tasks: [] as ITask[],
  statusTasks: fetchStatus.idle,
  error: null,
  task: {} as ITask,
};

export const fetchTasks: AsyncThunk<
  ITask[],
  {
    boardId: string;
    columnId: string;
  },
  EmptyObject
> = createAsyncThunk(
  'tasks/fetchTasks',
  async (id: { boardId: string; columnId: string }): Promise<ITask[]> => {
    const requestString = `${path.url}${path.bords}/${id.boardId}${path.columns}/${id.columnId}${path.tasks}`;
    const token = getTokenFromLocalStorage();
    const response: AxiosResponse<ITask[]> = await axios.get(requestString, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const deleteTaskFetch: AsyncThunk<
  void,
  {
    boardId: string;
    columnId: string;
    taskId: string;
  },
  EmptyObject
> = createAsyncThunk(
  'tasks/deleteTaskFetch',
  async (id: { boardId: string; columnId: string; taskId: string }): Promise<void> => {
    const requestString = `${path.url}${path.bords}/${id.boardId}${path.columns}/${id.columnId}${path.tasks}/${id.taskId}`;
    const token = getTokenFromLocalStorage();
    const response: AxiosResponse<ITask[]> = await axios.delete(requestString, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
);

export const fetchTask: AsyncThunk<
  ITask,
  {
    boardId: string;
    columnId: string;
    taskId: string;
  },
  EmptyObject
> = createAsyncThunk(
  'tasks/fetchTask',
  async (id: { boardId: string; columnId: string; taskId: string }): Promise<ITask> => {
    const requestString = `${path.url}${path.bords}/${id.boardId}${path.columns}/${id.columnId}${path.tasks}/${id.taskId}`;
    const token = getTokenFromLocalStorage();
    const response: AxiosResponse<ITask> = await axios.get(requestString, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const createTaskFetch: AsyncThunk<ITask, ITask, EmptyObject> = createAsyncThunk(
  'tasks/createTaskFetch',
  async (taskInf: ITask): Promise<ITask> => {
    const requestString = `${path.url}${path.bords}/${taskInf.boardId}${path.columns}/${taskInf.columnId}${path.tasks}`;
    const token = getTokenFromLocalStorage();
    const response: AxiosResponse<ITask> = await axios.post(
      requestString,
      {
        title: taskInf.title,
        order: +taskInf.order,
        description: taskInf.description,
        userId: taskInf.userId,
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

export const updateTaskFetch: AsyncThunk<ITask, ITask, EmptyObject> = createAsyncThunk(
  'tasks/updateTaskFetch',
  async (taskInf: ITask): Promise<ITask> => {
    const requestString = `${path.url}${path.bords}/${taskInf.boardId}${path.columns}/${taskInf.columnId}${path.tasks}/${taskInf.id}`;
    const token = getTokenFromLocalStorage();
    const response: AxiosResponse<ITask> = await axios.put(
      requestString,
      {
        title: taskInf.title,
        order: +taskInf.order,
        description: taskInf.description,
        userId: taskInf.userId,
        boardId: taskInf.boardId,
        columnId: taskInf.columnId,
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
        }
      )
      .addCase(fetchTask.rejected, (state: taskState, action) => {
        state.statusTasks = fetchStatus.failed;
        state.error = action.error.message!;
      })

      .addCase(createTaskFetch.pending, (state: taskState) => {
        state.statusTasks = fetchStatus.loading;
        state.error = null;
      })
      .addCase(createTaskFetch.fulfilled, (state: taskState) => {
        state.statusTasks = fetchStatus.succeeded;
      })
      .addCase(createTaskFetch.rejected, (state: taskState, action) => {
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
      })

      .addCase(deleteTaskFetch.pending, (state: taskState) => {
        state.statusTasks = fetchStatus.loading;
        state.error = null;
      })
      .addCase(deleteTaskFetch.fulfilled, (state: taskState) => {
        state.statusTasks = fetchStatus.succeeded;
      })
      .addCase(deleteTaskFetch.rejected, (state: taskState, action) => {
        state.statusTasks = fetchStatus.failed;
        state.error = action.error.message!;
      });
  },
});

export default boardSlice.reducer;

export const { closeBoardTask } = boardSlice.actions;

export const selectTasks = (state: RootState): ITask[] => state.tasks.tasks;
export const selectStatusTasks = (state: RootState): string => state.tasks.statusTasks;
