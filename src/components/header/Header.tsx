import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createBoardSlice, store } from '../../redux/CreateBoardSlice';
import ModalFormBoardCreate from '../modal-form-board-create/ModalFormBoardCreate';

import './header.css';

const Header = (): JSX.Element => {
  const [createBoardClicked, setCreateBoardToggle] = useState(false);
  function togglePopup(): void {
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
        <button className="button create-board-btn" onClick={togglePopup}></button>
        <button className="button en-btn"></button>
        <button className="button ru-btn"></button>
        {createBoardClicked ? (
          <div className="modal-form-create-container">
            <div className="popup-body">
              <ModalFormBoardCreate />
              <button className="close-modal-btn" onClick={togglePopup}>
                CLOSE
              </button>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </header>
  );
};

export default Header;
