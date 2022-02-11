import React from 'react';
import cn from 'classnames';
import styles from './Logout.module.scss';
import LogOutMIcon from '@alfalab/icons-glyph/LogOutMIcon';
import { useAppDispatch } from '../../redux/hooks';
import { setProfileDeleteData } from '../../redux/reducer/logout-reducer';

export const Logout = () => {
  let dispatch = useAppDispatch();

  return (
    <div className={cn('container', styles.root)} onClick={() => dispatch(setProfileDeleteData())}>
      <LogOutMIcon />
    </div>
  );
};
