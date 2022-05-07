import React from 'react';
import { Route, Routes } from 'react-router-dom';

import EditProfile from '../edit-profile-page/EditProfile';
import Footer from '../footer-page/Footer';
import Header from '../header/Header';
import LoginPage from '../login-page/LoginPage';
import Main from '../main-page/Main';
import NotFound from '../not-found-page/NotFound';
import SignupPage from '../signup-page/SignupPage';
import Welcome from '../welcome-page/Welcome';

import './App.css';

function App() {
  return (
    <>
      <Header />
      <div className="main-container">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/main" element={<Main />} />
          <Route path="/sign-up" element={<SignupPage />} />
          <Route path="/edit" element={<EditProfile />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
