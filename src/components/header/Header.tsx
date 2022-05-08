import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { logout } from '../../redux/userSlice';

import './header.css';

const Header = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuth, token } = useAppSelector((store) => store.user);
  useEffect(() => {
    if (!token && !isAuth) {
      return navigate('/');
    }
  }, [isAuth]);
  return (
    <header>
      <h1 className="header-title">Project managment application</h1>
      <div className="menu-container">
        <Link className="edit-link" to={'/edit'}>
          <button className="button edit-btn"></button>
        </Link>
        <button
          className="button logout-btn"
          onClick={() => {
            dispatch(logout());
          }}
        ></button>
        <button className="button user-delete-btn"></button>
        <button className="button create-board-btn"></button>
        <button className="button en-btn"></button>
        <button className="button ru-btn"></button>
      </div>
    </header>
  );
};

export default Header;
