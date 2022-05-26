import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import BoardPreview from '../BoardPreview/BoardPreview';
import { Loader } from '../Loader/Loader';
import { fetchStatus } from '../../constants/Constants';
import { selectBoards, selectBoardsFetchStatus, fetchBoards } from '../../redux/MainSlice';
import { AppDispatch } from '../../redux/Store';
import { getTokenFromLocalStorage } from '../../redux/ColumnSlice';
import { getIdFromToken } from '../../redux/EditProfileSlice';
import { getUserAuth } from '../../redux/userSlice';

import './mainPage.css';

const Main = (): JSX.Element => {
  const { t } = useTranslation();
  const boards: IBoard[] = useSelector(selectBoards);
  const status: string = useSelector(selectBoardsFetchStatus);
  const dispatch = useDispatch<AppDispatch>();

  useEffect((): void => {
    if (status === fetchStatus.idle) {
      dispatch(fetchBoards());
    }
  }, [dispatch, boards, status]);

  useEffect(() => {
    const token = getTokenFromLocalStorage();
    if (token) {
      const userId = getIdFromToken(token);
      dispatch(getUserAuth({ id: userId, token }));
    }
  }, []);

  return (
    <>
      <div className="main-container">
        {!!boards.length && (
          <>
            <h1>{t('main.title')}</h1>
            <div className="boards-prew-container">
              {boards.length > 0 &&
                boards.map((board: IBoard) => {
                  return <BoardPreview key={board.id} boardInf={board} />;
                })}
            </div>
          </>
        )}
        {status === fetchStatus.loading && <Loader />}
      </div>
    </>
  );
};

export default Main;
