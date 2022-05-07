import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import './BoardPrew.css';

import { deleteBoard, deleteBoardFetch, openBoard } from '../../redux/MainSlice';
import { AppDispatch } from '../../redux/Store';

export const BoardPrew = (props: { boardInf: IBoard }): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
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
          <div className="board-open-btn" onClick={() => dispatch(openBoard(props.boardInf))}>
            OPEN
          </div>
        </Link>
      </div>
    </>
  );
};
