import { useDispatch, useSelector } from 'react-redux';

import './TaskComponent.css';

import {
  selectTasks,
  selectStatusTasks,
  selectBoard,
  fetchTasks,
  deleteColumn,
  deleteColumnFetch,
} from '../../redux/BoardSlice';
import { AppDispatch } from '../../redux/Store';

export const Task = (props: { taskInf: ITask }): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <div className="task-container">
        <div className="task-wrapper">
          <div className="task-title">{props.taskInf.title}</div>
          <div
            className="board-prew-bin"
            onClick={() => {
              // dispatch(deleteColumnFetch({ boardId: board.id, columnId: props.columnInf.id }));
              // dispatch(deleteColumn(props.columnInf.id));
              //TODO добавить confirmation modal
            }}
          ></div>
        </div>
        <div>{props.taskInf.description}</div>
      </div>
    </>
  );
};
