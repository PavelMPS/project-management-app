import { Link, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';

import { ModalWindow } from '../ModalWindow/ModalWindow';
import { ColumnForm } from '../Column/ColumnForm';
import { selectStatusColumn, closeBoardColumn, updateColumnFetch } from '../../redux/ColumnSlice';
import { closeBoardTask } from '../../redux/TaskSlice';
import { selectBoard } from '../../redux/MainSlice';
import { AppDispatch } from '../../redux/Store';
import { fetchUsers } from '../../redux/UsersSlice';
import { Column } from '../Column/Column';
import { ColumnState, getBoardById } from '../../redux/GetBoardSlice';
import { useAppSelector } from '../../redux/hooks/redux';

import './boardPage.css';

const BoardPage = (): JSX.Element => {
  const board = useSelector(selectBoard);
  const status = useSelector(selectStatusColumn);
  const { idBoard } = useAppSelector((store) => store.idBoard);

  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [firstOrder, setFirstOrder] = useState<number | null>(null);
  const [firstColumnId, setFirstColumnId] = useState<string>('');
  const [firstTitle, setFirstTitle] = useState<string>('');

  const dispatch = useDispatch<AppDispatch>();

  useEffect((): void => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [status]);

  const handleModalClose = (): void => {
    setModalOpen(false);
  };

  function dragStartHandler(e: React.DragEvent, columnId: ColumnState) {
    // e.preventDefault();
    setFirstOrder(columnId.order);
    setFirstColumnId(columnId.id);
    setFirstTitle(columnId.title);
  }

  async function dropHandler(e: React.DragEvent<HTMLDivElement>, columnId: ColumnState) {
    e.preventDefault();
    const secondOrder = columnId.order;
    const secondColumnId = columnId.id;
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
  }

  function dragOverHandler(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const elem = e.target as HTMLElement;
    //TODO change style dragging item
  }

  function dragEndHandler(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const elem = e.target as HTMLElement;
    // elem.style.background = 'white';
  }
  return (
    <>
      <div className="board-container">
        <h1>Board {board.title}</h1>
        <Link to="/main">
          <div
            className="board-close"
            onClick={() => {
              dispatch(closeBoardColumn());
              dispatch(closeBoardTask());
            }}
          >
            CLOSE
          </div>
        </Link>
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
        </div>
        <div
          className="board-close"
          onClick={() => {
            setModalOpen(true);
          }}
        >
          ADD COLUMN
        </div>
      </div>
      {!board.id && <Navigate to={'/main'} />}
      {isModalOpen && (
        <ModalWindow onClick={handleModalClose}>
          {<ColumnForm boardId={board.id} type="create" />}
        </ModalWindow>
      )}
    </>
  );
};

export default BoardPage;
