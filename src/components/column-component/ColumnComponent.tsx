import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import './ColumnComponent.css';

import {
  selectTasks,
  selectStatusTasks,
  selectBoard,
  fetchTasks,
  deleteColumn,
  deleteColumnFetch,
} from '../../redux/BoardSlice';
import { AppDispatch } from '../../redux/Store';

export const Column = (props: { columnInf: IColumn }): JSX.Element => {
  const status = useSelector(selectStatusTasks);
  const tasks = useSelector(selectTasks);
  const board = useSelector(selectBoard);
  const dispatch = useDispatch<AppDispatch>();

  useEffect((): void => {
    if (status === 'idle') {
      dispatch(fetchTasks({ boardId: board.id, columnId: props.columnInf.id }));
    }
    console.log(tasks);
  }, [board.id, dispatch, props.columnInf.id, status, tasks]);

  return (
    <>
      <div className="column-container">
        <div className="column-wrapper">
          <div className="column-title">{props.columnInf.title}</div>
          <div
            className="board-prew-bin"
            onClick={() => {
              dispatch(deleteColumnFetch({ boardId: board.id, columnId: props.columnInf.id }));
              dispatch(deleteColumn(props.columnInf.id));
              //TODO добавить confirmation modal
            }}
          ></div>
        </div>
      </div>
    </>
  );
};
