import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';

import { Registr } from './components/Registr';
import { Login } from './components/Login';
import { Main } from './components/Main';
import { ToastContainer } from 'react-toastify';

export const App = () => {
  return (
    <>
      <Link to="/">Main</Link>
      <Link to="/login">Login</Link>
      <Link to="/registration">Registr</Link>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registr />} />
      </Routes>
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};
