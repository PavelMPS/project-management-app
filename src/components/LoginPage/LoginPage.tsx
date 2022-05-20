import React, { useEffect } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/redux';
import { getUser } from '../../redux/apiReducer';
import { setAuthCredentials } from '../../redux/userSlice';
import { buttonName, loginSettings } from '../../constants/Constants';

import './../SignupPage/Styles.css';

export interface ILoginData {
  login: string;
  password: string;
}

const LoginPage = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { authLogin, authPass, isAuth } = useAppSelector((store) => store.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginData>();

  const onSubmit: SubmitHandler<ILoginData> = (data): void => {
    dispatch(setAuthCredentials(data));
  };

  useEffect((): void => {
    if (authLogin && authPass) {
      dispatch(getUser(authLogin, authPass));
    }
  }, [authPass]);

  useEffect((): void => {
    if (isAuth) {
      return navigate('/main');
    }
  }, [isAuth]);

  return (
    <>
      <div className="login-page">
        <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
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
            <input type="submit" value="Enter" />
          </div>
        </form>
        {loginSettings.noAccaunt}
        <NavLink to="/sign-up">
          <button>{buttonName.register}</button>
        </NavLink>
      </div>
    </>
  );
};

export default LoginPage;
