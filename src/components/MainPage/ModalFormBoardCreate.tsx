import React, { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { createBoard } from '../../redux/CreateBoardSlice';
import { fetchBoards } from '../../redux/MainSlice';
import { AppDispatch } from '../../redux/Store';

import './modalFormBoardCreate.css';
import Confirmation from '../Confirmation/Confirmation';
import { useForm } from 'react-hook-form';

const ModalFormBoardCreate = (): JSX.Element => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICreateBoard>();
  // const [title, setTitle] = useState('');
  // const [description, setDescription] = useState('');
  const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);
  const [boardInf, setBoardInf] = useState<ICreateBoard>({
    title: '',
    description: '',
  });

  const dispatch = useDispatch<AppDispatch>();

  const createBoardHandler = (data: ICreateBoard): void => {
    setIsConfirmationOpen(true);
    setBoardInf({
      title: data.title,
      description: data.description,
    });
  };

  const confirmationSubmit = async (): Promise<void> => {
    const { title, description } = boardInf;
    setIsConfirmationOpen(false);
    reset();
    await dispatch(createBoard({ title, description }));
    await dispatch(fetchBoards());
  };

  return (
    <>
      <form className="modal-board-form" onSubmit={handleSubmit(createBoardHandler)}>
        <div className="form-element-wrapper">
          <label className="form-label">
            <span className="edit-form-error">{errors.title && t('board.errors.title')}</span>
            <p className="title-label">{t('board.title')}</p>
            <input
              className="edit-input"
              {...register('title', {
                required: true,
              })}
              type="text"
              placeholder={t('board.titlePlaceholder')}
            />
          </label>
          <label className="form-label">
            <span className="edit-form-error">
              {errors.description && t('board.errors.description')}
            </span>
            <p className="description-label">{t('board.description')}</p>
            <input
              className="edit-input"
              type="text"
              placeholder={t('board.descriptionPlaceholder')}
              {...register('description', { required: true })}
            />
          </label>
          <button className="board-create-btn">{t('board.createButton')}</button>
        </div>
      </form>
      {isConfirmationOpen && (
        <Confirmation
          onCancel={() => setIsConfirmationOpen(false)}
          onSubmit={() => confirmationSubmit()}
        />
      )}
    </>
  );
};

export default ModalFormBoardCreate;
