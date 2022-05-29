import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { updateTaskFetch, createTaskFetch } from '../../redux/TaskSlice';
import { getBoardById } from '../../redux/GetBoardSlice';
import { selectUsers } from '../../redux/UsersSlice';
import { AppDispatch } from '../../redux/Store';
import Confirmation from '../Confirmation/Confirmation';
import { formType } from '../../constants/Constants';

const TaskForm = (props: {
  boardId: string;
  columnId: string;
  taskInf?: ITask;
  type: string;
}): JSX.Element => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<ITask>();

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

  const [userId, setUserId] = useState<string>(() => {
    if (props.taskInf) {
      return props.taskInf.userId;
    } else {
      return '';
    }
  });

  const [taskInf, setTaskInf] = useState<ITask>({} as ITask);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  const users: IUser[] = useSelector(selectUsers);

  const handleSubmite = async (data: ITask) => {
    const taskInf: ITask = {
      title: data.title,
      description: data.description,
      userId: data.userId,
    };
    setTaskInf(taskInf);
    setIsConfirmationOpen(true);
    reset();
    clearErrors();
  };

  const confirmationSubmit = async (): Promise<void> => {
    if (props.type === formType.create) {
      const task: ITask = {
        title: taskInf.title,
        description: taskInf.description,
        userId: taskInf.userId,
        columnId: props.columnId,
        boardId: props.boardId,
      };
      await dispatch(createTaskFetch(task));
    } else {
      const task: ITask = {
        id: props.taskInf!.id,
        title: title,
        order: props.taskInf!.order,
        description: description,
        userId: userId,
        columnId: props.columnId,
        boardId: props.boardId,
      };
      await dispatch(updateTaskFetch(task));
    }
    dispatch(getBoardById(props.boardId));
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit(handleSubmite)}>
        <div className="form-element-wrapper">
          <label className="form-label">
            {t('task.title')}
            <br />
            <input
              className="form-input"
              placeholder={t('task.placeholder.title')}
              value={title}
              type="text"
              {...register('title', {
                required: true,
                onChange: (e) => {
                  setTitle(e.target.value);
                },
              })}
            />
            {errors.title && <p className="error">{t('task.error.title')}</p>}
          </label>
        </div>

        <div className="form-element-wrapper">
          <label className="form-label">
            {t('task.description')}
            <br />
            <input
              className="form-input"
              placeholder={t('task.placeholder.description')}
              value={description}
              type="text"
              {...register('description', {
                required: true,
                onChange: (e) => {
                  setDescription(e.target.value);
                },
              })}
            />
            {errors.description && <p className="error">{t('task.error.description')}</p>}
          </label>
        </div>

        <div className="form-element-wrapper">
          <label className="form-label">
            {t('task.selectUser')}
            <br />
            <select
              placeholder={t('task.placeholder.user')}
              className="form-input"
              value={userId}
              {...register('userId', {
                required: true,
                onChange: (e) => {
                  setUserId(e.target.value);
                },
              })}
            >
              {users.map((user: IUser) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            {errors.userId && <p className="error">{t('task.error.user')}</p>}
          </label>
        </div>

        <button className="btn" type="submit">
          {t('task.submit')}
        </button>
      </form>
      {isConfirmationOpen && (
        <Confirmation
          onCancel={() => setIsConfirmationOpen(false)}
          onSubmit={() => confirmationSubmit()}
        />
      )}
    </>
  );
};

export default TaskForm;
