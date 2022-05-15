import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import BoardPreview from '../BoardPreview/BoardPreview';
import { Loader } from '../Loader/Loader';
import { fetchStatus } from '../../constants/Constants';
import {
  selectBoards,
  selectBoardsFetchStatus,
  selectBoardsError,
  fetchBoards,
} from '../../redux/MainSlice';
import { AppDispatch } from '../../redux/Store';
import { pageName } from '../../constants/Constants';

import './mainPage.css';

const Main = (): JSX.Element => {
  const boards: IBoard[] = useSelector(selectBoards);
  const status: string = useSelector(selectBoardsFetchStatus);
  const error: string | null = useSelector(selectBoardsError);

  const dispatch = useDispatch<AppDispatch>();

  useEffect((): void => {
    if (status === fetchStatus.idle) {
      dispatch(fetchBoards());
    }
  }, [dispatch, boards, status]);

  return (
    <>
      <div className="main-container">
        {!!boards.length && (
          <>
            <h1>{pageName.main}</h1>
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
