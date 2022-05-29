import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { useAppDispatch, useAppSelector } from '../../redux/hooks/redux';
import { logout } from '../../redux/userSlice';
import { deleteUser } from '../../redux/DeleteUserSlice';
import { lngs, themes } from '../../constants/Constants';
import Confirmation from '../Confirmation/Confirmation';
import ModalWindow from '../ModalWindow/ModalWindow';
import { selectTheme, setTheme } from '../../redux/ThemeSlice';

import './header.css';
import BoardForm from '../MainPage/BoardForm';
import { doc } from 'prettier';

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

  const [themeValue, setThemeValue] = useState<boolean>(false);
  const appTheme = useSelector(selectTheme);

  useEffect((): void => {
    if (localStorage.getItem('i18nextLng') === lngs.en) {
      i18n.changeLanguage(lngs.en);
      toggleLanguage(false);
    } else {
      i18n.changeLanguage(lngs.ru);
      toggleLanguage(true);
    }
    if (!token && !isAuth) {
      return navigate('/');
    }
  }, [isAuth, i18n]);

  useEffect((): void => {
    if (localStorage.getItem('theme') === themes.dark) {
      setThemeValue(true);
    } else {
      setThemeValue(false);
    }
  }, []);

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

  const languageToggler = (): void => {
    language ? i18n.changeLanguage(lngs.en) : i18n.changeLanguage(lngs.ru);
    toggleLanguage(!language);
  };

  const handleModalClose = (): void => {
    setIsModalCreateBoardOpen(false);
  };

  const createBoardHandler = (): void => {
    setIsModalCreateBoardOpen(true);
  };

  const changeTheme = (): void => {
    let newTheme: string;
    if (appTheme === themes.dark) {
      newTheme = themes.light;
      setThemeValue(false);
    } else {
      newTheme = themes.dark;
      setThemeValue(true);
    }
    dispatch(setTheme(newTheme));
    localStorage.setItem('theme', newTheme);
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
      <Link to="/">
        <div className="logo"></div>
      </Link>
      <div className="header-btns-container">
        {isAuth && (
          <div className="menu-container">
            <Link className="edit-link link" to={'/edit'}>
              <div className="header-btn">
                <div className="btn-text">{t('header.edit')}</div>
                <div className="edit-btn"></div>
              </div>
            </Link>
            <div className="header-btn" onClick={logoutHandler}>
              <div className="btn-text">{t('header.logout')}</div>
              <div className="logout-btn"></div>
            </div>
            <div className="header-btn" onClick={deleteUserHandler}>
              <div className="btn-text">{t('header.delete')}</div>
              <div className="user-delete-btn"></div>
            </div>
            <div className="header-btn" onClick={createBoardHandler}>
              <div className="btn-text">{t('header.create')}</div>
              <div className="create-board-btn"></div>
            </div>
          </div>
        )}
        <div className="toglers-container">
          <label htmlFor="checkbox" className="togler-container">
            <input
              className="checkbox"
              type="checkbox"
              id="checkbox"
              checked={language}
              onChange={languageToggler}
            />
            <span className="togler-ball"></span>
            <b className="ru">{'RU'}</b>
            <b className="en">{'EN'}</b>
          </label>
          <label htmlFor="checkbox-theme" className="togler-container">
            <input
              className="checkbox"
              type="checkbox"
              id="checkbox-theme"
              onChange={changeTheme}
              checked={themeValue}
            />
            <span className="togler-ball"></span>
            <b className="sun"></b>
            <b className="moon"></b>
          </label>
        </div>
      </div>
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
          <BoardForm />
        </ModalWindow>
      )}
    </header>
  );
};

export default Header;
