import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import { selectColumnsError } from '../../redux/ColumnSlice';
import { selectDeleteUserError } from '../../redux/DeleteUserSlice';
import { boardCreateError } from '../../redux/CreateBoardSlice';
import { selectGetBoardsError } from '../../redux/GetBoardSlice';
import { selectBoardsError } from '../../redux/MainSlice';
import { selectTasksError } from '../../redux/TaskSlice';
import { selectUsersError } from '../../redux/UsersSlice';
import { selectUserError } from '../../redux/userSlice';
import { selectEditProfileError } from '../../redux/EditProfileSlice';
import { serverErrorText } from '../../constants/Constants';

import './toast.css';

const getErrorText = (error: string) => {
  const status = error.slice(-3);
  switch (status) {
    case '400':
      return serverErrorText[400];
    case '401':
      return serverErrorText[401];
    case '403':
      return serverErrorText[403];
    case '404':
      return serverErrorText[404];
    case '500':
      return serverErrorText[500];
    default:
      return serverErrorText.default;
  }
};

const Toast = (): JSX.Element => {
  const [list, setList] = useState<IError[]>([]);

  const editProfileError: string | null = useSelector(selectEditProfileError);
  const userError: string | null = useSelector(selectUserError);
  const columnError: string | null = useSelector(selectColumnsError);
  const deleteUserError: string | null = useSelector(selectDeleteUserError);
  const getIdBoardError: string | null = useSelector(selectGetBoardsError);
  const mainError: string | null = useSelector(selectBoardsError);
  const taskError: string | null = useSelector(selectTasksError);
  const usersError: string | null = useSelector(selectUsersError);
  const createUserError: string = useSelector(boardCreateError);

  useEffect(() => {
    const errors: IError[] = list;
    if (editProfileError) {
      errors.push({ id: nanoid(), text: getErrorText(editProfileError) });
    }
    if (userError) {
      errors.push({ id: nanoid(), text: getErrorText(userError) });
    }
    if (columnError) {
      errors.push({ id: nanoid(), text: getErrorText(columnError) });
    }
    if (deleteUserError) {
      errors.push({ id: nanoid(), text: getErrorText(deleteUserError) });
    }
    if (getIdBoardError) {
      errors.push({ id: nanoid(), text: getErrorText(getIdBoardError) });
    }
    if (mainError) {
      errors.push({ id: nanoid(), text: getErrorText(mainError) });
    }
    if (taskError) {
      errors.push({ id: nanoid(), text: getErrorText(taskError) });
    }
    if (usersError) {
      errors.push({ id: nanoid(), text: getErrorText(usersError) });
    }
    if (createUserError.length) {
      errors.push({ id: nanoid(), text: getErrorText(createUserError) });
    }
    setList([...errors]);
  }, [
    columnError,
    createUserError,
    deleteUserError,
    editProfileError,
    getIdBoardError,
    mainError,
    taskError,
    userError,
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
          <div key={toast.id} className={`toast`}>
            <button className="small-btn close toast-close" onClick={() => deleteToast(i)}></button>
            <div className="toast-message">{toast.text}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Toast;
