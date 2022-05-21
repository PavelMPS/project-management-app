import React, { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { buttonName, createBoardSettings } from '../../constants/Constants';

import { createBoard } from '../../redux/CreateBoardSlice';
import { fetchBoards } from '../../redux/MainSlice';
import { AppDispatch } from '../../redux/Store';

import './modalFormBoardCreate.css';

const ModalFormBoardCreate = (): JSX.Element => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const createBoardHandler = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    await dispatch(createBoard({ title, description }));
    await dispatch(fetchBoards());
  };

  return (
    <div className="popup-content">
      <h2 className="modal-board-title">{createBoardSettings.createBoard}</h2>
      <form className="modal-board-form">
        <label className="form-label board-label">
          <p className="title-label">{createBoardSettings.title}</p>
          <input
            className="edit-input"
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Enter board title"
            value={title}
          />
        </label>
        <label className="form-label board-label">
          <p className="description-label">{createBoardSettings.description}</p>
          <input
            className="edit-input"
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            placeholder="Enter board description"
            value={description}
          />
        </label>
        <button className="board-create-btn" onClick={createBoardHandler}>
          {buttonName.create}
        </button>
      </form>
    </div>
  );
};

export default ModalFormBoardCreate;
