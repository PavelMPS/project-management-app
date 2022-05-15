import React from 'react';
import { NavLink } from 'react-router-dom';
import { buttonName, pageName } from '../../constants/constants';

const WelcomePage = (): JSX.Element => {
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
