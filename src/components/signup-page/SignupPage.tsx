import React from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setUser } from '../../redux/apiReducer';
import { setCredentials } from '../../redux/userSlice';

export interface IUserCredentials {
  name: string;
  login: string;
  password: string;
}

const SignupPage = () => {
  const dispatch = useAppDispatch();
  const { name, login, password } = useAppSelector((store) => store.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserCredentials>();

  const onSubmit: SubmitHandler<IUserCredentials> = (data) => {
    dispatch(setCredentials(data));
    if (name && login && password) {
      dispatch(setUser({ name, login, password }));
    }
  };

  return (
    <div className="sign-up-page">
      <h1>Sign-up page</h1>
      <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Введите имя" {...register('name')} />
        <input type="text" placeholder="Введите никнейм" {...register('login')} />
        <input type="password" placeholder="Введите пароль" {...register('password')} />
        <div className="sendButton">
          <input type="submit" value="Регистрация" />
        </div>
      </form>
      Есть аккаунт?
      <NavLink to="/login">
        <button>Войти</button>
      </NavLink>
    </div>
  );
};

export default SignupPage;
