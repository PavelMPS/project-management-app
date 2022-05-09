import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import './TaskComponent.css';

import { deleteTaskFetch, fetchTasks } from '../../redux/TaskSlice';
import { selectUsers, fetchUsers } from '../../redux/UsersSlice';
import { AppDispatch } from '../../redux/Store';

import { ModalWindow } from '../modal-component/Modal';
import { TaskForm } from '../task-form/TaskForm';

export const Task = (props: { taskInf: ITask }): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  const users: IUser[] = useSelector(selectUsers);

  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [user, setUser] = useState<string>('');

  const handleModalClose = (): void => {
    setModalOpen(false);
  };

  useEffect(() => {
    const user: IUser = users.find((user: IUser) => user.id === props.taskInf.userId) as IUser;
    const userIndex = users.indexOf(user);
    if (userIndex !== -1) {
      setUser(users[userIndex].name);
    }
  }, []);

  return (
    <>
      <div className="task-container">
        <div className="task-wrapper">
          <div>{props.taskInf.order}</div>
          <div className="task-title">{props.taskInf.title}</div>
          <div
            className="task-update"
            onClick={async () => {
              setModalOpen(true);
            }}
          ></div>
          <div
            className="task-bin"
            onClick={async () => {
              await dispatch(
                deleteTaskFetch({
                  boardId: props.taskInf.boardId,
                  columnId: props.taskInf.columnId,
                  taskId: props.taskInf.id!,
                })
              );
              dispatch(
                fetchTasks({ boardId: props.taskInf.boardId, columnId: props.taskInf.columnId })
              );
              //TODO добавить confirmation modal
            }}
          ></div>
        </div>
        <div>{props.taskInf.description}</div>
        <div>{user}</div>
      </div>
      {isModalOpen && (
        <ModalWindow onClick={handleModalClose}>
          {
            <TaskForm
              boardId={props.taskInf.boardId}
              columnId={props.taskInf.columnId}
              taskInf={props.taskInf}
              type="update"
            />
          }
        </ModalWindow>
      )}
    </>
  );
};
