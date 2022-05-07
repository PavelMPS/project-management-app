import React from 'react';

import { Link } from 'react-router-dom';

import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-page-title">
        <h2>This page does not exist. ...or does it? Try the homepage.</h2>
        <p>
          Try the <Link to="/">homepage.</Link>
        </p>
      </div>
      <div className="animation-container">
        <img src={require('../../assets/gif/notfound.gif')} alt="error animation" />
      </div>
    </div>
  );
};

export default NotFound;
