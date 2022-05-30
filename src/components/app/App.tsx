import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import EditProfile from '../EditProfilePage/EditProfilePage';
import Footer from '../Footer/Footer';
import Header from '../header/Header';
import LoginPage from '../LoginPage/LoginPage';
import Main from '../MainPage/MainPage';
import NotFound from '../NotFoundPage/NotFound';
import SignupPage from '../SignupPage/SignupPage';
import BoardPage from '../BoardPage/BoardPage';
import WelcomePage from '../WelcomePage/WelcomePage';
import Toast from '../Toast/Toast';
import { RequireAuth } from '../../hoc/RequireAuth';
import { getTokenFromLocalStorage } from '../../redux/ColumnSlice';
import { getUserAuth } from '../../redux/userSlice';
import { getIdFromToken } from '../../redux/EditProfileSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/redux';
import { themes } from '../../constants/Constants';
import { selectTheme, setTheme } from '../../redux/ThemeSlice';

import './App.css';

const App = (): JSX.Element => {
  const { isAuth } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [theme, setThemeApp] = useState<string>();
  const selectsTheme = useSelector(selectTheme);

  useEffect(() => {
    const token = getTokenFromLocalStorage();
    if (token) {
      const userId = getIdFromToken(token);
      dispatch(getUserAuth({ id: userId, token }));
    } else {
      if (!isAuth) {
        return navigate('/');
      }
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem('theme') && localStorage.getItem('theme') === themes.dark) {
      dispatch(setTheme(themes.dark));
    } else {
      dispatch(setTheme(themes.light));
    }
    setThemeApp(`body ${selectsTheme}`);
  }, [selectsTheme]);

  useEffect(() => {
    if (!isAuth) {
      return navigate('/');
    }
  }, [isAuth]);

  return (
    <div className={theme}>
      <Header />
      <div className="main-container">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/main" element={<Main />} />
          <Route path="/edit" element={<EditProfile />} />
          <Route
            path="/sign-up"
            element={
              <RequireAuth>
                <SignupPage />
              </RequireAuth>
            }
          />
          <Route
            path="/login"
            element={
              <RequireAuth>
                <LoginPage />
              </RequireAuth>
            }
          />
          <Route path="/board" element={<BoardPage />} />
        </Routes>
      </div>
      <Toast />
      <Footer />
    </div>
  );
};

export default App;
