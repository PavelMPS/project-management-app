import React, { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBoard } from '../../redux/CreateBoardSlice';
import { AppDispatch } from '../../redux/Store';

import './modalFormBoardCreate.css';

const ModalFormBoardCreate = (): JSX.Element => {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  function createBoardHandler(e: FormEvent) {
    e.preventDefault();
    dispatch(createBoard(title));
    console.log('create board data ' + title);
  }

  return (
    <div className="popup-content">
      <h2 className="modal-board-title">Create board</h2>
      <form className="modal-board-form">
        <label className="form-label board-label">
          <p className="title-label">
            Board title:
            {/* <span className="errors">{errors[label] && errMess}</span> */}
          </p>
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Enter board title"
            value={title}
          />
        </label>
        <label className="form-label board-label">
          <p className="title-label">
            Description:
            {/* <span className="errors">{errors[label] && errMess}</span> */}
          </p>
          <input type="text" placeholder="Enter board description" />
        </label>
        <button className="board-create-btn" onClick={createBoardHandler}>
          CREATE
        </button>
      </form>
    </div>
  );
};

export default ModalFormBoardCreate;
