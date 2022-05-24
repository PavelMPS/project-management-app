import React, { FormEvent, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { getTokenFromLocalStorage } from '../../redux/ColumnSlice';
import { editProfile, getIdFromToken } from '../../redux/EditProfileSlice';
import { AppDispatch } from '../../redux/Store';

import './editProfilePage.css';

const EditProfile = (): JSX.Element => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IProfileState>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate: NavigateFunction = useNavigate();

  const backToHome = (): void => {
    return navigate('/main');
  };

  const onSubmit: SubmitHandler<IProfileState> = (data: IProfileState): void => {
    const token = getTokenFromLocalStorage();
    const id: string = getIdFromToken(token);
    dispatch(
      editProfile({ userId: id, name: data.name, login: data.login, password: data.password })
    );
    reset();
    backToHome();
  };

  return (
    <>
      <div className="edit-container">
        <h2 className="edit-title">{t('edit.title')}</h2>
        <form className="edit-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="edit-form-inputs">
            <label className="form-label">
              <span className="edit-form-error">{errors.name && t('edit.errors.name')}</span>
              <p className="title-label">{t('edit.newName')}</p>
              <input
                className="edit-input"
                type="text"
                placeholder={t('edit.newNamePlaceholder')}
                {...register('name', { required: true })}
              />
            </label>
            <label className="form-label">
              <span className="edit-form-error">{errors.login && t('edit.errors.login')}</span>
              <p className="title-label">{t('edit.newLogin')}</p>
              <input
                className="edit-input"
                type="text"
                placeholder={t('edit.newLoginPlaceholder')}
                {...register('login', { required: true })}
              />
            </label>
            <label className="form-label">
              <span className="edit-form-error">
                {errors.password && t('edit.errors.password')}
              </span>
              <p className="title-label">{t('edit.newPassword')}</p>
              <input
                className="edit-input"
                type="text"
                placeholder={t('edit.newPasswordPlaceholder')}
                {...register('password', { required: true })}
              />
            </label>
          </div>
          <div className="edit-form-buttons">
            <button className="button edit-submit-btn">{t('edit.submit')}</button>
            <button className="button edit-cancel-btn" onClick={backToHome}>
              {t('edit.cancel')}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
