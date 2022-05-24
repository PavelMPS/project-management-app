import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../../redux/hooks/redux';
import { logout } from '../../redux/userSlice';
import ModalFormBoardCreate from '../MainPage/ModalFormBoardCreate';
import { deleteUser } from '../../redux/DeleteUserSlice';
import { lngs } from '../../constants/Constants';

import './header.css';
import Confirmation from '../Confirmation/Confirmation';

const Header = (): JSX.Element => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuth, token } = useAppSelector((store) => store.user);
  const [navbar, setNavbar] = useState<boolean>(false);
  const [language, toggleLanguage] = useState<boolean>(true);
  const [isConfirmationDeleteOpen, setIsConfirmationDeleteOpen] = useState<boolean>(false);

  useEffect((): void => {
    i18n.changeLanguage(lngs.en);
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
  };

  const deleteUserHandler = (): void => {
    setIsConfirmationDeleteOpen(true);
  };

  const deleteUserConfirmationSubmit = (): void => {
    setIsConfirmationDeleteOpen(false);
    dispatch(deleteUser());
    dispatch(logout());
  };

  const setActiveNavbar = () => {
    if (window.scrollY >= 100) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  const languageToggler = (): void => {
    language ? i18n.changeLanguage(lngs.ru) : i18n.changeLanguage(lngs.en);
    toggleLanguage(!language);
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
          <label className="checkbox-green">
            <input type="checkbox" onClick={languageToggler} />
            <span className="checkbox-green-switch" data-label-on="Ru" data-label-off="En"></span>
          </label>
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
      {isConfirmationDeleteOpen && (
        <Confirmation
          onCancel={() => setIsConfirmationDeleteOpen(false)}
          onSubmit={() => deleteUserConfirmationSubmit()}
        />
      )}
    </header>
  );
};

export default Header;
