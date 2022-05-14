import React from 'react';
import { NavLink } from 'react-router-dom';

const WelcomePage = (): JSX.Element => {
  return (
    <>
      <h1>Welcome</h1>
      <div className="signup-container">
        <NavLink to="/login">
          <button>Log In</button>
        </NavLink>
        <NavLink to="sign-up">
          <button>Sign up</button>
        </NavLink>
      </div>
    </>
  );
};

export default WelcomePage;
