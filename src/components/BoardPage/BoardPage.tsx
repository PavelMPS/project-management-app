import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { DragDropContext, DraggableLocation, Droppable, DropResult } from 'react-beautiful-dnd';

import ModalWindow from '../ModalWindow/ModalWindow';
import ColumnForm from '../Column/ColumnForm';
import { selectStatusColumn, closeBoardColumn, updateColumnFetch } from '../../redux/ColumnSlice';
import {
  closeBoardTask,
  selectStatusTasks,
  updateTaskChangeColumn,
  updateTaskFetch,
} from '../../redux/TaskSlice';
import { selectBoard } from '../../redux/MainSlice';
import { AppDispatch } from '../../redux/Store';
import { fetchUsers, selectUsersStatus } from '../../redux/UsersSlice';
import Column from '../Column/Column';
import { ColumnState, getBoardById, statusGetBoardId, TaskState } from '../../redux/GetBoardSlice';
import { useAppSelector } from '../../redux/hooks/redux';
import { column, fetchStatus, formType } from '../../constants/Constants';
import { Loader } from '../Loader/Loader';

import './boardPage.css';

const BoardPage = (): JSX.Element => {
  const { t } = useTranslation();
  const board = useSelector(selectBoard);
  const statusColumn = useSelector(selectStatusColumn);
  const statusTasks = useSelector(selectStatusTasks);
  const statusUsers = useSelector(selectUsersStatus);
  const statusBoard = useSelector(statusGetBoardId);
  const { idBoard } = useAppSelector((store) => store.idBoard);
  // const [dragState, updateDragState] = useState<ColumnState[]>(idBoard.columns);

  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect((): void => {
    // updateDragState(idBoard.columns);
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
    // const items = Array.from(dragState);
    // const [reorderedItem] = items.splice(source.index, 1);
    // items.splice(destination.index, 0, reorderedItem);
    // updateDragState(items);
    await dispatch(
      updateColumnFetch({
        boardId: board.id,
        columnId: idBoard.columns[source.index].id,
        column: {
          title: idBoard.columns[source.index].title,
          order: idBoard.columns[destination.index].order,
        },
      })
    );
  };

  const reorderTasks = async (
    source: DraggableLocation,
    destination: DraggableLocation,
    result: DropResult
  ): Promise<void> => {
    if (source.droppableId !== destination.droppableId) {
      const columnSource = idBoard.columns.find(
        (column: ColumnState) => column.id === source.droppableId
      ) as ColumnState;
      // const columnDestination = idBoard.columns.find(
      //   (column) => column.id === destination.droppableId
      // ) as ColumnState;
      // const destinTasks: TaskState[] = Array.from(columnDestination!.tasks);
      // destinTasks.splice(destination.index, 0, columnSource.tasks[source.index]);
      const taskDrag = columnSource!.tasks[source.index];
      const taskinfDrag = {
        id: result.draggableId,
        title: taskDrag.title,
        order: destination.index + 1,
        description: taskDrag.description,
        userId: taskDrag.userId,
        boardId: board.id,
        columnId: source.droppableId,
        columnChange: destination!.droppableId,
      };
      // const sourceTaskReordered: TaskState[] = columnSource!.tasks.filter((task) => {
      //   return task.id !== result.draggableId;
      // });
      // const newColumn: ColumnState = { ...columnSource, tasks: sourceTaskReordered };
      // const newColumn2: ColumnState = { ...columnDestination, tasks: destinTasks };
      // const newState: ColumnState[] = dragState.map((column: ColumnState) => {
      //   if (column.id === source.droppableId) {
      //     return { ...newColumn };
      //   } else if (column.id === destination.droppableId) {
      //     return { ...newColumn2 };
      //   } else {
      //     return column;
      //   }
      // });
      // updateDragState(newState);
      await dispatch(updateTaskChangeColumn(taskinfDrag));
    }
    if (source.droppableId === destination.droppableId) {
      const column = idBoard.columns.find((column) => column.id === destination.droppableId);
      if (column) {
        const newTasks = Array.from(column.tasks);
        const [reorderedTask] = newTasks.splice(source.index, 1);
        newTasks.splice(destination.index, 0, reorderedTask);
        // const newColumn = {
        //   ...column,
        //   tasks: newTasks,
        // };
        // const newState = dragState.map((column) => {
        //   if (column.id === destination.droppableId) {
        //     return { ...newColumn };
        //   } else {
        //     return column;
        //   }
        // });
        // updateDragState(newState);
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
        await dispatch(updateTaskFetch(taskInfDrag));
      }
    }
  };

  const onDragEnd = async (result: DropResult): Promise<void> => {
    const { source, destination, type } = result;
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    if (type === column) {
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
        {statusBoard === fetchStatus.loading ||
        statusColumn === fetchStatus.loading ||
        statusTasks === fetchStatus.loading ? (
          <Loader />
        ) : (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="all-columns" direction="horizontal" type="column">
              {(provided) => (
                <div
                  className="columns-container"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {idBoard.columns.map((column: ColumnState, index: number) => {
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
        )}
      </div>
      {!board.id && <Navigate to={'/main'} />}
      {isModalOpen && (
        <ModalWindow onClick={handleModalClose}>
          {<ColumnForm boardId={board.id} type={formType.create} />}
        </ModalWindow>
      )}
    </>
  );
};

export default BoardPage;
