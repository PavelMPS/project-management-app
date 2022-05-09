import { useDispatch } from 'react-redux';
import { useState } from 'react';

import './TaskComponent.css';

import { deleteTaskFetch, fetchTasks, updateTaskFetch, fetchTask } from '../../redux/TaskSlice';
import { AppDispatch } from '../../redux/Store';

import { ModalWindow } from '../modal-component/Modal';

export const Task = (props: { taskInf: ITask }): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const handleModalClose = (): void => {
    setModalOpen(false);
  };

  return (
    <>
      <div className="task-container">
        <div className="task-wrapper">
          <div>{props.taskInf.order}</div>
          <div className="task-title">{props.taskInf.title}</div>
          <div
            className="task-update"
            onClick={async () => {
              await dispatch(
                fetchTask({
                  boardId: props.taskInf.boardId,
                  columnId: props.taskInf.columnId,
                  taskId: props.taskInf.id,
                })
              );
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
                  taskId: props.taskInf.id,
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
      </div>
      {isModalOpen && <ModalWindow onClick={handleModalClose}>{<p>brrrrr</p>}</ModalWindow>}
    </>
  );
};
