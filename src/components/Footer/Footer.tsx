import React from 'react';

import './footer.css';

const Footer = (): JSX.Element => {
  return (
    <footer>
      <div className="footer-container">
        <div className="github-container">
          <a href="https://github.com/aiyoy" target="_blank" rel="noreferrer">
            Veronika Yaschenkova
          </a>
          <a href="https://github.com/vitalysoroko95" target="_blank" rel="noreferrer">
            Vitaliy Soroko
          </a>
          <a href="https://github.com/PavelMPS/" target="_blank" rel="noreferrer">
            Pavel Mazhaiski
          </a>
        </div>
        <div className="year">2022</div>
        <a href="https://rs.school/react/" target="_blank" rel="noreferrer">
          <div className="rsschool-logo"></div>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
