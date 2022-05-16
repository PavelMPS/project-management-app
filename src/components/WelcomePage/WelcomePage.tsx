import React, { useEffect } from 'react';

import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/redux';

import { buttonName, pageName } from '../../constants/Constants';
import { setToken } from '../../redux/userSlice';

const WelcomePage = (): JSX.Element => {
  const navigate = useNavigate();
  const { token, isAuth } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    userAuth();
    if (token && isAuth) {
      return navigate('/main');
    } else {
      return navigate('/');
    }
  }, [isAuth]);

  const userAuth = () => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(setToken(token));
    }
  };

  return (
    <>
      <h1>{pageName.welcome}</h1>
      <div className="signup-container">
        <NavLink to="/login">
          <button>{buttonName.logIn}</button>
        </NavLink>
        <NavLink to="sign-up">
          <button>{buttonName.signUp}</button>
        </NavLink>
      </div>
    </>
  );
};

export default WelcomePage;
