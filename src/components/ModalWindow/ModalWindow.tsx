import { useEffect, useState } from 'react';
import ReactDom from 'react-dom';
import { useSelector } from 'react-redux';

import { selectTheme } from '../../redux/ThemeSlice';

import './modalWindow.css';

const ModalWindow: (props: {
  children: JSX.Element;
  onClick: () => void;
}) => JSX.Element = (props: { children: JSX.Element; onClick: () => void }): JSX.Element => {
  const root = document.createElement('div');

  const selectsTheme = useSelector(selectTheme);
  const [theme, setThemeApp] = useState<string>();

  useEffect(() => {
    setThemeApp(`modal-window ${selectsTheme}`);
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
        className="modal-window-overly"
        onClick={(event) => event.currentTarget === event.target && props.onClick()}
      >
        <div className={theme}>
          <div
            className="small-btn close modal-btn"
            onClick={(event) => event.currentTarget === event.target && props.onClick()}
          ></div>
          <div>{props.children}</div>
        </div>
      </div>
    </>,
    root
  );
};

export default ModalWindow;
