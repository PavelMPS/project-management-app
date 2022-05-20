import React from 'react';
import { cardInfo } from '../../constants/Constants';

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
        <p>
          {cardInfo.name} : {props.name}
        </p>
        <p>
          {cardInfo.surname} : {props.surname}
        </p>
        <p>
          {cardInfo.age}: {props.age}
        </p>
        <p>
          {cardInfo.about} : {props.about}
        </p>
      </div>
    </div>
  );
};

export default ProfileCard;
