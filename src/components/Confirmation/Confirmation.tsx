import { useEffect } from 'react';
import ReactDom from 'react-dom';

import { confirmation, submitBTNText, cancelBTNText } from '../../constants/Constants';

import './confirmation.css';

const Confirmation: (props: {
  onCancel: () => void;
  onSubmit: () => void;
}) => JSX.Element = (props: { onCancel: () => void; onSubmit: () => void }): JSX.Element => {
  const root = document.createElement('div');

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
          <div className="confirmation-title">{confirmation}</div>
          <button
            className="confirmation-submit"
            onClick={(event) => event.currentTarget === event.target && props.onSubmit()}
          >
            {submitBTNText}
          </button>
          <button
            className="confirmation-cancel"
            onClick={(event) => event.currentTarget === event.target && props.onCancel()}
          >
            {cancelBTNText}
          </button>
        </div>
      </div>
    </>,
    root
  );
};

export default Confirmation;
