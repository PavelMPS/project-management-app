import React from 'react';
import { Link } from 'react-router-dom';

import './header.css';

const Header = (): JSX.Element => {
  return (
    <header>
      <h1 className="header-title">Project managment application</h1>
      <div className="menu-container">
        <Link to={'/edit'}>
          <button className="button">Edit profile</button>
        </Link>
        <Link to={'/'}>
          <button className="button">Logout</button>
        </Link>

        <button className="button">User delete</button>
        <button className="button">Create new board</button>
        <button className="button">Change lang(будет тогглер)</button>
      </div>
    </header>
  );
};

export default Header;
