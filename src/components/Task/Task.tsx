import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import { deleteTaskFetch } from '../../redux/TaskSlice';
import { selectUsers } from '../../redux/UsersSlice';
import { AppDispatch } from '../../redux/Store';
import { ModalWindow } from '../ModalWindow/ModalWindow';
import { TaskForm } from './TaskForm';
import { getBoardById, TaskState } from '../../redux/GetBoardSlice';
import { useAppSelector } from '../../redux/hooks/redux';

import './task.css';

export const Task = (props: { taskInf: TaskState; columnId: string }): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  const users: IUser[] = useSelector(selectUsers);
  const { idBoard } = useAppSelector((state) => state.idBoard);

  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [user, setUser] = useState<string>('');

  const handleModalClose = (): void => {
    setModalOpen(false);
  };

  useEffect((): void => {
    const user: IUser = users.find((user: IUser) => user.id === props.taskInf.userId) as IUser;
    const userIndex = users.indexOf(user);
    if (userIndex !== -1) {
      setUser(users[userIndex].name);
    }
  }, [props.taskInf.userId, users]);

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
                  boardId: idBoard.id,
                  columnId: props.columnId,
                  taskId: props.taskInf.id!,
                })
              );
              dispatch(getBoardById(idBoard.id));
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
              boardId={idBoard.id}
              columnId={props.columnId}
              taskInf={props.taskInf}
              type="update"
            />
          }
        </ModalWindow>
      )}
    </>
  );
};
