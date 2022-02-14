import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { Link as LinkUI } from '@alfalab/core-components/link';
import { RoutesEnum } from '../../helpers/routes';

import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={cn('container', styles.wrap)}>
        <Link className={styles.link} to={RoutesEnum.Main}>
          <LinkUI Component="span">Main</LinkUI>
        </Link>
        <Link className={styles.link} to={RoutesEnum.Login}>
          <LinkUI Component="span">Login</LinkUI>
        </Link>
        <Link className={styles.link} to={RoutesEnum.Registration}>
          <LinkUI Component="span">Registr</LinkUI>
        </Link>
        <Link className={styles.link} to="/404">
          <LinkUI Component="span">Error404</LinkUI>
        </Link>
        <Link className={styles.link} to={RoutesEnum.PasswordRecovery}>
          <LinkUI Component="span">PasswordRecovery</LinkUI>
        </Link>
        <Link className={styles.link} to={RoutesEnum.SetNewPassword}>
          <LinkUI Component="span">SetNewPassword</LinkUI>
        </Link>
      </div>
    </header>
  );
};
