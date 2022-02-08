import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import { api } from '../../api';
import { Loader } from '@alfalab/core-components/loader';

import styles from './PingControl.module.scss';

export const PingControl = () => {
  const [ping, setPing] = useState(-1);

  useEffect(() => {
    api.checkPing(Date.now()).then(({ data }) => setPing(data.ping));
  }, []);
  return (
    <div className={styles.root}>
      Ping:{' '}
      <mark
        className={cn(styles.ping, {
          [styles.low]: ping >= 0 && ping <= 33,
          [styles.medium]: ping >= 34 && ping <= 66,
          [styles.high]: ping >= 67,
        })}
      >
        {ping === -1 ? <Loader className={styles.loader} /> : ping}
      </mark>
    </div>
  );
};
