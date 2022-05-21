import React, { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { buttonName, createBoardSettings } from '../../constants/Constants';
import { createBoard } from '../../redux/CreateBoardSlice';
import { fetchBoards } from '../../redux/MainSlice';
import { AppDispatch } from '../../redux/Store';

import './modalFormBoardCreate.css';

const ModalFormBoardCreate = (): JSX.Element => {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const createBoardHandler = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    await dispatch(createBoard({ title, description }));
    await dispatch(fetchBoards());
  };

  return (
    <div className="popup-content">
      <h2 className="modal-board-title">{t('board.create')}</h2>
      <form className="modal-board-form">
        <label className="form-label board-label">
          <p className="title-label">{t('board.title')}</p>
          <input
            className="edit-input"
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder={t('board.titlePlaceholder')}
            value={title}
          />
        </label>
        <label className="form-label board-label">
          <p className="description-label">{t('board.description')}</p>
          <input
            className="edit-input"
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            placeholder={t('board.descriptionPlaceholder')}
            value={description}
          />
        </label>
        <button className="board-create-btn" onClick={createBoardHandler}>
          {t('board.createButton')}
        </button>
      </form>
    </div>
  );
};

export default ModalFormBoardCreate;
