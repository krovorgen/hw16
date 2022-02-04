import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Registr } from './pages/Registr';
import { Login } from './pages/Login';
import { Main } from './pages/Main';
import { Error404 } from './pages/Error404';
import { PasswordRecovery } from './pages/PasswordRecovery';

export const App = () => {
  return (
    <>
      <Link to="/">Main</Link>
      <Link to="/login">Login</Link>
      <Link to="/registration">Registr</Link>
      <Link to="/404">Error404</Link>
      <Link to="/password-recovery">PasswordRecovery</Link>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registr />} />
        <Route path="/password-recovery" element={<PasswordRecovery />} />
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
