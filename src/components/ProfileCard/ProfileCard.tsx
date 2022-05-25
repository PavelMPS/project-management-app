import React from 'react';
import { useTranslation } from 'react-i18next';

import './profileCard.css';

interface IPofile {
  imgSrc: string;
  name: string;
  surname: string;
  age: string;
  about: string;
}

const ProfileCard = (props: IPofile): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className="profile-container">
      <div className="photo">
        <img src={require(`../../assets/photo/${props.imgSrc}`)} alt="member-photo" />
      </div>
      <div className="information">
        <p>
          {t('profile.name')} : {props.name}
        </p>
        <p>
          {t('profile.surname')} : {props.surname}
        </p>
        <p>
          {t('profile.age')}: {props.age}
        </p>
        <p>
          {t('profile.about')} : {props.about}
        </p>
      </div>
    </div>
  );
};

export default ProfileCard;
