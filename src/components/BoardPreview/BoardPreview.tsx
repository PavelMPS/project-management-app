import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import Confirmation from '../Confirmation/Confirmation';
import { deleteBoard, deleteBoardFetch, openBoard } from '../../redux/MainSlice';
import { AppDispatch } from '../../redux/Store';
import { getBoardById } from '../../redux/GetBoardSlice';
import { buttonName } from '../../constants/Constants';

import './boardPreview.css';

const BoardPreview = (props: { boardInf: IBoard }): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);

  const confirmationSubmit = async (): Promise<void> => {
    await dispatch(deleteBoardFetch(props.boardInf.id));
    dispatch(deleteBoard(props.boardInf.id));
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
          <div
            className="small-btn edit"
            onClick={() => {
              console.log('update');
              //TODO add update
            }}
          ></div>
          <div className="small-btn trash" onClick={() => setIsConfirmationOpen(true)}></div>
        </div>
        <Link className="link" to={'/board'}>
          <div className="opacity-btn" onClick={openBoardHandler}>
            <p>{buttonName.open}</p>
          </div>
        </Link>
      </div>
      {isConfirmationOpen && (
        <Confirmation
          onCancel={() => setIsConfirmationOpen(false)}
          onSubmit={() => confirmationSubmit()}
        />
      )}
    </>
  );
};

export default BoardPreview;
