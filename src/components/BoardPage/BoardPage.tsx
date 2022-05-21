import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import ModalWindow from '../ModalWindow/ModalWindow';
import ColumnForm from '../Column/ColumnForm';
import {
  selectStatusColumn,
  closeBoardColumn,
  updateColumnFetch,
  fetchColumn,
} from '../../redux/ColumnSlice';
import {
  closeBoardTask,
  createTaskFetch,
  deleteTaskFetch,
  fetchTask,
  selectStatusTasks,
  updateTaskFetch,
} from '../../redux/TaskSlice';
import { selectBoard } from '../../redux/MainSlice';
import { AppDispatch } from '../../redux/Store';
import { fetchUsers, selectUsersStatus } from '../../redux/UsersSlice';
import Column from '../Column/Column';
import { ColumnState, getBoardById } from '../../redux/GetBoardSlice';
import { useAppSelector } from '../../redux/hooks/redux';
import { buttonName, fetchStatus, pageName, formType } from '../../constants/Constants';
import { Loader } from '../Loader/Loader';
import { DragDropContext, DraggableLocation, Droppable, DropResult } from 'react-beautiful-dnd';

import './boardPage.css';

const BoardPage = (): JSX.Element => {
  const { t } = useTranslation();
  const board = useSelector(selectBoard);
  const statusColumn = useSelector(selectStatusColumn);
  const statusTasks = useSelector(selectStatusTasks);
  const statusUsers = useSelector(selectUsersStatus);
  const { idBoard } = useAppSelector((store) => store.idBoard);
  const state = useAppSelector((store) => store);
  const [dragState, updateDragState] = useState(idBoard.columns);

  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect((): void => {
    updateDragState(idBoard.columns);
    console.log('state', state.idBoard.idBoard.columns);
    if (statusUsers === fetchStatus.idle) {
      dispatch(fetchUsers());
    }
  }, [statusUsers, idBoard.columns, dispatch]);

  const handleModalClose = (): void => {
    setModalOpen(false);
  };

  const boardCloseHadler = (): void => {
    dispatch(closeBoardColumn());
    dispatch(closeBoardTask());
  };

  const reorderColumns = async (
    source: DraggableLocation,
    destination: DraggableLocation
  ): Promise<void> => {
    const items = Array.from(dragState);
    const [reorderedItem] = items.splice(source.index, 1);
    items.splice(destination.index, 0, reorderedItem);
    updateDragState(items);
    // await dispatch(
    //   updateColumnFetch({
    //     boardId: board.id,
    //     columnId: idBoard.columns[source.index].id,
    //     column: { title: idBoard.columns[source.index].title, order: idBoard.columns.length + 1 },
    //   })
    // );
    // await dispatch(
    //   updateColumnFetch({
    //     boardId: board.id,
    //     columnId: idBoard.columns[destination.index].id,
    //     column: {
    //       title: idBoard.columns[destination.index].title,
    //       order: idBoard.columns[source.index].order,
    //     },
    //   })
    // );
    // await dispatch(
    //   updateColumnFetch({
    //     boardId: board.id,
    //     columnId: idBoard.columns[source.index].id,
    //     column: {
    //       title: idBoard.columns[source.index].title,
    //       order: idBoard.columns[destination.index].order,
    //     },
    //   })
    // );
  };

  const reorderTasks = async (
    source: DraggableLocation,
    destination: DraggableLocation,
    result: DropResult
  ): Promise<void> => {
    if (source.droppableId !== destination.droppableId) {
      //drag to another column
      console.log('outside');
      const columnSource = idBoard.columns.find((column) => column.id === source.droppableId);
      const columnDestination = idBoard.columns.find(
        (column) => column.id === destination.droppableId
      );
      const taskDrag = columnSource!.tasks[source.index];
      // const [sourceTasks] = columnSource!.tasks.splice(source.index, 1);
      // console.log(sourceTasks);
      const taskinfDrag = {
        id: taskDrag.id,
        title: taskDrag.title,
        // order: columnDestination!.tasks.length + 1,
        order: destination.index + 1,
        description: taskDrag.description,
        userId: taskDrag.userId,
        boardId: board.id,
        columnId: columnDestination?.id,
      };
      //delete drag task
      await dispatch(
        deleteTaskFetch({
          boardId: board.id,
          columnId: source.droppableId,
          taskId: result.draggableId,
        })
      );
      await dispatch(createTaskFetch(taskinfDrag));
    }
    if (source.droppableId === destination.droppableId) {
      //Drag to the same column
      console.log('inside');
      const column = idBoard.columns.find((column) => column.id === destination.droppableId);
      if (column) {
        const newTasks = Array.from(column.tasks);
        const [reorderedTask] = newTasks.splice(source.index, 1);
        newTasks.splice(destination.index, 0, reorderedTask);
        const newColumn = {
          ...column,
          tasks: newTasks,
        };
        const newState = dragState.map((column) => {
          if (column.id === destination.droppableId) {
            return { ...newColumn };
          } else {
            return column;
          }
        });
        updateDragState(newState);
        const taskDrag = column.tasks[source.index];
        const taskDrop = column.tasks[destination.index];
        const taskInfDrag = {
          id: taskDrag.id,
          title: taskDrag.title,
          order: taskDrop.order,
          description: taskDrag.description,
          userId: taskDrag.userId,
          boardId: board.id,
          columnId: column.id,
        };
        const taskInfDrop = {
          id: taskDrop.id,
          title: taskDrop.title,
          order: taskDrag.order,
          description: taskDrop.description,
          userId: taskDrop.userId,
          boardId: board.id,
          columnId: column.id,
        };
        await dispatch(updateTaskFetch(taskInfDrag));
        await dispatch(updateTaskFetch(taskInfDrop));
      }
    }
  };

  const onDragEnd = async (result: DropResult): Promise<void> => {
    const { source, destination, type } = result;
    console.log(result);
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    if (type === 'column') {
      await reorderColumns(source, destination);
    } else {
      await reorderTasks(source, destination, result);
    }

    await dispatch(getBoardById(board.id));
  };

  return (
    <>
      <div className="board-container">
        <div className="board-title-container">
          <h1>{board.title}</h1>
          <Link to="/main">
            <div className="board-close" onClick={boardCloseHadler}>
              {t('board.close')}
            </div>
          </Link>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="all-columns" direction="horizontal" type="column">
            {(provided) => (
              <div
                className="columns-container"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {dragState.map((column: ColumnState, index: number) => {
                  return <Column key={column.id} columnInf={column} index={index} />;
                })}
                <div
                  className="board-add-column"
                  onClick={() => {
                    setModalOpen(true);
                  }}
                >
                  <div className="board-add-column-icon"></div>
                  <div>{t('board.addColumn')}</div>
                </div>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      {!board.id && <Navigate to={'/main'} />}
      {isModalOpen && (
        <ModalWindow onClick={handleModalClose}>
          {<ColumnForm boardId={board.id} type={formType.create} />}
        </ModalWindow>
      )}
      {(statusColumn === fetchStatus.loading || statusTasks === fetchStatus.loading) && <Loader />}
    </>
  );
};

export default BoardPage;
