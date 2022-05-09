import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import './ColumnComponent.css';

import { selectBoard } from '../../redux/MainSlice';
import { deleteColumnFetch, fetchColumns } from '../../redux/ColumnSlice';
import { selectTasks, selectStatusTasks, fetchTasks } from '../../redux/TaskSlice';
import { AppDispatch } from '../../redux/Store';
import { Task } from '../task-component/TaskComponent';
import { ModalWindow } from '../modal-component/Modal';
import { ColumnForm } from '../column-form/ColumnForm';
import { TaskForm } from '../task-form/TaskForm';

export const Column = (props: { columnInf: IColumn }): JSX.Element => {
  const status = useSelector(selectStatusTasks);
  const allTasks = useSelector(selectTasks);
  const board = useSelector(selectBoard);

  const dispatch = useDispatch<AppDispatch>();

  const [tasks, setTasks] = useState<ITask[] | null>(null);
  const [isColumnModalOpen, setColumnModalOpen] = useState<boolean>(false);
  const [isTaskModalOpen, setTaskModalOpen] = useState<boolean>(false);

  useEffect((): void => {
    if (status === 'idle' && props.columnInf.id) {
      dispatch(fetchTasks({ boardId: board.id, columnId: props.columnInf.id }));
    }
    const newTasks = allTasks.filter((task: ITask) => {
      return task.columnId === props.columnInf.id;
    });
    setTasks(newTasks);
  }, [allTasks, board.id, props.columnInf.id, status]);

  const handleModalClose = (): void => {
    setColumnModalOpen(false);
    setTaskModalOpen(false);
  };

  return (
    <>
      <div className="column-container">
        <div className="column-wrapper">
          <div className="column-title">{props.columnInf.title}</div>
          <div
            className="column-update"
            onClick={async () => {
              setColumnModalOpen(true);
            }}
          ></div>
          <div
            className="task-create"
            onClick={async () => {
              setTaskModalOpen(true);
            }}
          ></div>
          <div
            className="column-bin"
            onClick={async () => {
              if (props.columnInf.id) {
                await dispatch(
                  deleteColumnFetch({ boardId: board.id, columnId: props.columnInf.id })
                );
              }
              dispatch(fetchColumns(board.id));
              //TODO добавить confirmation modal
            }}
          ></div>
        </div>
        <div className="tasks-container">
          {tasks &&
            tasks.map((task: ITask) => {
              return <Task key={task.id} taskInf={task} />;
            })}
        </div>
      </div>
      {isColumnModalOpen && (
        <ModalWindow onClick={handleModalClose}>
          {<ColumnForm boardId={board.id} columnInf={props.columnInf} type="update" />}
        </ModalWindow>
      )}
      {isTaskModalOpen && props.columnInf.id && (
        <ModalWindow onClick={handleModalClose}>
          {<TaskForm boardId={board.id} columnId={props.columnInf.id} type="create" />}
        </ModalWindow>
      )}
    </>
  );
};
