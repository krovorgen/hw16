import React from 'react';
import cn from 'classnames';

import styles from './Error404.module.scss';

export const Error404 = () => {
  return (
    <div className={cn('container', styles.root)}>
      <div className={styles.wrap}>
        <span className={styles.status}>404</span>
        <p className={styles.text}>This page could not be found.</p>
      </div>
    </div>
  );
};
