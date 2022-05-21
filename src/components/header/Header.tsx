import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../../redux/hooks/redux';
import { logout } from '../../redux/userSlice';
import ModalFormBoardCreate from '../MainPage/ModalFormBoardCreate';
import { deleteUser } from '../../redux/DeleteUserSlice';
import { buttonName, lngs } from '../../constants/Constants';

import './header.css';

const Header = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuth, token } = useAppSelector((store) => store.user);
  const [navbar, setNavbar] = useState<boolean>(false);
  const { t, i18n } = useTranslation();

  useEffect((): void => {
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
      <h1 className="header-title">{t('header.title')}</h1>
      {isAuth && (
        <div className="menu-container">
          <Link className="edit-link" to={'/edit'}>
            <button className="button edit-btn"></button>
          </Link>
          <button className="button logout-btn" onClick={logoutHandler}></button>
          <button className="button user-delete-btn" onClick={deleteUserHandler}></button>
          <button className="button create-board-btn" onClick={togglePopup}></button>
          <button className="button en-btn" onClick={() => i18n.changeLanguage(lngs.en)}></button>
          <button className="button ru-btn" onClick={() => i18n.changeLanguage(lngs.ru)}></button>
          {createBoardClicked ? (
            <div className="modal-form-create-container">
              <div className="popup-body">
                <ModalFormBoardCreate />
                <button className="close-modal-btn" onClick={togglePopup}>
                  {t('board.close')}
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
