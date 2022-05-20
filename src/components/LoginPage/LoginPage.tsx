import React, { useEffect } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/redux';
import { getUser } from '../../redux/apiReducer';
import { setAuthCredentials } from '../../redux/userSlice';
import { buttonName, loginSettings } from '../../constants/Constants';

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
