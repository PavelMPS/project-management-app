import { useTranslation } from 'react-i18next';

import './profileCard.css';

const ProfileCard = (props: IPofile): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className="profile-container">
      <div className="photo">
        <img src={require(`../../assets/photo/${props.imgSrc}`)} alt="member-photo" />
      </div>
      <div className="information">
        <div className="information-name">
          {props.name} {props.surname}
        </div>
        <div className="information-age">
          {t('profile.age')}: {props.age}
        </div>
        <div className="information-about">
          {t('profile.about')} : {props.about}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
