import React from 'react';
import { authorsName, year } from '../../constants/Constants';

import './footer.css';

const Footer = (): JSX.Element => {
  return (
    <footer>
      <div className="footer-container">
        <div className="github-container">
          <a href="https://github.com/aiyoy" target="_blank" rel="noreferrer">
            {authorsName.veronika}
          </a>
          <a href="https://github.com/vitalysoroko95" target="_blank" rel="noreferrer">
            {authorsName.vitaliy}
          </a>
          <a href="https://github.com/PavelMPS/" target="_blank" rel="noreferrer">
            {authorsName.pavel}
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
