import React, { ChangeEvent, SyntheticEvent, useState } from 'react';
import cn from 'classnames';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { Input } from '@alfalab/core-components/input';
import { Button } from '@alfalab/core-components/button';
import { Link as LinkUI } from '@alfalab/core-components/link';
import { Typography } from '@alfalab/core-components/typography';

import { catchHandler } from '@/helpers/catchHandler';
import { useAppSelector } from '@/redux/hooks';
import { RoutesEnum } from '@/helpers/routes';
import { api } from '@/api/api';

import styles from './PasswordRecovery.module.scss';

const PasswordRecovery = () => {
  const isLoggedIn = useAppSelector((state) => state.login.isLoggedIn);
  const router = useRouter();

  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState('');
  const [loadingStatus, setLoadingStatus] = useState(false);

  const changeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  const onSubmitForm = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingStatus(true);
    api
      .authForgot(email)
      .then(({ data }) => {
        setStep(2);
        toast.success(data.info);
      })
      .catch(catchHandler)
      .finally(() => setLoadingStatus(false));
  };

  if (isLoggedIn) router.push(RoutesEnum.Main);

  return (
    <div className={cn('container', styles.root)}>
      <div className={cn(styles.wrap, 'form-wrap')}>
        <Typography.Title className={cn('form-title')} tag="h1" view="small">
          It-incubator
        </Typography.Title>
        {step === 1 && (
          <>
            <Typography.Title className={cn('form-subtitle')} tag="h2" view="xsmall">
              Forgot your password?
            </Typography.Title>
            <form className={styles.form} onSubmit={onSubmitForm}>
              <Input
                className={styles.input}
                label="email"
                value={email}
                onChange={changeEmail}
                name="email"
                required
              />
              <Typography.Text className={styles.descr} view="primary-medium" tag="p">
                Enter your email address and we will send you further instructions
              </Typography.Text>
              <Button className={styles.submit} block loading={loadingStatus} size="xs" type="submit" view="tertiary">
                Send Instructions
              </Button>
            </form>
            <Typography.Text className={styles.text} view="primary-medium" tag="p">
              Did you remember your password?
            </Typography.Text>
            <Link href={RoutesEnum.Login} passHref>
              <LinkUI view="default" className={styles.link}>
                Try logging in
              </LinkUI>
            </Link>
          </>
        )}
        {step === 2 && (
          <div className={styles.wrapStep2}>
            <img className={styles.img} src="/email.svg" alt="email" />
            <Typography.Title className={styles.check} tag="h2" view="xsmall">
              Check Email
            </Typography.Title>
            <Typography.Text className={styles.sent} view="primary-medium" tag="p">
              We’ve sent an Email with instructions to {email}
            </Typography.Text>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordRecovery;
