import React from 'react';
import cn from 'classnames';

import styles from './Main.module.scss';

export const Main = () => {
  return <div className={cn('container', styles.root)}>Main</div>;
};
