import React from 'react';
import { useTranslation } from 'react-i18next';

import { year } from '../../constants/Constants';

import './footer.css';

const Footer = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <footer>
      <div className="footer-container">
        <div className="github-container">
          <a href="https://github.com/aiyoy" target="_blank" rel="noreferrer">
            {t('footer.veronika')}
          </a>
          <a href="https://github.com/vitalysoroko95" target="_blank" rel="noreferrer">
            {t('footer.vitaliy')}
          </a>
          <a href="https://github.com/PavelMPS/" target="_blank" rel="noreferrer">
            {t('footer.pavel')}
          </a>
        </div>
        <div className="year">{year}</div>
        <a href="https://rs.school/react/" target="_blank" rel="noreferrer">
          <div className="rsschool-logo"></div>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
