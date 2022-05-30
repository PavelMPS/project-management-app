import { useEffect, useState } from 'react';
import ReactDom from 'react-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { selectTheme } from '../../redux/ThemeSlice';

import './confirmation.css';

const Confirmation: (props: {
  onCancel: () => void;
  onSubmit: () => void;
}) => JSX.Element = (props: { onCancel: () => void; onSubmit: () => void }): JSX.Element => {
  const root = document.createElement('div');
  const { t } = useTranslation();
  const selectsTheme = useSelector(selectTheme);
  const [theme, setThemeApp] = useState<string>();

  useEffect(() => {
    setThemeApp(`confirmation-window ${selectsTheme}`);
  }, [selectsTheme]);

  useEffect((): (() => void) => {
    document.body.appendChild(root);
    return (): void => {
      document.body.removeChild(root);
    };
  });

  return ReactDom.createPortal(
    <>
      <div
        className="confirmation-window-overly"
        onClick={(event) => event.currentTarget === event.target && props.onCancel()}
      >
        <div className={theme}>
          <div
            className="small-btn close confirmation-modal-btn"
            onClick={(event) => event.currentTarget === event.target && props.onCancel()}
          ></div>
          <div className="confirmation-title">{t('modal.agree')}</div>
          <button
            className="btn"
            onClick={(event) => event.currentTarget === event.target && props.onSubmit()}
          >
            {t('modal.yes')}
          </button>
        </div>
      </div>
    </>,
    root
  );
};

export default Confirmation;
