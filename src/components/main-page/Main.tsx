import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { BoardPrew } from '../boardPrew/BoardPrew';
import './Main.css';

import {
  selectBoards,
  selectBoardsFetchStatus,
  selectBoardsError,
  fetchBoards,
} from '../../redux/MainSlice';
import { AppDispatch } from '../../redux/Store';

const Main = (): JSX.Element => {
  const boards: IBoard[] = useSelector(selectBoards);
  const status: string = useSelector(selectBoardsFetchStatus);
  const error: string | null = useSelector(selectBoardsError);

  const dispatch = useDispatch<AppDispatch>();

  useEffect((): void => {
    if (status === 'idle') {
      dispatch(fetchBoards());
    }
    console.log(status, boards, error);
  }, [dispatch, boards, status]);

  return (
    <>
      <div className="main-container">
        <h1>Main</h1>
        <div className="boards-prew-container">
          {boards.map((board: IBoard) => {
            return <BoardPrew key={board.id} boardInf={board} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Main;
