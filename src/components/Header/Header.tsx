import React from 'react';
import { Link } from 'react-router-dom';
import { Link as LinkUI } from '@alfalab/core-components/link';

import styles from './Header.module.scss';
import cn from 'classnames';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={cn('container', styles.wrap)}>
        <Link className={styles.link} to="/">
          <LinkUI Component="span">Main</LinkUI>
        </Link>
        <Link className={styles.link} to="/login">
          <LinkUI Component="span">Login</LinkUI>
        </Link>
        <Link className={styles.link} to="/registration">
          <LinkUI Component="span">Registr</LinkUI>
        </Link>
        <Link className={styles.link} to="/404">
          <LinkUI Component="span">Error404</LinkUI>
        </Link>
        <Link className={styles.link} to="/password-recovery">
          <LinkUI Component="span">PasswordRecovery</LinkUI>
        </Link>
        <Link className={styles.link} to="/set-new-password/testURL">
          <LinkUI Component="span">SetNewPassword</LinkUI>
        </Link>
      </div>
    </header>
  );
};
