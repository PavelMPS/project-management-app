import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { AppDispatch } from '../../redux/Store';
import Confirmation from '../Confirmation/Confirmation';
import { useForm } from 'react-hook-form';
import { updateBoard } from '../../redux/UpdateBoardSlice';
import { fetchBoards } from '../../redux/MainSlice';

const BoardFormUpdate = ({
  boardTitle,
  boardDescription,
  boardId,
}: {
  boardTitle: string;
  boardDescription: string;
  boardId: string;
}): JSX.Element => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICreateBoard>();
  const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);
  const [boardInf, setBoardInf] = useState<ICreateBoard>({
    title: boardTitle,
    description: boardDescription,
  });

  const dispatch = useDispatch<AppDispatch>();

  const updateBoardHandler = (data: ICreateBoard): void => {
    setIsConfirmationOpen(true);
    setBoardInf({
      title: data.title,
      description: data.description,
    });
  };

  const confirmationSubmit = async (): Promise<void> => {
    console.log('Confirmation submit');
    const { title, description } = boardInf;
    setIsConfirmationOpen(false);
    reset();
    await dispatch(updateBoard({ title: title, description: description, boardId: boardId }));
    await dispatch(fetchBoards());
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit(updateBoardHandler)}>
        <div className="form-element-wrapper">
          <label className="form-label">
            {t('board.title')}
            <input
              className="form-input"
              value={boardInf.title}
              {...register('title', {
                required: true,
                onChange: (e) => {
                  setBoardInf((state) => {
                    return { ...state, title: e.target.value };
                  });
                },
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
              value={boardInf.description}
              type="text"
              placeholder={t('board.descriptionPlaceholder')}
              {...register('description', {
                required: true,
                onChange: (e) => {
                  setBoardInf((state) => {
                    return { ...state, description: e.target.value };
                  });
                },
              })}
            />
            {errors.description && <p className="error">{t('board.errors.description')}</p>}
          </label>
        </div>
        <button className="btn">{t('board.update')}</button>
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

export default BoardFormUpdate;
