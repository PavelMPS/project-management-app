import React, { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBoard } from '../../redux/CreateBoardSlice';
import { fetchBoards } from '../../redux/MainSlice';
import { AppDispatch } from '../../redux/Store';

import './modalFormBoardCreate.css';

const ModalFormBoardCreate = (): JSX.Element => {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  async function createBoardHandler(e: FormEvent) {
    e.preventDefault();
    await dispatch(createBoard(title));
    await dispatch(fetchBoards());
  }

  return (
    <div className="popup-content">
      <h2 className="modal-board-title">Create board</h2>
      <form className="modal-board-form">
        <label className="form-label board-label">
          <p className="title-label">Board title:</p>
          <input
            className="edit-input"
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Enter board title"
            value={title}
          />
        </label>
        <button className="board-create-btn" onClick={createBoardHandler}>
          CREATE
        </button>
      </form>
    </div>
  );
};

export default ModalFormBoardCreate;
