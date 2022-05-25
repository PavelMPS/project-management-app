import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import './notFound.css';

const NotFound = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className="not-found-page">
      <div className="not-found-page-title">
        <h2>{t('notFound.title')}</h2>
        <p>
          {t('notFound.tryThe')} <Link to="/">{t('notFound.homepage')}</Link>
        </p>
      </div>
      <div className="animation-container">
        <img src={require('../../assets/gif/notfound.gif')} alt="error animation" />
      </div>
    </div>
  );
};

export default NotFound;
