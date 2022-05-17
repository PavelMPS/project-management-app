import React, { useEffect } from 'react';

import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/redux';

import { buttonName, pageName } from '../../constants/Constants';
import { getTokenFromLocalStorage } from '../../redux/ColumnSlice';
import { getIdFromToken } from '../../redux/EditProfileSlice';
import { getUserAuth } from '../../redux/apiReducer';

const WelcomePage = (): JSX.Element => {
  const { isAuth } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = getTokenFromLocalStorage();
    if (token) {
      const userId = getIdFromToken(token);
      dispatch(getUserAuth(userId, token));
    } else {
      if (!isAuth) {
        return navigate('/');
      }
    }
  }, []);

  return (
    <>
      <h1>{pageName.welcome}</h1>
      {!isAuth ? (
        <div className="signup-container">
          <NavLink to="/login">
            <button>{buttonName.logIn}</button>
          </NavLink>
          <NavLink to="/sign-up">
            <button>{buttonName.signUp}</button>
          </NavLink>
        </div>
      ) : (
        <div className="signup-container">
          <NavLink to="/main">
            <button>{buttonName.goToMainPage}</button>
          </NavLink>
        </div>
      )}
    </>
  );
};

export default WelcomePage;
