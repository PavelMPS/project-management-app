import React from 'react';
import { NavLink } from 'react-router-dom';

const LoginPage = () => {
  return (
    <>
      <div className="login-page">
        <h1>Login page</h1>
        Нет аккаунта?
        <NavLink to="/sign-up">
          <button>Зарегистрироваться</button>
        </NavLink>
      </div>
    </>
  );
};

export default LoginPage;
