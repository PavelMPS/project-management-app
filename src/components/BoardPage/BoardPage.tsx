import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import ModalWindow from '../ModalWindow/ModalWindow';
import ColumnForm from '../Column/ColumnForm';
import { selectStatusColumn, closeBoardColumn, updateColumnFetch } from '../../redux/ColumnSlice';
import { closeBoardTask, selectStatusTasks } from '../../redux/TaskSlice';
import { selectBoard } from '../../redux/MainSlice';
import { AppDispatch } from '../../redux/Store';
import { fetchUsers, selectUsersStatus } from '../../redux/UsersSlice';
import Column from '../Column/Column';
import { ColumnState, getBoardById } from '../../redux/GetBoardSlice';
import { useAppSelector } from '../../redux/hooks/redux';
import { buttonName, fetchStatus, pageName } from '../../constants/Constants';
import { Loader } from '../Loader/Loader';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

import './boardPage.css';

const BoardPage = (): JSX.Element => {
  const board = useSelector(selectBoard);
  const statusColumn = useSelector(selectStatusColumn);
  const statusTasks = useSelector(selectStatusTasks);
  const statusUsers = useSelector(selectUsersStatus);
  const { idBoard } = useAppSelector((store) => store.idBoard);

  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [columns, updateColumns] = useState(idBoard.columns);
  const dispatch = useDispatch<AppDispatch>();

  useEffect((): void => {
    updateColumns(idBoard.columns);
    if (statusUsers === fetchStatus.idle) {
      dispatch(fetchUsers());
    }
  }, [statusColumn, idBoard.columns, dispatch, statusUsers]);

  const handleModalClose = (): void => {
    setModalOpen(false);
  };

  const boardCloseHadler = (): void => {
    dispatch(closeBoardColumn());
    dispatch(closeBoardTask());
  };

  function handleOnDragEnd(result: DropResult): void {
    const items = Array.from(columns);
    const [reordedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination!.index, 0, reordedItem);

    updateColumns(items);
  }

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
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="columns" direction="horizontal">
            {(provided) => (
              <div
                className="columns-container"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {columns.map((column: ColumnState, index) => {
                  return (
                    <Draggable key={column.id} draggableId={column.id} index={index}>
                      {(provided) => (
                        <div
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <Column columnInf={column} />
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
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
          {<ColumnForm boardId={board.id} type="create" />}
        </ModalWindow>
      )}
      {(statusColumn === fetchStatus.loading || statusTasks === fetchStatus.loading) && <Loader />}
    </>
  );
};

export default BoardPage;
