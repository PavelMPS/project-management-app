import React, { useEffect } from 'react';

import './BoardPrew.css';

export const BoardPrew = (props: { boardInf: IBoard }): JSX.Element => {
  return (
    <>
      <div className="board-prew-container">
        <div className="board-prew-title">{props.boardInf.title}</div>
        <div
          className="board-prew-bin"
          onClick={() => console.log('тут будет функция удаления')}
        ></div>
      </div>
    </>
  );
};
