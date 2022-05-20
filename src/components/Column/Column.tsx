import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import Confirmation from '../Confirmation/Confirmation';
import { selectBoard } from '../../redux/MainSlice';
import { deleteColumnFetch } from '../../redux/ColumnSlice';
import { AppDispatch } from '../../redux/Store';
import Task from '../Task/Task';
import ModalWindow from '../ModalWindow/ModalWindow';
import ColumnForm from './ColumnForm';
import TaskForm from '../Task/TaskForm';
import { ColumnState, getBoardById, TaskState } from '../../redux/GetBoardSlice';
import { formType } from '../../constants/Constants';

import './column.css';
import { Draggable } from 'react-beautiful-dnd';

const Column = (props: { columnInf: ColumnState }): JSX.Element => {
  const board: IBoard = useSelector(selectBoard);
  const dispatch = useDispatch<AppDispatch>();

  const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);
  const [isColumnModalOpen, setColumnModalOpen] = useState<boolean>(false);
  const [isTaskModalOpen, setTaskModalOpen] = useState<boolean>(false);
  useEffect(() => {
    console.log(props.columnInf.tasks);
  }, []);
  // const [tasks, updateTasks] = useState(props.columnInf.tasks);
  // const [taskDragState, setTaskDragState] = useState<ITask>({
  //   title: '',
  //   order: 0,
  //   description: '',
  //   userId: '',
  //   boardId: '',
  //   columnId: '',
  // });

  const handleModalClose = (): void => {
    setColumnModalOpen(false);
    setTaskModalOpen(false);
  };

  // const dragStartHandler = (e: React.DragEvent, task: TaskState): void => {
  //   setTaskDragState({
  //     id: task.id,
  //     title: task.title,
  //     order: task.order,
  //     description: task.description,
  //     userId: task.userId,
  //     boardId: board.id,
  //     columnId: props.columnInf.id,
  //   });
  // };

  // const dragEndHandler = (e: React.DragEvent<HTMLDivElement>): void => {
  //   e.preventDefault();
  //   const elem = e.target as HTMLElement;
  //   // elem.style.background = 'white';
  // };

  // const dragOverHandler = (e: React.DragEvent<HTMLDivElement>): void => {
  //   e.preventDefault();
  //   const elem = e.target as HTMLElement;
  //   //TODO change style dragging item
  // };

  // const dropHandler = async (
  //   e: React.DragEvent<HTMLDivElement>,
  //   task: TaskState
  // ): Promise<void> => {
  //   e.preventDefault();
  //   const taskInf1 = {
  //     id: task.id,
  //     title: task.title,
  //     order: taskDragState.order,
  //     description: task.description,
  //     userId: task.userId,
  //     boardId: board.id,
  //     columnId: props.columnInf.id,
  //   };
  //   const taskInf2 = {
  //     ...taskDragState,
  //     order: task.order,
  //   };
  //   await dispatch(updateTaskFetch(taskInf1));
  //   await dispatch(updateTaskFetch(taskInf2));
  // };

  const confirmationSubmit = async (): Promise<void> => {
    if (props.columnInf.id) {
      await dispatch(deleteColumnFetch({ boardId: board.id, columnId: props.columnInf.id }));
    }
    dispatch(getBoardById(board.id));
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
          <div className="column-bin" onClick={() => setIsConfirmationOpen(true)}></div>
        </div>
        <div className="tasks-container">
          {props.columnInf.tasks &&
            props.columnInf.tasks.map((task: TaskState, index: number) => {
              return (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <Task taskInf={task} columnId={props.columnInf.id} />
                    </div>
                  )}
                </Draggable>
              );
            })}
        </div>
      </div>
      {isColumnModalOpen && (
        <ModalWindow onClick={handleModalClose}>
          {<ColumnForm boardId={board.id} columnInf={props.columnInf} type={formType.update} />}
        </ModalWindow>
      )}
      {isTaskModalOpen && props.columnInf.id && (
        <ModalWindow onClick={handleModalClose}>
          {<TaskForm boardId={board.id} columnId={props.columnInf.id} type={formType.create} />}
        </ModalWindow>
      )}
      {isConfirmationOpen && (
        <Confirmation
          onCancel={() => setIsConfirmationOpen(false)}
          onSubmit={() => confirmationSubmit()}
        />
      )}
    </>
  );
};

export default Column;
