import { Link, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import './BoardPage.css';

import { ModalWindow } from '../modal-component/Modal';
import { ColumnForm } from '../column-form/ColumnForm';
import {
  selectColumns,
  selectStatusColumn,
  fetchColumns,
  closeBoardColumn,
} from '../../redux/ColumnSlice';
import { closeBoardTask } from '../../redux/TaskSlice';
import { selectBoard } from '../../redux/MainSlice';
import { AppDispatch } from '../../redux/Store';
import { Column } from '../column-component/ColumnComponent';

const BoardPage = (): JSX.Element => {
  const board = useSelector(selectBoard);
  const columns = useSelector(selectColumns);
  const status = useSelector(selectStatusColumn);

  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  useEffect((): void => {
    if (status === 'idle') {
      dispatch(fetchColumns(board.id));
    }
  }, [board.id, columns, dispatch, status]);

  const handleModalClose = (): void => {
    setModalOpen(false);
  };

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
          {columns.map((column: IColumn) => {
            return <Column key={column.id} columnInf={column} />;
          })}
        </div>
        <div
          className="board-close"
          onClick={() => {
            console.log('New column created');
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
