import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import Confirmation from '../Confirmation/Confirmation';
import { selectBoard } from '../../redux/MainSlice';
import { deleteTaskFetch } from '../../redux/TaskSlice';
import { deleteColumnFetch, updateColumnFetch, selectColumnsError } from '../../redux/ColumnSlice';
import { AppDispatch } from '../../redux/Store';
import Task from '../Task/Task';
import ModalWindow from '../ModalWindow/ModalWindow';
import ColumnForm from './ColumnForm';
import TaskForm from '../Task/TaskForm';
import { ColumnState, getBoardById, TaskState } from '../../redux/GetBoardSlice';
import { formType, buttonName } from '../../constants/Constants';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import './column.css';

const Column = (props: { columnInf: ColumnState; index: number }): JSX.Element => {
  const board: IBoard = useSelector(selectBoard);
  const columnError: string | null = useSelector(selectColumnsError);

  const dispatch = useDispatch<AppDispatch>();

  const [title, setTitle] = useState<string>('');
  const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);
  const [isTitleUpdate, setIsTitleUpdate] = useState<boolean>(false);
  const [isColumnModalOpen, setColumnModalOpen] = useState<boolean>(false);
  const [isTaskModalOpen, setTaskModalOpen] = useState<boolean>(false);
  useEffect(() => {
    console.log(props.columnInf.tasks);
  }, []);

  const handleModalClose = (): void => {
    setColumnModalOpen(false);
    setTaskModalOpen(false);
  };

  const confirmationSubmit = async (): Promise<void> => {
    if (props.columnInf.id) {
      props.columnInf.tasks.forEach((task: ITask) => {
        dispatch(
          deleteTaskFetch({ boardId: board.id, columnId: props.columnInf.id, taskId: task.id! })
        );
      });
      await dispatch(deleteColumnFetch({ boardId: board.id, columnId: props.columnInf.id }));
    }
    if (!columnError) {
      dispatch(getBoardById(board.id));
    }
  };

  const updateTitle = async (): Promise<void> => {
    if (props.columnInf.id) {
      await dispatch(
        updateColumnFetch({
          boardId: board.id,
          columnId: props.columnInf.id,
          column: { title: title, order: props.columnInf.order },
        })
      );
    }
    setIsTitleUpdate(false);
    if (!columnError) {
      dispatch(getBoardById(board.id));
    }
  };

  return (
    <>
      <Draggable draggableId={props.columnInf.id} index={props.index}>
        {(provided) => (
          <div className="column-container" {...provided.draggableProps} ref={provided.innerRef}>
            <div className="column-wrapper">
              {!isTitleUpdate && (
                <>
                  <div
                    {...provided.dragHandleProps}
                    className="column-title"
                    onClick={() => setIsTitleUpdate(true)}
                  >
                    {props.columnInf.title}
                  </div>
                  <div className="column-bin" onClick={() => setIsConfirmationOpen(true)}></div>
                </>
              )}
              {isTitleUpdate && (
                <>
                  <input
                    className="update-title-input"
                    type="text"
                    defaultValue={props.columnInf.title}
                    onChange={(event) => setTitle(event.target.value)}
                  ></input>
                  <div className="update-title-btn" onClick={updateTitle}></div>
                  <div className="close-title-btn" onClick={() => setIsTitleUpdate(false)}></div>
                </>
              )}
            </div>
            <Droppable droppableId={props.columnInf.id} direction="vertical" type="task">
              {(provided) => (
                <div
                  className="tasks-container"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {props.columnInf.tasks &&
                    props.columnInf.tasks.map((task: TaskState, index: number) => {
                      return (
                        <Task
                          key={task.id}
                          taskInf={task}
                          columnId={props.columnInf.id}
                          index={index}
                        />
                      );
                    })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            <div className="task-create-btn" onClick={async () => setTaskModalOpen(true)}>
              <div className="task-create"></div>
              <div>{buttonName.addTask}</div>
            </div>
          </div>
        )}
      </Draggable>

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
