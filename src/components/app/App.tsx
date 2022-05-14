import React from 'react';
import { Route, Routes } from 'react-router-dom';

import EditProfile from '../EditProfilePage/EditProfilePage';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import LoginPage from '../LoginPage/LoginPage';
import Main from '../MainPage/MainPage';
import NotFound from '../NotFoundPage/NotFound';
import SignupPage from '../SignupPage/SignupPage';
import BoardPage from '../BoardPage/BoardPage';

import './app.css';
import WelcomePage from '../WelcomePage/WelcomePage';

function App(): JSX.Element {
  return (
    <div className="body">
      <Header />
      <div className="main-container">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/main" element={<Main />} />
          <Route path="/sign-up" element={<SignupPage />} />
          <Route path="/edit" element={<EditProfile />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/board" element={<BoardPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
