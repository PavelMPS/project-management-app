import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectBoards, selectBoardsFetchStatus, fetchBoards } from '../../redux/MainSlice';
import { AppDispatch } from '../../redux/Store';

const Main = (): JSX.Element => {
  const boards: IBoard = useSelector(selectBoards);
  const status: string = useSelector(selectBoardsFetchStatus);

  const dispatch = useDispatch<AppDispatch>();

  useEffect((): void => {
    if (status === 'idle') {
      dispatch(fetchBoards());
    }
    console.log(status, boards);
  }, []);

  // console.log(status, boards);

  return (
    <>
      <h1>Main</h1>
    </>
  );
};

export default Main;
