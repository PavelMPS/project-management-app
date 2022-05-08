import { Link, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import './BoardPage.css';

import {
  selectColumns,
  selectBoard,
  selectStatusColumn,
  fetchColumns,
  closeBoard,
} from '../../redux/BoardSlice';
import { AppDispatch } from '../../redux/Store';
import { Column } from '../column-component/ColumnComponent';

const BoardPage = (): JSX.Element => {
  const board = useSelector(selectBoard);
  const columns = useSelector(selectColumns);
  const status = useSelector(selectStatusColumn);

  const dispatch = useDispatch<AppDispatch>();

  useEffect((): void => {
    if (status === 'idle') {
      dispatch(fetchColumns(board.id));
    }
    console.log(columns);
  }, [board.id, columns, dispatch, status]);

  return (
    <>
      <div className="board-container">
        <h1>Board {board.title}</h1>
        <Link to="/main">
          <div className="board-close" onClick={() => dispatch(closeBoard())}>
            CLOSE
          </div>
        </Link>
        <div className="columns-container">
          {columns.map((column: IColumn) => {
            return <Column key={column.id} columnInf={column} />;
          })}
        </div>
      </div>
      {!board.id && <Navigate to={'/main'} />}
    </>
  );
};

export default BoardPage;
