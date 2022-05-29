import { useTranslation } from 'react-i18next';

import './profileCard.css';

const ProfileCard = ({ name, surname, imgSrc, age, about }: IPofile): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className="profile-container">
      <div className="photo">
        <img src={require(`../../assets/photo/${imgSrc}`)} alt="member-photo" />
      </div>
      <div className="information">
        <div className="information-name">
          {name} {surname}
        </div>
        <div className="information-age">
          {t('profile.age')}: {age}
        </div>
        <div className="information-about">
          {t('profile.about')} : {about}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
