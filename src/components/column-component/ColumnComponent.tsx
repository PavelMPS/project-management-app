import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

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
import { Task } from '../task-component/TaskComponent';

export const Column = (props: { columnInf: IColumn }): JSX.Element => {
  const status = useSelector(selectStatusTasks);
  const allTasks = useSelector(selectTasks);
  const board = useSelector(selectBoard);

  const dispatch = useDispatch<AppDispatch>();

  const [tasks, setTasks] = useState<ITask[] | null>(null);

  useEffect((): void => {
    if (status === 'idle') {
      dispatch(fetchTasks({ boardId: board.id, columnId: props.columnInf.id }));
    }
    const newTasks = allTasks.filter((task: ITask) => {
      return task.columnId === props.columnInf.id;
    });
    setTasks(newTasks);
  }, [allTasks, board.id, props.columnInf.id, status]);

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
        <div className="tasks-container">
          {tasks &&
            tasks.map((task: ITask) => {
              return <Task key={task.id} taskInf={task} />;
            })}
        </div>
      </div>
    </>
  );
};
