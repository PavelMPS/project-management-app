import React, { useEffect } from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../redux/hooks/redux';
import { setUser } from '../../redux/apiReducer';
import { setCredentials } from '../../redux/userSlice';
import { buttonName, loginSettings, pageName } from '../../constants/Constants';

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

  useEffect((): void => {
    if (name && login && password) {
      dispatch(setUser({ name, login, password }));
    }
  }, [name, login, password]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserCredentials>();

  const onSubmit: SubmitHandler<IUserCredentials> = (data): void => {
    dispatch(setCredentials(data));
    /*  if (name && login && password) {
      dispatch(setUser({ name, login, password }));
    } */
  };

  return (
    <div className="sign-up-page">
      <h1>{pageName.signUp}</h1>
      <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Введите имя" {...register('name')} />
        <input type="text" placeholder="Введите никнейм" {...register('login')} />
        <input type="password" placeholder="Введите пароль" {...register('password')} />
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
