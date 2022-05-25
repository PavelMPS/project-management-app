import { useEffect } from 'react';
import ReactDom from 'react-dom';
import { useTranslation } from 'react-i18next';

import './confirmation.css';

const Confirmation: (props: {
  onCancel: () => void;
  onSubmit: () => void;
}) => JSX.Element = (props: { onCancel: () => void; onSubmit: () => void }): JSX.Element => {
  const root = document.createElement('div');
  const { t } = useTranslation();
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
        <div className="confirmation-window">
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
