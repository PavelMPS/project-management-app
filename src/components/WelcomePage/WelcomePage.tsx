import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/redux';
import { useTranslation } from 'react-i18next';

import { getTokenFromLocalStorage } from '../../redux/ColumnSlice';
import { getIdFromToken } from '../../redux/EditProfileSlice';
import { getUserAuth } from '../../redux/userSlice';
import { Team } from '../../constants/Team';
import { AboutCourses } from '../../constants/About';
import { AboutProject } from '../../constants/About';
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
      <h1>{t('welcome.title')}</h1>
      {!isAuth ? (
        <div className="signup-container">
          <NavLink to="/login">
            <button>{t('welcome.login')}</button>
          </NavLink>
          <NavLink to="/sign-up">
            <button>{t('welcome.signup')}</button>
          </NavLink>
        </div>
      ) : (
        <div className="signup-container">
          <NavLink to="/main">
            <button>{t('welcome.toMain')}</button>
          </NavLink>
        </div>
      )}

      <div className="project-info">
        <h3>{AboutProject.title}</h3>
        <p>{AboutProject.project}</p>
        <h3>{AboutProject.functionality.title}</h3>
        <ul>
          <li>{AboutProject.functionality.func_1}</li>
          <li>{AboutProject.functionality.func_2}</li>
          <li>{AboutProject.functionality.func_3}</li>
          <li>{AboutProject.functionality.func_4}</li>
          <li>{AboutProject.functionality.func_5}</li>
        </ul>
        <h3>{AboutProject.develop.title}</h3>
        <p>{AboutProject.develop.description}</p>
        <p>{AboutProject.develop.work}</p>
      </div>
      <div className="about-course">
        <h3>{AboutCourses.title}</h3>
        <p>{AboutCourses.promo}</p>
        <p>
          {AboutCourses.promo_2}
          <a href="http://rollingscopes.com" target="_blank" rel="noreferrer">
            {AboutCourses.rs}
          </a>
        </p>
        <p>{AboutCourses.pay_it_forward}</p>
        <p>{AboutCourses.description}</p>
      </div>
      <div className="team-info">
        {Team.map((item: ITeam) => (
          <ProfileCard key={Team.indexOf(item)} {...item} />
        ))}
      </div>
    </div>
  );
};

export default WelcomePage;
