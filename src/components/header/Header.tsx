import React, { useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { logout } from '../../redux/userSlice';
import ModalFormBoardCreate from '../modal-form-board-create/ModalFormBoardCreate';
import { getIdFromToken } from '../../redux/EditProfileSlice';

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
  const [createBoardClicked, setCreateBoardToggle] = useState(false);
  function togglePopup(): void {
    setCreateBoardToggle(!createBoardClicked);
  }
  return (
    <header>
      <h1 className="header-title">Project managment application</h1>

      {isAuth && (
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
          <button
            className="button user-delete-btn"
            onClick={() => {
              getIdFromToken();
            }}
          ></button>
          <button className="button create-board-btn" onClick={togglePopup}></button>
          <button className="button en-btn"></button>
          <button className="button ru-btn"></button>
          {createBoardClicked ? (
            <div className="modal-form-create-container">
              <div className="popup-body">
                <ModalFormBoardCreate />
                <button className="close-modal-btn" onClick={togglePopup}>
                  CLOSE
                </button>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
