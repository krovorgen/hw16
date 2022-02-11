import React from 'react';
import cn from 'classnames';

import styles from './Main.module.scss';
import { useAppSelector } from '../../redux/hooks';
import { Navigate } from 'react-router-dom';

export const Main = () => {
  const isLoggedIn = useAppSelector((state) => state.login.isLoggedIn);
  if (!isLoggedIn) return <Navigate to="login" />;
  return <div className={cn('container', styles.root)}>Main</div>;
};
