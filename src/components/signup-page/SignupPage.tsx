import React from 'react';
import { NavLink } from 'react-router-dom';

const SignupPage = () => {
  return (
    <>
      <div className="sign-up-page">
        <h1>Sign-up page</h1>
        Есть аккаунт?
        <NavLink to="/login">
          <button>Войти</button>
        </NavLink>
      </div>
    </>
  );
};

export default SignupPage;
