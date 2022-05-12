import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import './ColumnComponent.css';

import { selectBoard } from '../../redux/MainSlice';
import { deleteColumnFetch, fetchColumns } from '../../redux/ColumnSlice';
import { selectTasks, selectStatusTasks, fetchTasks, updateTaskFetch } from '../../redux/TaskSlice';
import { AppDispatch } from '../../redux/Store';
import { Task } from '../task-component/TaskComponent';
import { ModalWindow } from '../modal-component/Modal';
import { ColumnForm } from '../column-form/ColumnForm';
import { TaskForm } from '../task-form/TaskForm';
import { ColumnState, getBoardById, TaskState } from '../../redux/GetBoardSlice';

export const Column = (props: { columnInf: ColumnState }): JSX.Element => {
  // const status = useSelector(selectStatusTasks);
  // const allTasks = useSelector(selectTasks);
  const board = useSelector(selectBoard);

  const dispatch = useDispatch<AppDispatch>();

  // const [tasks, setTasks] = useState<ITask[] | null>(null);
  const [isColumnModalOpen, setColumnModalOpen] = useState<boolean>(false);
  const [isTaskModalOpen, setTaskModalOpen] = useState<boolean>(false);
  const [taskDragState, setTaskDragState] = useState<ITask>({
    title: '',
    order: 0,
    description: '',
    userId: '',
    boardId: '',
    columnId: '',
  });

  // useEffect((): void => {
  //   if (status === 'idle' && props.columnInf.id) {
  //     dispatch(fetchTasks({ boardId: board.id, columnId: props.columnInf.id }));
  //   }
  //   // const newTasks = allTasks.filter((task: ITask) => {
  //   //   return task.columnId === props.columnInf.id;
  //   // });
  //   // setTasks(newTasks);
  // }, [allTasks, board.id, props.columnInf.id, status]);

  const handleModalClose = (): void => {
    setColumnModalOpen(false);
    setTaskModalOpen(false);
  };

  function dragStartHandler(e: React.DragEvent, task: TaskState) {
    setTaskDragState({
      id: task.id,
      title: task.title,
      order: task.order,
      description: task.description,
      userId: task.userId,
      boardId: board.id,
      columnId: props.columnInf.id,
    });
  }

  function dragEndHandler(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const elem = e.target as HTMLElement;
    // elem.style.background = 'white';
  }

  function dragOverHandler(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const elem = e.target as HTMLElement;
    //TODO change style dragging item
  }

  async function dropHandler(e: React.DragEvent<HTMLDivElement>, task: TaskState) {
    e.preventDefault();
    const taskInf = {
      id: task.id,
      title: task.title,
      order: taskDragState.order,
      description: task.description,
      userId: task.userId,
      boardId: board.id,
      columnId: props.columnInf.id,
    };
    const taskInf2 = {
      ...taskDragState,
      order: task.order,
    };
    console.log('First', taskInf);
    console.log('Second', taskInf2);
    await dispatch(updateTaskFetch(taskInf));
    await dispatch(updateTaskFetch(taskInf2));
  }

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
              dispatch(getBoardById(board.id));
              // dispatch(fetchColumns(board.id));
              //TODO добавить confirmation modal
            }}
          ></div>
        </div>
        <div className="tasks-container">
          {props.columnInf.tasks &&
            props.columnInf.tasks.map((task: TaskState) => {
              return (
                <div
                  key={task.id}
                  draggable={true}
                  onDragStart={(e) => dragStartHandler(e, task)}
                  onDragEnd={(e) => dragEndHandler(e)}
                  onDragLeave={(e) => dragEndHandler(e)}
                  onDragOver={(e) => dragOverHandler(e)}
                  onDrop={(e) => dropHandler(e, task)}
                >
                  <Task taskInf={task} columnId={props.columnInf.id} />
                </div>
              );
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
