import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/redux';
import { useTranslation } from 'react-i18next';

import { getTokenFromLocalStorage } from '../../redux/ColumnSlice';
import { getIdFromToken } from '../../redux/EditProfileSlice';
import { getUserAuth } from '../../redux/userSlice';
import { Team } from '../../constants/Team';
import ProfileCard from '../ProfileCard/ProfileCard';

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
    <>
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
      <div className="team-info">
        {Team.map((item: ITeam) => (
          <ProfileCard key={Team.indexOf(item)} {...item} />
        ))}
      </div>
    </>
  );
};

export default WelcomePage;
