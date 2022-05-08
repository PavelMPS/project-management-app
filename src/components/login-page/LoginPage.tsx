import React, { useEffect } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink, Route, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getUser } from '../../redux/apiReducer';
import { setAuthCredentials } from '../../redux/userSlice';

export interface ILoginData {
  login: string;
  password: string;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { authLogin, authPass, token, isAuth } = useAppSelector((store) => store.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginData>();

  const onSubmit: SubmitHandler<ILoginData> = (data) => {
    dispatch(setAuthCredentials(data));
  };

  useEffect(() => {
    if (authLogin && authPass) {
      dispatch(getUser(authLogin, authPass));
    }
  }, [authPass]);

  useEffect(() => {
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
            <input type="submit" value="Войти" />
          </div>
        </form>
        Нет аккаунта?
        <NavLink to="/sign-up">
          <button>Зарегистрироваться</button>
        </NavLink>
      </div>
    </>
  );
};

export default LoginPage;
