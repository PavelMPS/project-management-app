import React, { useEffect } from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/redux';
import { setUser } from '../../redux/apiReducer';
import { setCredentials } from '../../redux/userSlice';
import { buttonName, loginSettings, pageName } from '../../constants/Constants';

import './Styles.css';

export interface IUserCredentials {
  name: string;
  login: string;
  password: string;
}

const SignupPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { name, login, password, token, isAuth } = useAppSelector((store) => store.user);
  const navigate = useNavigate();

  useEffect((): void => {
    if (token && isAuth) {
      return navigate('/main');
    }
  }, [isAuth]);

  const createAccount = (): void => {
    if (name && login && password) {
      dispatch(setUser({ name, login, password }));
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserCredentials>();

  const onSubmit: SubmitHandler<IUserCredentials> = (data): void => {
    dispatch(setCredentials(data));
    createAccount();
  };

  return (
    <div className="sign-up-page">
      <h1>{pageName.signUp}</h1>
      <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        <label className="text-field__label">
          <input
            className={errors.name ? 'text-field__input input-error' : 'text-field__input'}
            type="text"
            placeholder="Enter name"
            {...register('name', {
              required: 'name is required field',
              maxLength: 15,
              minLength: 3,
            })}
          />
          {errors.name && errors.name.type === 'minLength' && (
            <p className="error">Your name must be at least 3 characters</p>
          )}
          {errors.name && errors.name.type === 'maxLength' && (
            <p className="error">Your name must be less than 15 characters</p>
          )}
          {errors.name && <p className="error">{errors.name.message}</p>}
        </label>
        <label className="text-field__label">
          <input
            className={errors.login ? 'text-field__input input-error' : 'text-field__input'}
            type="text"
            placeholder="Enter login"
            {...register('login', {
              required: 'login is required field',
              maxLength: 15,
              minLength: 3,
            })}
          />
          {errors.login && errors.login.type === 'minLength' && (
            <p className="error">Your login must be at least 3 characters</p>
          )}
          {errors.login && errors.login.type === 'maxLength' && (
            <p className="error">Your login must be less than 15 characters</p>
          )}
          {errors.login && <p className="error">{errors.login.message}</p>}
        </label>
        <label className="text-field__label">
          <input
            className={errors.password ? 'text-field__input input-error' : 'text-field__input'}
            type="password"
            placeholder="Введите пароль"
            {...register('password', {
              required: 'password is required field',
              maxLength: 15,
              minLength: 3,
            })}
          />
          {errors.password && errors.password.type === 'minLength' && (
            <p className="error">Your password must be at least 3 characters</p>
          )}
          {errors.password && errors.password.type === 'maxLength' && (
            <p className="error">Your password must be less than 15 characters</p>
          )}
          {errors.password && <p className="error">{errors.password.message}</p>}
        </label>
        <div className="sendButton">
          <input type="submit" value="Registration" />
        </div>
      </form>
      {loginSettings.haveAccaunt}
      <NavLink to="/login">
        <button>{buttonName.enter}</button>
      </NavLink>
    </div>
  );
};

export default SignupPage;
