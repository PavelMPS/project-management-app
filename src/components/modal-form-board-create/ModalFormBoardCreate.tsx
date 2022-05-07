import React, { FormEvent } from 'react';

import './modalFormBoardCreate.css';

const ModalFormBoardCreate = (): JSX.Element => {
  function createBoardHandler(e: FormEvent) {
    e.preventDefault();
    //add data to server
    console.log('create board data');
  }

  function closeFormModal() {
    //close window without changes
    console.log('closing form...');
  }

  return (
    <div className="modal-form-create-container">
      <div className="popup-body">
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
          <button className="close-modal-btn" onClick={closeFormModal}>
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalFormBoardCreate;
