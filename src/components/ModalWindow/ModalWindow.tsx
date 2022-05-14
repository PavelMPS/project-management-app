import { useEffect } from 'react';
import ReactDom from 'react-dom';

import './modalWindow.css';

export const ModalWindow: (props: {
  children: JSX.Element;
  onClick: () => void;
}) => JSX.Element = (props: { children: JSX.Element; onClick: () => void }): JSX.Element => {
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
        className="modal-window-overly"
        onClick={(event) => event.currentTarget === event.target && props.onClick()}
      >
        <div className="modal-window">
          <div
            className="modal-close-icon"
            onClick={(event) => event.currentTarget === event.target && props.onClick()}
          ></div>
          <div>{props.children}</div>
        </div>
      </div>
    </>,
    root
  );
};
