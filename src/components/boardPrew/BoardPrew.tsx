import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Loader } from '../Loader/Loader';
import {
  deleteBoard,
  deleteBoardFetch,
  openBoard,
  selectBoardsFetchStatus,
} from '../../redux/MainSlice';
import { AppDispatch } from '../../redux/Store';
import { getBoardById } from '../../redux/GetBoardSlice';
import { fetchStatus } from '../../constants/Constants';

import './BoardPrew.css';

export const BoardPrew = (props: { boardInf: IBoard }): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  const status: string = useSelector(selectBoardsFetchStatus);

  return (
    <>
      {status === fetchStatus.loading && <Loader />}
      <div className="board-prew-container">
        <div className="board-prew-wrapper">
          <div className="board-prew-title">{props.boardInf.title}</div>
          <div
            className="board-prew-bin"
            onClick={() => {
              dispatch(deleteBoardFetch(props.boardInf.id));
              dispatch(deleteBoard(props.boardInf.id));
              //TODO добавить confirmation modal
            }}
          ></div>
        </div>
        <Link className="edit-link" to={'/board'}>
          <div
            className="board-open-btn"
            onClick={() => {
              dispatch(openBoard(props.boardInf));
              dispatch(getBoardById(props.boardInf.id));
            }}
          >
            OPEN
          </div>
        </Link>
      </div>
    </>
  );
};
