import React from 'react';
import cn from 'classnames';
import Link from 'next/link';

import { Link as LinkUI } from '@alfalab/core-components/link';
import { RoutesEnum } from '@/helpers/routes';

import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={cn('container', styles.wrap)}>
        <Link href={RoutesEnum.Main} passHref>
          <LinkUI className={styles.link}>Main</LinkUI>
        </Link>
        <Link href={RoutesEnum.Login} passHref>
          <LinkUI className={styles.link}>Login</LinkUI>
        </Link>
        <Link href={RoutesEnum.Registration} passHref>
          <LinkUI className={styles.link}>Registr</LinkUI>
        </Link>
        <Link href={RoutesEnum.PasswordRecovery} passHref>
          <LinkUI className={styles.link}>PasswordRecovery</LinkUI>
        </Link>
        <Link href={RoutesEnum.SetNewPassword} passHref>
          <LinkUI className={styles.link}>SetNewPassword</LinkUI>
        </Link>
        <Link href={RoutesEnum.Profile} passHref>
          <LinkUI className={styles.link}>Profile</LinkUI>
        </Link>
      </div>
    </header>
  );
};
