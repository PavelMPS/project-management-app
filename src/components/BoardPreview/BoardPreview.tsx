import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Confirmation from '../Confirmation/Confirmation';
import { deleteBoard, deleteBoardFetch, openBoard, selectBoardsError } from '../../redux/MainSlice';
import { AppDispatch } from '../../redux/Store';
import { getBoardById } from '../../redux/GetBoardSlice';

import './boardPreview.css';
import { fetchUsers } from '../../redux/UsersSlice';
import ModalWindow from '../ModalWindow/ModalWindow';
import BoardFormUpdate from '../MainPage/BoardFormUpdate';

const BoardPreview = (props: { boardInf: IBoard }): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const boardError: string | null = useSelector(selectBoardsError);

  const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const confirmationSubmit = async (): Promise<void> => {
    await dispatch(deleteBoardFetch(props.boardInf.id));
    if (!boardError) {
      dispatch(deleteBoard(props.boardInf.id));
    }
  };

  const openBoardHandler = (): void => {
    dispatch(getBoardById(props.boardInf.id));
    dispatch(openBoard(props.boardInf));
    dispatch(fetchUsers());
  };

  const updateHandler = (): void => {
    setModalOpen(true);
  };

  const handleModalClose = (): void => {
    setModalOpen(false);
  };

  return (
    <>
      <div className="board-prew-container">
        <div className="board-prew-wrapper">
          <div className="board-prew-title">{props.boardInf.title}</div>
          <div className="board-title-btn-container">
            <div className="small-btn edit" onClick={updateHandler}></div>
            <div className="small-btn trash" onClick={() => setIsConfirmationOpen(true)}></div>
          </div>
        </div>
        <div className="board-prew-description">{props.boardInf.description}</div>
        <Link className="link" to={'/board'}>
          <div className="opacity-btn" onClick={openBoardHandler}>
            {t('main.open')}
          </div>
        </Link>
      </div>
      {isModalOpen && (
        <ModalWindow onClick={handleModalClose}>
          {
            <BoardFormUpdate
              boardTitle={props.boardInf.title}
              boardDescription={props.boardInf.description}
              boardId={props.boardInf.id}
            />
          }
        </ModalWindow>
      )}
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
