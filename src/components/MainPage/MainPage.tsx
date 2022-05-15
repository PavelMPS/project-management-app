import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import BoardPreview from '../BoardPreview/BoardPreview';
import {
  selectBoards,
  selectBoardsFetchStatus,
  selectBoardsError,
  fetchBoards,
} from '../../redux/MainSlice';
import { AppDispatch } from '../../redux/Store';
import { pageName } from '../../constants/constants';

import './mainPage.css';

const Main = (): JSX.Element => {
  const boards: IBoard[] = useSelector(selectBoards);
  const status: string = useSelector(selectBoardsFetchStatus);
  const error: string | null = useSelector(selectBoardsError);

  const dispatch = useDispatch<AppDispatch>();

  useEffect((): void => {
    if (status === 'idle') {
      dispatch(fetchBoards());
    }
  }, [dispatch, boards, status]);

  return (
    <>
      <div className="main-container">
        <h1>{pageName.main}</h1>
        <div className="boards-prew-container">
          {boards.length > 0 &&
            boards.map((board: IBoard) => {
              return <BoardPreview key={board.id} boardInf={board} />;
            })}
        </div>
      </div>
    </>
  );
};

export default Main;
