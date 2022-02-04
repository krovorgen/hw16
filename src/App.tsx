import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';

import { Registr } from './components/Registr';
import { Login } from './components/Login';
import { Main } from './components/Main';
import { ToastContainer } from 'react-toastify';
import { Error404 } from './components/Error404';

export const App = () => {
  return (
    <>
      <Link to="/">Main</Link>
      <Link to="/login">Login</Link>
      <Link to="/registration">Registr</Link>
      <Link to="/404">Error404</Link>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registr />} />
        <Route path="/404" element={<Error404 />} />
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
