import React, { ChangeEvent, SyntheticEvent, useState } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';

import { Input } from '@alfalab/core-components/input';
import { Button } from '@alfalab/core-components/button';
import { Link as LinkUI } from '@alfalab/core-components/link';
import { Typography } from '@alfalab/core-components/typography';
import emailIcon from '../../images/email.svg';
import { api } from '../../api';
import { catchHandler } from '../../helpers/catchHandler';

import styles from './PasswordRecovery.module.scss';

export const PasswordRecovery = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState('');

  const changeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  const onSubmitForm = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    api
      .authForgot(email)
      .then(() => {
        setStep(2);
      })
      .catch(catchHandler);
  };

  return (
    <div className={cn('container', styles.root)}>
      <div className={styles.wrap}>
        <Typography.Title tag="h1" view="small">
          It-incubator
        </Typography.Title>
        {step === 1 && (
          <>
            <Typography.Title tag="h2" view="xsmall">
              Forgot your password?
            </Typography.Title>
            <form onSubmit={onSubmitForm}>
              <Input label="email" value={email} onChange={changeEmail} name="email" required />
              <Typography.Text view="primary-medium" tag="p">
                Enter your email address and we will send you further instructions
              </Typography.Text>
              <Button size="xs" type="submit" view="tertiary">
                Send Instructions
              </Button>
            </form>
            <Typography.Text view="primary-medium" tag="p">
              Did you remember your password?
            </Typography.Text>
            <Link to="/login">
              <LinkUI view="default" Component="span">
                Try logging in
              </LinkUI>
            </Link>
          </>
        )}
        {step === 2 && (
          <>
            <img src={emailIcon} alt="email" />
            <Typography.Title tag="h2" view="xsmall">
              Check Email
            </Typography.Title>
            <Typography.Text view="primary-medium" tag="p">
              We’ve sent an Email with instructions to {email}
            </Typography.Text>
          </>
        )}
      </div>
    </div>
  );
};
