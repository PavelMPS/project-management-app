import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import { selectColumnsError } from '../../redux/ColumnSlice';
import { selectDeleteUserError } from '../../redux/DeleteUserSlice';
import { boardCreateError } from '../../redux/CreateBoardSlice';
import { selectGetBoardsError } from '../../redux/GetBoardSlice';
import { selectBoardsError } from '../../redux/MainSlice';
import { selectTasksError } from '../../redux/TaskSlice';
import { selectUsersError } from '../../redux/UsersSlice';

import './toast.css';

const Toast = (): JSX.Element => {
  const [list, setList] = useState<string[]>([]);

  //apiReducer
  //EditProfileSlice
  //userSlice

  const columnError: string | null = useSelector(selectColumnsError);
  const deleteUserError: string | null = useSelector(selectDeleteUserError);
  const getIdBoardError: string | null = useSelector(selectGetBoardsError);
  const mainError: string | null = useSelector(selectBoardsError);
  const taskError: string | null = useSelector(selectTasksError);
  const usersError: string | null = useSelector(selectUsersError);

  const createUserError: string = useSelector(boardCreateError); //string

  useEffect(() => {
    const errors: string[] = [];
    if (columnError) {
      errors.push(columnError);
    }
    if (deleteUserError) {
      errors.push(deleteUserError);
    }
    if (getIdBoardError) {
      errors.push(getIdBoardError);
    }
    if (mainError) {
      errors.push(mainError);
    }
    if (taskError) {
      errors.push(taskError);
    }
    if (usersError) {
      errors.push(usersError);
    }
    if (createUserError.length) {
      errors.push(createUserError);
    }
    setList(errors);
  }, [
    columnError,
    createUserError,
    deleteUserError,
    getIdBoardError,
    mainError,
    taskError,
    usersError,
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (list.length) {
        deleteToast(0);
      }
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [list]);

  const deleteToast = (index: number) => {
    list.splice(index, 1);
    setList([...list]);
  };

  return (
    <>
      <div className={`toast-container`}>
        {list.map((toast, i) => (
          <div key={i} className={`toast`}>
            <button onClick={() => deleteToast(i)}></button>
            <div className="toast-image"></div>
            <div className="toast-message">{toast}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Toast;
