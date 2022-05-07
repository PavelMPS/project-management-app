import { useDispatch } from 'react-redux';

import './BoardPrew.css';

import { deleteBoard, deleteBoardFetch } from '../../redux/MainSlice';
import { AppDispatch } from '../../redux/Store';

export const BoardPrew = (props: { boardInf: IBoard }): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <div className="board-prew-container">
        <div className="board-prew-title">{props.boardInf.title}</div>
        <div
          className="board-prew-bin"
          onClick={() => {
            dispatch(deleteBoardFetch(props.boardInf.id));
            dispatch(deleteBoard(props.boardInf.id));
          }}
        ></div>
      </div>
    </>
  );
};
