import React, { FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBoard, createBoardSlice, store } from '../../redux/CreateBoardSlice';
import { AppDispatch } from '../../redux/Store';

import './modalFormBoardCreate.css';

const ModalFormBoardCreate = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  function createBoardHandler(e: FormEvent) {
    const title = 'My super board';
    e.preventDefault();
    dispatch(createBoard(title));
    console.log('create board data');
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
          <input type="text" placeholder="Enter board title" />
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
