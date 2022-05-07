import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Aside from '../aside/Aside';
import Footer from '../footer-page/Footer';
import Header from '../header/Header';
import Main from '../main-page/Main';
import NotFound from '../not-found-page/NotFound';
import SignupPage from '../signup-page/SignupPage';
import Welcome from '../welcome-page/Welcome';

import './App.css';

function App() {
  return (
    <>
      <Header />
      <Aside />
      <div className="main-container">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/main" element={<Main />} />
          <Route path="/sign-up" element={<SignupPage />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
