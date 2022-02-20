import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '@/redux/hooks';
import { initializedTC } from '@/redux/thunk/app-thunk';
import { Preloader } from '@/components/Preloader';
import { Progress } from '@/components/Progress';
import { Header } from '@/components/Header';

import '../../scss/index.scss';

export const AppLayout: FC = ({ children }) => {
  const dispatch = useDispatch();
  const { initialized, status } = useAppSelector((state) => state.app);

  useEffect(() => {
    dispatch(initializedTC());
  }, [dispatch]);

  if (initialized) return <Preloader />;
  return (
    <>
      <Header />
      {status === 'loading' && <Progress />}
      {children}
    </>
  );
};
