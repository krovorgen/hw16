import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import { api } from '../../api';

import styles from './PingControl.module.scss';

export const PingControl = () => {
  const [ping, setPing] = useState(0);

  useEffect(() => {
    api.checkPing(Date.now()).then(({ data }) => setPing(+data.ping));
  }, []);
  return (
    <p className={styles.root}>
      Ping:{' '}
      <mark
        className={cn(styles.ping, {
          [styles.low]: ping >= 0 && ping <= 33,
          [styles.medium]: ping >= 34 && ping <= 66,
          [styles.high]: ping >= 67,
        })}
      >
        {ping}
      </mark>
    </p>
  );
};
