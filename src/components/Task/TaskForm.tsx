import { useState } from 'react';
import { FieldError, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { fetchTasks, updateTaskFetch, createTaskFetch } from '../../redux/TaskSlice';
import { getBoardById } from '../../redux/GetBoardSlice';
import { selectUsers } from '../../redux/UsersSlice';
import { fetchColumns } from '../../redux/ColumnSlice';
import { AppDispatch } from '../../redux/Store';
import { buttonName, taskFormSettings } from '../../constants/Constants';

import './taskForm.css';

const TaskForm = (props: {
  boardId: string;
  columnId: string;
  taskInf?: ITask;
  type: string;
}): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<ITask>();

  const [isValid, setIsValid] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(() => {
    if (props.taskInf) {
      return props.taskInf.title;
    } else {
      return '';
    }
  });
  const [description, setDescription] = useState<string>(() => {
    if (props.taskInf) {
      return props.taskInf.description;
    } else {
      return '';
    }
  });
  const [order, setOrder] = useState<number>(() => {
    if (props.taskInf) {
      return props.taskInf.order;
    } else {
      return 1;
    }
  });
  const [userId, setUserId] = useState<string>(() => {
    if (props.taskInf) {
      return props.taskInf.userId;
    } else {
      return '';
    }
  });

  const dispatch = useDispatch<AppDispatch>();

  const users: IUser[] = useSelector(selectUsers);

  const handleSubmite = async (data: ITask) => {
    if (props.type === 'create') {
      const task: ITask = {
        title: data.title,
        description: data.description,
        order: data.order,
        userId: data.userId,
        columnId: props.columnId,
        boardId: props.boardId,
      };
      await dispatch(createTaskFetch(task));
    } else {
      const task: ITask = {
        id: props.taskInf!.id,
        title: data.title,
        description: data.description,
        order: data.order,
        userId: data.userId,
        columnId: props.columnId,
        boardId: props.boardId,
      };
      await dispatch(updateTaskFetch(task));
    }

    await dispatch(fetchColumns(props.boardId));
    await dispatch(fetchTasks({ boardId: props.boardId, columnId: props.columnId }));
    dispatch(getBoardById(props.boardId));
    reset();
    clearErrors();
  };

  const handleError = (): void => {
    setIsValid(false);
  };

  const changeSubmitBTN = (): void => {
    setIsValid(true);
    setTimeout(() => {
      const values = Object.values(errors);
      values.forEach((value: FieldError | FieldError[]): void => {
        if (value) {
          setIsValid(false);
        } else {
          setIsValid(true);
        }
      }, 100);
    });
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit(handleSubmite, handleError)}>
        <div className="form-element-wrapper">
          <label className="form-label">
            {taskFormSettings.title}
            <br />
            <input
              className="form-input"
              value={title}
              type="text"
              {...register('title', {
                required: true,
                onChange: (e) => {
                  changeSubmitBTN();
                  setTitle(e.target.value);
                },
              })}
            />
          </label>
          {errors.title && <span className="error">{taskFormSettings.error}</span>}
        </div>

        <div className="form-element-wrapper">
          <label className="form-label">
            {taskFormSettings.description}
            <br />
            <input
              className="form-input"
              value={description}
              type="text"
              {...register('description', {
                required: true,
                onChange: (e) => {
                  changeSubmitBTN();
                  setDescription(e.target.value);
                },
              })}
            />
          </label>
          {errors.title && <span className="error">{taskFormSettings.error}</span>}
        </div>

        <div className="form-element-wrapper">
          <label className="form-label">
            {taskFormSettings.order}
            <br />
            <input
              className="form-input"
              type="number"
              defaultValue={order}
              {...register('order', {
                required: true,
                onChange: (e) => {
                  changeSubmitBTN();
                  setOrder(e.target.value);
                },
              })}
            />
          </label>
          {errors.order && <span className="error">{taskFormSettings.error}</span>}
        </div>

        <div className="form-element-wrapper">
          <label className="form-label">
            {taskFormSettings.selectUser}
            <br />
            <select
              className="form-input"
              defaultValue={userId}
              {...register('userId', { required: true })}
            >
              {users.map((user: IUser) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          {errors.userId && <span className="error">{taskFormSettings.error}</span>}
        </div>

        <button className="form-btn" type="submit" disabled={!isValid}>
          {buttonName.submit}
        </button>
      </form>
    </>
  );
};

export default TaskForm;
