import React from 'react';

import './editProfile.css';

const EditProfile = (): JSX.Element => {
  return (
    <>
      <div className="edit-container">
        <h2 className="edit-title">Edit profile</h2>
        <form className="edit-form">
          <label className="form-label">
            <p className="title-label">
              Name:
              {/* <span className="errors">{errors[label] && errMess}</span> */}
            </p>
            <input type="text" placeholder="Edit your name" />
          </label>
          <label className="form-label">
            <p className="title-label">
              Login:
              {/* <span className="errors">{errors[label] && errMess}</span> */}
            </p>
            <input type="text" placeholder="Edit your login" />
          </label>
          <label className="form-label">
            <p className="title-label">
              Password:
              {/* <span className="errors">{errors[label] && errMess}</span> */}
            </p>
            <input type="text" placeholder="Edit your password" />
          </label>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
