import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../../redux/hooks/redux';
import { setCredentials } from '../../redux/userSlice';
import { setSignupError, setUser } from '../../redux/SignUpSlice';

import './Styles.css';

export interface IUserCredentials {
  name: string;
  login: string;
  password: string;
}

const SignupPage = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { token, isAuth } = useAppSelector((store) => store.user);
  const { isLoading, error } = useAppSelector((store) => store.signUp);
  const navigate = useNavigate();

  useEffect((): void => {
    if (token && isAuth) {
      return navigate('/main');
    }
  }, [isAuth]);

  useEffect((): void => {
    if (error) {
      dispatch(setSignupError());
    }
  }, [error]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserCredentials>();

  const onSubmit: SubmitHandler<IUserCredentials> = (data): void => {
    dispatch(setCredentials(data));
    dispatch(setUser({ name: data.name, login: data.login, password: data.password }));
  };

  return (
    <div className="sign-up-page">
      <h1>{t('signup.title')}</h1>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-element-wrapper">
          <label className="form-label">
            <input
              className={errors.name ? 'form-input input-error' : 'form-input'}
              type="text"
              placeholder={t('signup.placeholder.name')}
              {...register('name', {
                required: t('signup.require.name'),
                maxLength: 15,
                minLength: 3,
              })}
            />
            {errors.name && errors.name.type === 'minLength' && (
              <p className="error">{t('signup.errors.minName')}</p>
            )}
            {errors.name && errors.name.type === 'maxLength' && (
              <p className="error">{t('signup.errors.maxName')}</p>
            )}
            {errors.name && <p className="error">{errors.name.message}</p>}
          </label>
        </div>
        <div className="form-element-wrapper">
          <label className="form-label">
            <input
              className={errors.login ? 'form-input input-error' : 'form-input'}
              type="text"
              placeholder={t('signup.placeholder.login')}
              {...register('login', {
                required: t('signup.require.login'),
                maxLength: 15,
                minLength: 3,
              })}
            />
            {errors.login && errors.login.type === 'minLength' && (
              <p className="error">{t('signup.errors.minLogin')}</p>
            )}
            {errors.login && errors.login.type === 'maxLength' && (
              <p className="error">{t('signup.errors.maxLogin')}</p>
            )}
            {errors.login && <p className="error">{errors.login.message}</p>}
          </label>
        </div>
        <div className="form-element-wrapper">
          <label className="form-label">
            <input
              className={errors.password ? 'form-input input-error' : 'form-input'}
              type="password"
              placeholder={t('signup.placeholder.password')}
              {...register('password', {
                required: t('signup.require.password'),
                maxLength: 15,
                minLength: 3,
              })}
            />
            {errors.password && errors.password.type === 'minLength' && (
              <p className="error">{t('signup.errors.minPassword')}</p>
            )}
            {errors.password && errors.password.type === 'maxLength' && (
              <p className="error">{t('signup.errors.maxPassword')}</p>
            )}
            {errors.password && <p className="error">{errors.password.message}</p>}
          </label>
        </div>

        <button className="btn" type="submit">
          {t('signup.registerBtn')}
        </button>
      </form>
      <div>
        {t('signup.haveAccaunt')}{' '}
        <NavLink className="link link-text" to="/login">
          {t('signup.enterBtn')}
        </NavLink>
      </div>
    </div>
  );
};

export default SignupPage;
