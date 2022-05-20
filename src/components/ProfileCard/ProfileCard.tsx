import React from 'react';

import './profileCard.css';

interface IPofile {
  imgSrc: string;
  name: string;
  surname: string;
  age: string;
  about: string;
}

const ProfileCard = (props: IPofile): JSX.Element => {
  return (
    <div className="profile-container">
      <div className="photo">
        <img src={require(`../../assets/photo/${props.imgSrc}`)} alt="member-photo" />
      </div>
      <div className="information">
        <p>Name : {props.name}</p>
        <p>Surname : {props.surname}</p>
        <p>Age : {props.age} </p>
        <p>About : {props.about}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
