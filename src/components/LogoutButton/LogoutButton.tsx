import React, { useCallback } from 'react';
import { toast } from 'react-toastify';

import LogOutMIcon from '@alfalab/icons-glyph/LogOutMIcon';
import { setIsLoggedIn } from '../../redux/reducer/login-reducer';
import { useAppDispatch } from '../../redux/hooks';
import { api } from '../../api';
import { catchHandler } from '../../helpers/catchHandler';

import styles from './LogoutButton.module.scss';

export const LogoutButton = () => {
  const dispatch = useAppDispatch();

  const logoutUser = useCallback(() => {
    api
      .logout()
      .then(({ data }) => {
        toast.success(data.info);
        dispatch(setIsLoggedIn(false));
      })
      .catch(catchHandler);
  }, [dispatch]);
  return (
    <button className={styles.root} onClick={logoutUser}>
      <LogOutMIcon />
    </button>
  );
};
