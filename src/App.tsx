import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Registr } from './pages/Registr';
import { Login } from './pages/Login';
import { Main } from './pages/Main';
import { Error404 } from './pages/Error404';
import { PasswordRecovery } from './pages/PasswordRecovery';

import { PingControl } from './components/PingControll';
import { Profile } from './pages/Profile';
import { SetNewPassword } from './pages/SetNewPassword';
import { Header } from './components/Header';
import { useAppSelector } from './redux/hooks';
import { useDispatch } from 'react-redux';
import { initializedTC } from './redux/thunk/app-thunk';
import { Preloader } from './components/Preloader';
import { RoutesEnum } from './helpers/routes';

export const App = () => {
  const dispatch = useDispatch();
  const initialized = useAppSelector((state) => state.app.initialized);

  useEffect(() => {
    dispatch(initializedTC());
  }, [dispatch]);

  if (initialized) return <Preloader />;
  return (
    <>
      <Header />
      <Routes>
        <Route path={RoutesEnum.Main} element={<Main />} />
        <Route path={RoutesEnum.Profile} element={<Profile />} />
        <Route path={RoutesEnum.Login} element={<Login />} />
        <Route path={RoutesEnum.Registration} element={<Registr />} />
        <Route path={RoutesEnum.PasswordRecovery} element={<PasswordRecovery />} />
        <Route path={RoutesEnum.SetNewPassword} element={<SetNewPassword />} />
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
