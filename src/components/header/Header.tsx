import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../redux/hooks/redux';
import { logout } from '../../redux/userSlice';
import ModalFormBoardCreate from '../MainPage/ModalFormBoardCreate';
import { deleteUser } from '../../redux/DeleteUserSlice';

import './header.css';
import { appName, buttonName, headerBTNs } from '../../constants/Constants';

const Header = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuth, token } = useAppSelector((store) => store.user);
  const [navbar, setNavbar] = useState<boolean>(false);

  useEffect(() => {
    if (!token && !isAuth) {
      return navigate('/');
    }
  }, [isAuth]);
  const [createBoardClicked, setCreateBoardToggle] = useState(false);

  const togglePopup = (): void => {
    setCreateBoardToggle(!createBoardClicked);
  };

  const logoutHandler = (): void => {
    dispatch(logout());
    //TODO confirmation window Are you shure delete user?
  };

  const deleteUserHandler = (): void => {
    //TODO confirmation window Are you shure delete user?
    //TODO also delete user's tasks
    dispatch(deleteUser());
    return navigate('/');
  };

  const setActiveNavbar = () => {
    if (window.scrollY >= 100) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  window.addEventListener('scroll', setActiveNavbar);

  return (
    <header className={navbar ? 'header-active' : ''}>
      <h1 className="header-title">{appName}</h1>
      {isAuth && (
        <div className="menu-container">
          <Link className="edit-link link" to={'/edit'}>
            <div className="header-btn">
              <div className="btn-text">{headerBTNs.editProfile}</div>
              <div className="edit-btn"></div>
            </div>
          </Link>
          <div className="header-btn" onClick={logoutHandler}>
            <div className="btn-text">{headerBTNs.logOut}</div>
            <div className="logout-btn"></div>
          </div>
          <div className="header-btn" onClick={deleteUserHandler}>
            <div className="btn-text">{headerBTNs.deleteProfile}</div>
            <div className="user-delete-btn"></div>
          </div>
          <div className="header-btn" onClick={togglePopup}>
            <div className="btn-text">{headerBTNs.createBoard}</div>
            <div className="create-board-btn"></div>
          </div>
          <button className="header-btn en-btn"></button>
          <button className="header-btn ru-btn"></button>
          {createBoardClicked ? (
            <div className="modal-form-create-container">
              <div className="popup-body">
                <ModalFormBoardCreate />
                <button className="close-modal-btn" onClick={togglePopup}>
                  {buttonName.close}
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
