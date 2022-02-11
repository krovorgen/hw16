import React from 'react';

import { Loader } from '@alfalab/core-components/loader';

import styles from './Preloader.module.scss';

export const Preloader = () => {
  return (
    <div className={styles.root}>
      <Loader />
    </div>
  );
};
