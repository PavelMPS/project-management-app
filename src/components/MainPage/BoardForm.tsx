import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { createBoard } from '../../redux/CreateBoardSlice';
import { fetchBoards } from '../../redux/MainSlice';
import { AppDispatch } from '../../redux/Store';
import Confirmation from '../Confirmation/Confirmation';
import { useForm } from 'react-hook-form';

const BoardForm = (): JSX.Element => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICreateBoard>();
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
      <form className="form" onSubmit={handleSubmit(createBoardHandler)}>
        <div className="form-element-wrapper">
          <label className="form-label">
            {t('board.title')}
            <input
              className="form-input"
              {...register('title', {
                required: true,
              })}
              type="text"
              placeholder={t('board.titlePlaceholder')}
            />
            {errors.title && <p className="error">{t('board.errors.title')}</p>}
          </label>
        </div>
        <div className="form-element-wrapper">
          <label className="form-label">
            {t('board.description')}
            <input
              className="form-input"
              type="text"
              placeholder={t('board.descriptionPlaceholder')}
              {...register('description', { required: true })}
            />
            {errors.description && <p className="error">{t('board.errors.description')}</p>}
          </label>
        </div>
        <button className="btn">{t('board.create')}</button>
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

export default BoardForm;
