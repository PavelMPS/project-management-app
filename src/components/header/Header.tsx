import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ModalFormBoardCreate from '../modal-form-board-create/ModalFormBoardCreate';

import './header.css';

const Header = (): JSX.Element => {
  const [createBoardClicked, setCreateBoardToggle] = useState(false);
  function createBoardToggle() {
    setCreateBoardToggle(!createBoardClicked);
  }
  return (
    <header>
      <h1 className="header-title">Project managment application</h1>
      <div className="menu-container">
        <Link className="edit-link" to={'/edit'}>
          <button className="button edit-btn"></button>
        </Link>
        <Link to={'/'}>
          <button className="button logout-btn"></button>
        </Link>

        <button className="button user-delete-btn"></button>
        <button className="button create-board-btn" onClick={createBoardToggle}></button>
        <button className="button en-btn"></button>
        <button className="button ru-btn"></button>
        {createBoardClicked ? <ModalFormBoardCreate /> : ''}
      </div>
    </header>
  );
};

export default Header;
