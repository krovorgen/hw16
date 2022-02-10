import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import { Registr } from './pages/Registr';
import { Login } from './pages/Login';
import { Main } from './pages/Main';
import { Error404 } from './pages/Error404';
import { PasswordRecovery } from './pages/PasswordRecovery';

import { PingControl } from './components/PingControll';
import { Profile } from './pages/Profile';
import { SetNewPassword } from './pages/SetNewPassword';

export const App = () => {
  return (
    <>
      <Link to="/">Profile</Link>
      <Link to="/">Main</Link>
      <Link to="/login">Login</Link>
      <Link to="/registration">Registr</Link>
      <Link to="/404">Error404</Link>
      <Link to="/password-recovery">PasswordRecovery</Link>
      <Link to="/set-new-password">SetNewPassword</Link>
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registr />} />
        <Route path="/password-recovery" element={<PasswordRecovery />} />
        <Route path="*" element={<Error404 />} />
        <Route path="/set-new-password/:token" element={<SetNewPassword />} />
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
      <PingControl />
    </>
  );
};
