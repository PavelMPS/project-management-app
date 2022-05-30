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
import { logout, selectUserError } from '../../redux/userSlice';
import { selectEditProfileError } from '../../redux/EditProfileSlice';
import { sigupUserError } from '../../redux/SignUpSlice';
import { useAppDispatch } from '../../redux/hooks/redux';

import './toast.css';
import { useTranslation } from 'react-i18next';

const Toast = (): JSX.Element => {
  const { t } = useTranslation();
  const [list, setList] = useState<IError[]>([]);
  const dispatch = useAppDispatch();

  const editProfileError: string | null = useSelector(selectEditProfileError);
  const userError: string | null = useSelector(selectUserError);
  const columnError: string | null = useSelector(selectColumnsError);
  const deleteUserError: string | null = useSelector(selectDeleteUserError);
  const getIdBoardError: string | null = useSelector(selectGetBoardsError);
  const mainError: string | null = useSelector(selectBoardsError);
  const taskError: string | null = useSelector(selectTasksError);
  const usersError: string | null = useSelector(selectUsersError);
  const signupError: string | null = useSelector(sigupUserError);

  const getErrorText = (error: string) => {
    const status = error.slice(-3);
    switch (status) {
      case '201':
        return t('serverErrorText.201');
      case '400':
        return t('serverErrorText.400');
      case '401':
        dispatch(logout());
        return t('serverErrorText.401');
      case '403':
        return t('serverErrorText.403');
      case '404':
        return t('serverErrorText.404');
      case '409':
        return t('serverErrorText.409');
      case '500':
        return t('serverErrorText.500');
      default:
        return t('serverErrorText.default');
    }
  };

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
    if (signupError) {
      errors.push({ id: nanoid(), text: getErrorText(signupError) });
    }
    setList([...errors]);
  }, [
    columnError,
    signupError,
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
            <div className="small-btn close toast-close" onClick={() => deleteToast(i)}></div>
            <div className="toast-message">{toast.text}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Toast;
