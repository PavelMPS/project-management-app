import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../../redux/hooks/redux';
import { logout } from '../../redux/userSlice';
import ModalFormBoardCreate from '../MainPage/ModalFormBoardCreate';
import { deleteUser } from '../../redux/DeleteUserSlice';
import { lngs } from '../../constants/Constants';

import './header.css';
import { headerBTNs } from '../../constants/Constants';
import Confirmation from '../Confirmation/Confirmation';
import ModalWindow from '../ModalWindow/ModalWindow';

const Header = (): JSX.Element => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuth, token } = useAppSelector((store) => store.user);
  const [navbar, setNavbar] = useState<boolean>(false);
  const [language, toggleLanguage] = useState<boolean>(true);
  const [isConfirmationDeleteOpen, setIsConfirmationDeleteOpen] = useState<boolean>(false);
  const [isConfirmationLogoutOpen, setIsConfirmationLogoutOpen] = useState<boolean>(false);
  const [isModalCreateBoardOpen, setIsModalCreateBoardOpen] = useState<boolean>(false);

  useEffect((): void => {
    i18n.changeLanguage(lngs.en);
    if (!token && !isAuth) {
      return navigate('/');
    }
  }, [isAuth]);

  const logoutHandler = (): void => {
    setIsConfirmationLogoutOpen(true);
  };

  const deleteUserHandler = (): void => {
    setIsConfirmationDeleteOpen(true);
  };

  const deleteUserConfirmationSubmit = (): void => {
    setIsConfirmationDeleteOpen(false);
    dispatch(deleteUser());
    dispatch(logout());
  };

  const logoutUserConfirmationSubmit = (): void => {
    setIsConfirmationLogoutOpen(false);
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

  const handleModalClose = (): void => {
    setIsModalCreateBoardOpen(false);
  };

  const createBoardHandler = (): void => {
    setIsModalCreateBoardOpen(true);
  };

  window.addEventListener('scroll', setActiveNavbar);

  return (
    <header className={navbar ? 'header-active' : ''}>
      <h1 className="header-title">{t('header.title')}</h1>
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
          <div className="header-btn" onClick={createBoardHandler}>
            <div className="btn-text">{headerBTNs.createBoard}</div>
            <div className="create-board-btn"></div>
          </div>
          <label className="checkbox-green">
            <input type="checkbox" onClick={languageToggler} />
            <span className="checkbox-green-switch" data-label-on="Ru" data-label-off="En"></span>
          </label>
        </div>
      )}
      {isConfirmationDeleteOpen && (
        <Confirmation
          onCancel={() => setIsConfirmationDeleteOpen(false)}
          onSubmit={() => deleteUserConfirmationSubmit()}
        />
      )}
      {isConfirmationLogoutOpen && (
        <Confirmation
          onCancel={() => setIsConfirmationLogoutOpen(false)}
          onSubmit={() => logoutUserConfirmationSubmit()}
        />
      )}
      {isModalCreateBoardOpen && (
        <ModalWindow onClick={handleModalClose}>
          <ModalFormBoardCreate />
        </ModalWindow>
      )}
    </header>
  );
};

export default Header;
