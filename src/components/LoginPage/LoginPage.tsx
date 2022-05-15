import React, { useEffect } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink, Route, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/redux';
import { getUser } from '../../redux/ApiReducer';
import { setAuthCredentials } from '../../redux/UserSlice';
import { buttonName, loginSettings } from '../../constants/constants';

export interface ILoginData {
  login: string;
  password: string;
}

const LoginPage = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { authLogin, authPass, token, isAuth } = useAppSelector((store) => store.user);

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
    if (token && isAuth) {
      return navigate('/main');
    }
  }, [isAuth]);

  return (
    <>
      <div className="login-page">
        <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
          <input type="text" placeholder="Введите логин" {...register('login')} />
          <input type="password" placeholder="Введите пароль" {...register('password')} />
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
