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
import { buttonName, fetchStatus, pageName, formType } from '../../constants/Constants';
import { Loader } from '../Loader/Loader';

import './boardPage.css';

const BoardPage = (): JSX.Element => {
  const board = useSelector(selectBoard);
  const statusColumn = useSelector(selectStatusColumn);
  const statusTasks = useSelector(selectStatusTasks);
  const statusUsers = useSelector(selectUsersStatus);
  const { idBoard } = useAppSelector((store) => store.idBoard);

  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [firstOrder, setFirstOrder] = useState<number | null>(null);
  const [firstColumnId, setFirstColumnId] = useState<string>('');
  const [firstTitle, setFirstTitle] = useState<string>('');

  const dispatch = useDispatch<AppDispatch>();

  useEffect((): void => {
    if (statusUsers === fetchStatus.idle) {
      dispatch(fetchUsers());
    }
  }, [statusColumn]);

  const handleModalClose = (): void => {
    setModalOpen(false);
  };

  const dragStartHandler = (e: React.DragEvent, columnId: ColumnState): void => {
    // e.preventDefault();
    setFirstOrder(columnId.order);
    setFirstColumnId(columnId.id);
    setFirstTitle(columnId.title);
  };

  const dropHandler = async (
    e: React.DragEvent<HTMLDivElement>,
    columnId: ColumnState
  ): Promise<void> => {
    e.preventDefault();
    const secondOrder: number = columnId.order;
    const secondColumnId: string = columnId.id;
    await dispatch(
      updateColumnFetch({
        boardId: board.id,
        columnId: firstColumnId,
        column: { title: firstTitle, order: idBoard.columns.length + 1 },
      })
    );
    await dispatch(
      updateColumnFetch({
        boardId: board.id,
        columnId: secondColumnId,
        column: { title: columnId.title, order: firstOrder! },
      })
    );
    await dispatch(
      updateColumnFetch({
        boardId: board.id,
        columnId: firstColumnId,
        column: { title: firstTitle, order: secondOrder },
      })
    );
    await dispatch(getBoardById(board.id));
  };

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    const elem = e.target as HTMLElement;
    //TODO change style dragging item
  };

  const dragEndHandler = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    const elem = e.target as HTMLElement;
    // elem.style.background = 'white';
  };
  const boardCloseHadler = (): void => {
    dispatch(closeBoardColumn());
    dispatch(closeBoardTask());
  };
  return (
    <>
      <div className="board-container">
        <div className="board-title-container">
          <h1>{board.title}</h1>
          <Link to="/main">
            <div className="board-close" onClick={boardCloseHadler}>
              {buttonName.close}
            </div>
          </Link>
        </div>

        <div className="columns-container">
          {idBoard.columns.map((column: ColumnState) => {
            return (
              <div
                key={column.id}
                draggable={true}
                onDragStart={(e) => dragStartHandler(e, column)}
                onDragEnd={(e) => dragEndHandler(e)}
                onDragLeave={(e) => dragEndHandler(e)}
                onDragOver={(e) => dragOverHandler(e)}
                onDrop={(e) => dropHandler(e, column)}
              >
                <Column columnInf={column} />
              </div>
            );
          })}
          <div
            className="board-add-column"
            onClick={() => {
              setModalOpen(true);
            }}
          >
            <div className="board-add-column-icon"></div>
            <div>{buttonName.addColumn}</div>
          </div>
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
