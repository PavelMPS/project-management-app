import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../../redux/hooks/redux';
import { getUser } from '../../redux/apiReducer';
import { setAuthCredentials } from '../../redux/userSlice';

import './../SignupPage/Styles.css';

export interface ILoginData {
  login: string;
  password: string;
}

const LoginPage = (): JSX.Element => {
  const { t } = useTranslation();
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
              placeholder={t('login.placeholder.login')}
              {...register('login', {
                required: t('login.require.login'),
                maxLength: 15,
                minLength: 3,
              })}
            />
            {errors.login && errors.login.type === 'minLength' && (
              <p className="error">{t('login.errors.minLogin')}</p>
            )}
            {errors.login && errors.login.type === 'maxLength' && (
              <p className="error">{t('login.errors.maxLogin')}</p>
            )}
            {errors.login && <p className="error">{errors.login.message}</p>}
          </label>
          <label className="text-field__label">
            <input
              className={errors.password ? 'text-field__input input-error' : 'text-field__input'}
              type="password"
              placeholder={t('login.placeholder.password')}
              {...register('password', {
                required: t('login.require.password'),
                maxLength: 15,
                minLength: 3,
              })}
            />
            {errors.password && errors.password.type === 'minLength' && (
              <p className="error">{t('login.errors.minPassword')}</p>
            )}
            {errors.password && errors.password.type === 'maxLength' && (
              <p className="error">{t('login.errors.maxPassword')}</p>
            )}
            {errors.password && <p className="error">{errors.password.message}</p>}
          </label>
          <div className="sendButton">
            <input type="submit" value={t('login.enterBtn')} />
          </div>
        </form>
        {t('login.noAccaunt')}
        <NavLink to="/sign-up">
          <button>{t('login.registerBtn')}</button>
        </NavLink>
      </div>
    </>
  );
};

export default LoginPage;
