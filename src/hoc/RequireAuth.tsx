import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  const isAuth = localStorage.getItem('isAuth');

  useEffect(() => {
    if (isAuth === 'Auth') {
      return navigate('/main');
    }
  }, [isAuth]);

  return children;
};

export { RequireAuth };
