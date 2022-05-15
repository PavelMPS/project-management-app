import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { deleteBoard, deleteBoardFetch, openBoard } from '../../redux/MainSlice';
import { AppDispatch } from '../../redux/Store';
import { getBoardById } from '../../redux/GetBoardSlice';
import { buttonName } from '../../constants/Constants';

import './boardPreview.css';

const BoardPreview = (props: { boardInf: IBoard }): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  const deleteBoardHandler = (): void => {
    dispatch(deleteBoardFetch(props.boardInf.id));
    dispatch(deleteBoard(props.boardInf.id));
    //TODO add confirmation window
  };
  const openBoardHandler = (): void => {
    dispatch(openBoard(props.boardInf));
    dispatch(getBoardById(props.boardInf.id));
  };
  return (
    <>
      <div className="board-prew-container">
        <div className="board-prew-wrapper">
          <div className="board-prew-title">{props.boardInf.title}</div>
          <div className="board-prew-bin" onClick={deleteBoardHandler}></div>
        </div>
        <Link className="edit-link" to={'/board'}>
          <div className="board-open-btn" onClick={openBoardHandler}>
            {buttonName.open}
          </div>
        </Link>
      </div>
    </>
  );
};

export default BoardPreview;
