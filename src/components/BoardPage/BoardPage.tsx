import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

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
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

import './boardPage.css';

const BoardPage = (): JSX.Element => {
  const board = useSelector(selectBoard);
  const statusColumn = useSelector(selectStatusColumn);
  const statusTasks = useSelector(selectStatusTasks);
  const statusUsers = useSelector(selectUsersStatus);
  const { idBoard } = useAppSelector((store) => store.idBoard);
  const state = useAppSelector((store) => store);
  const boardStatus = useAppSelector((store) => store.idBoard.status);

  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect((): void => {
    console.log('state', state);
    if (statusUsers === fetchStatus.idle) {
      dispatch(fetchUsers());
    }
  }, [statusUsers, idBoard.columns]);

  const handleModalClose = (): void => {
    setModalOpen(false);
  };

  const boardCloseHadler = (): void => {
    dispatch(closeBoardColumn());
    dispatch(closeBoardTask());
  };

  // function handleOnDragEnd(result: DropResult): void {
  //   if (!result.destination) {
  //     return;
  //   }
  //   console.log(result);

  //   const items = Array.from(columns);
  //   const [reordedItem] = items.splice(result.source.index, 1);
  //   items.splice(result.destination!.index, 0, reordedItem);
  //   console.log(items);
  //   updateColumns(items);
  // }

  const onDragEnd = async (result: DropResult) => {
    const { source, destination } = result;
    console.log(result);
    if (!destination) return;
    if (source.droppableId !== destination.droppableId) {
      //здесь нужно удалять драг таску и вставлять ее в дроп колонку с дроп ордером
      console.log('outside');
      const columnSource = idBoard.columns.find((column) => column.id === source.droppableId);
      const columnDestination = idBoard.columns.find(
        (column) => column.id === destination.droppableId
      );
    }
    if (source.droppableId === destination.droppableId) {
      //Здесь нужно менять массив с тасками
      console.log('inside');
      const column = idBoard.columns.find((column) => column.id === destination.droppableId);
      console.log(column);

      const taskDrag = column!.tasks[source.index];
      const taskDrop = column!.tasks[destination.index];
      const taskInfDrag = {
        id: taskDrag.id,
        title: taskDrag.title,
        order: taskDrop.order,
        description: taskDrag.description,
        userId: taskDrag.userId,
        boardId: board.id,
        columnId: column!.id,
      };
      const taskInfDrop = {
        id: taskDrop.id,
        title: taskDrop.title,
        order: taskDrag.order,
        description: taskDrop.description,
        userId: taskDrop.userId,
        boardId: board.id,
        columnId: column!.id,
      };
      console.log('here', taskInfDrag, taskInfDrop);
      await dispatch(updateTaskFetch(taskInfDrag));
      await dispatch(updateTaskFetch(taskInfDrop));
      await dispatch(getBoardById(board.id));

      // const taskInf1 = {
      //   id: ,
      //   title: task.title,
      //   order: taskDragState.order,
      //   description: task.description,
      //   userId: task.userId,
      //   boardId: board.id,
      //   columnId: props.columnInf.id,
      // };
      // const items = Array.from();
      // const [reorderedItem] = items.splice(source.index, 1);
      // items.splice(destination.index, 0, reorderedItem);
      // dispatch(updateTasks(items));
      // dispatch(updateTaskFetch(taskInf1));
      // dispatch(updateTaskFetch(taskInf2));
    }
  };

  return (
    <>
      <div className="board-container">
        <h1>
          {pageName.board} {board.title}
        </h1>
        <Link to="/main">
          <div className="board-close" onClick={boardCloseHadler}>
            {buttonName.close}
          </div>
        </Link>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="columns-container">
            {idBoard.columns.map((column: ColumnState) => {
              return (
                <Droppable key={column.id} droppableId={column.id}>
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      <Column columnInf={column} />
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              );
            })}
          </div>
        </DragDropContext>

        <div
          className="board-close"
          onClick={() => {
            setModalOpen(true);
          }}
        >
          {buttonName.addColumn}
        </div>
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
