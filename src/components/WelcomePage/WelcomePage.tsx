import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/redux';
import { useTranslation } from 'react-i18next';

import { getTokenFromLocalStorage } from '../../redux/ColumnSlice';
import { getIdFromToken } from '../../redux/EditProfileSlice';
import { getUserAuth } from '../../redux/userSlice';
import ProfileCard from '../ProfileCard/ProfileCard';

import './welcomePage.css';

const WelcomePage = (): JSX.Element => {
  const { t } = useTranslation();
  const { isAuth } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = getTokenFromLocalStorage();
    if (token) {
      const userId = getIdFromToken(token);
      dispatch(getUserAuth({ id: userId, token }));
    } else {
      if (!isAuth) {
        return navigate('/');
      }
    }
  }, []);

  return (
    <div className="welcome-container">
      <div className="welcom-title-container">
        <h1>{t('welcome.title')}</h1>
        {!isAuth ? (
          <div className="signup-container">
            <NavLink className="link" to="/login">
              <div className="btn welcome-btn">{t('welcome.login')}</div>
            </NavLink>
            <NavLink className="link" to="/sign-up">
              <div className="btn sign-up-btn welcome-btn">{t('welcome.signup')}</div>
            </NavLink>
          </div>
        ) : (
          <div className="signup-container">
            <NavLink className="link" to="/main">
              <div className="btn">{t('welcome.toMain')}</div>
            </NavLink>
          </div>
        )}
      </div>

      <div className="team-info">
        <ProfileCard
          imgSrc={t('team.veronika.src')}
          name={t('team.veronika.name')}
          surname={t('team.veronika.surname')}
          age={t('team.veronika.age')}
          about={t('team.veronika.about')}
        />
        <ProfileCard
          imgSrc={t('team.pavel.src')}
          name={t('team.pavel.name')}
          surname={t('team.pavel.surname')}
          age={t('team.pavel.age')}
          about={t('team.pavel.about')}
        />
        <ProfileCard
          imgSrc={t('team.vitaly.src')}
          name={t('team.vitaly.name')}
          surname={t('team.vitaly.surname')}
          age={t('team.vitaly.age')}
          about={t('team.vitaly.about')}
        />
      </div>

      <div className="project-info">
        <h3>{t('aboutProject.title')}</h3>
        <p>{t('aboutProject.project')}</p>
        <h3>{t('aboutProject.functionality.title')}</h3>
        <ul>
          <li>{t('aboutProject.functionality.func_1')}</li>
          <li>{t('aboutProject.functionality.func_2')}</li>
          <li>{t('aboutProject.functionality.func_3')}</li>
          <li>{t('aboutProject.functionality.func_4')}</li>
          <li>{t('aboutProject.functionality.func_5')}</li>
        </ul>
        <h3>{t('aboutProject.develop.title')}</h3>
        <p>{t('aboutProject.develop.description')}</p>
        <p>{t('aboutProject.develop.work')}</p>
      </div>
      <div className="about-course">
        <h3>{t('aboutCourses.title')}</h3>
        <p>{t('aboutCourses.promo')}</p>
        <p>
          {t('aboutCourses.promo_2')}
          <a href="http://rollingscopes.com" target="_blank" rel="noreferrer">
            {t('aboutCourses.rs')}
          </a>
        </p>
        <p>{t('aboutCourses.pay_it_forward')}</p>
        <p>{t('aboutCourses.description')}</p>
      </div>
    </div>
  );
};

export default WelcomePage;
