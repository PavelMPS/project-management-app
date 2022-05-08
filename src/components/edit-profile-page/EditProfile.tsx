import React, { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { editProfile, getIdFromToken } from '../../redux/EditProfileSlice';
import { AppDispatch } from '../../redux/Store';

import './editProfile.css';

const EditProfile = (): JSX.Element => {
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  function editHandler(e: FormEvent) {
    e.preventDefault();
    const id = getIdFromToken();
    dispatch(editProfile({ userID: id, name: name, login: login, password: password }));
  }
  return (
    <>
      <div className="edit-container">
        <h2 className="edit-title">Edit profile</h2>
        <form className="edit-form" onSubmit={editHandler}>
          <label className="form-label">
            <p className="title-label">
              New name:
              {/* <span className="errors">{errors[label] && errMess}</span> */}
            </p>
            <span>{name}</span>
            <input
              type="text"
              placeholder="Edit your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label className="form-label">
            <p className="title-label">
              New login:
              {/* <span className="errors">{errors[label] && errMess}</span> */}
            </p>
            <span>{login}</span>
            <input
              type="text"
              placeholder="Edit your login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
          </label>
          <label className="form-label">
            <p className="title-label">
              New password:
              {/* <span className="errors">{errors[label] && errMess}</span> */}
            </p>
            <span>{password}</span>
            <input
              type="text"
              placeholder="Edit your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button className="button edit-submit-btn">SUBMIT</button>
          <button className="button edit-cancel-btn">CANCEL</button>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
