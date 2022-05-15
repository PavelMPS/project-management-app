import React from 'react';
import { Link } from 'react-router-dom';

import { notFoundSettings, pageName } from '../../constants/Constants';

import './notFound.css';

const NotFound = (): JSX.Element => {
  return (
    <div className="not-found-page">
      <div className="not-found-page-title">
        <h2>{pageName.notFound}</h2>
        <p>
          {notFoundSettings.tryThe} <Link to="/">{notFoundSettings.homepage}</Link>
        </p>
      </div>
      <div className="animation-container">
        <img src={require('../../assets/gif/notfound.gif')} alt="error animation" />
      </div>
    </div>
  );
};

export default NotFound;
