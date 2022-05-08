import React, { FormEvent, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { editProfile, getIdFromToken, ProfileState } from '../../redux/EditProfileSlice';
import { AppDispatch } from '../../redux/Store';

import './editProfile.css';

const EditProfile = (): JSX.Element => {
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileState>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate: NavigateFunction = useNavigate();

  const onSubmit: SubmitHandler<ProfileState> = (data: ProfileState): void => {
    const id = getIdFromToken();
    dispatch(
      editProfile({ userID: id, name: data.name, login: data.login, password: data.password })
    );
    reset();
    backToHome();
  };

  function backToHome(): void {
    return navigate('/main');
  }
  return (
    <>
      <div className="edit-container">
        <h2 className="edit-title">Edit profile</h2>
        <form className="edit-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="edit-form-inputs">
            <label className="form-label">
              <span className="edit-form-error">{errors.name && 'Enter correct name!'}</span>
              <p className="title-label">New name:</p>
              <input
                className="edit-input"
                type="text"
                placeholder="Edit your name"
                {...register('name', { required: true })}
              />
            </label>
            <label className="form-label">
              <span className="edit-form-error">{errors.login && 'Enter correct login!'}</span>
              <p className="title-label">New login:</p>
              <input
                className="edit-input"
                type="text"
                placeholder="Edit your login"
                {...register('login', { required: true })}
              />
            </label>
            <label className="form-label">
              <span className="edit-form-error">
                {errors.password && 'Enter correct password!'}
              </span>
              <p className="title-label">New password:</p>
              <input
                className="edit-input"
                type="text"
                placeholder="Edit your password"
                {...register('password', { required: true })}
              />
            </label>
          </div>
          <div className="edit-form-buttons">
            <button className="button edit-submit-btn">SUBMIT</button>
            <button className="button edit-cancel-btn" onClick={backToHome}>
              CANCEL
            </button>
          </div>
        </form>
        <p className="success-message">{isSuccess && 'SUCCESS'}</p>
      </div>
    </>
  );
};

export default EditProfile;
