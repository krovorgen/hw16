import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { Input } from '@alfalab/core-components/input';
import { PasswordInput } from '@alfalab/core-components/password-input';
import { Typography } from '@alfalab/core-components/typography';
import { Button } from '@alfalab/core-components/button';
import * as CONSTANTS from '@/helpers/constants';
import * as RE from '@/helpers/regularExpressions';
import { useAppSelector } from '@/redux/hooks';
import { catchHandler } from '@/helpers/catchHandler';
import { RoutesEnum } from '@/helpers/routes';
import { api } from '@/api/api';

import styles from './Registr.module.scss';

const Registration = () => {
  const isLoggedIn = useAppSelector((state) => state.login.isLoggedIn);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passFocus, setPassFocus] = useState(false);
  const [confPassFocus, setConfPassFocus] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passError, setPassError] = useState('');
  const [confPassError, setConfPassError] = useState('');
  const [regButtonStatus, setRegButtonStatus] = useState(true);

  const router = useRouter();

  const passCheck = () => {
    return password.length > 0 && confirmPassword.length > 0 && password === confirmPassword;
  };

  const emailValidation = (email: string) => {
    const emailCheck = () => {
      return RE.emailCheckRE.test(email);
    };
    if (email.length === 0 && !emailCheck()) {
      return CONSTANTS.REG_ERROR_EMPTY_EMAIL;
    } else if (email.length > 0 && !emailCheck()) {
      return CONSTANTS.REG_ERROR_WRONG_EMAIL;
    } else {
      return '';
    }
  };

  const passValidation = (pass: string) => {
    if (pass.length === 0) {
      return CONSTANTS.REG_ERROR_EMPTY_PASS;
    } else if (pass.length > 0 && pass.length < 8) {
      return CONSTANTS.REG_ERROR_SHORT_PASS;
    } else {
      return '';
    }
  };

  const confPassValidation = useCallback((pass: string, confPass: string) => {
    if (pass !== confPass) {
      return CONSTANTS.REG_ERROR_DIFF_PASS;
    } else {
      return passValidation(confPass);
    }
  }, []);

  const regButtonValidation = useCallback(() => {
    return emailValidation(email) === '' && confPassValidation(password, confirmPassword) === '';
  }, [confPassValidation, email, password, confirmPassword]);

  const inputsChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    switch (event.currentTarget.name) {
      case 'email':
        setEmail(event.currentTarget.value.trim());
        break;
      case 'password':
        setPassword(event.currentTarget.value);
        break;
      case 'confirmPassword':
        setConfirmPassword(event.currentTarget.value);
        break;
      default:
        break;
    }
  };

  const registerHandler = () => {
    setLoadingStatus(true);
    api
      .register(email, password)
      .then(({ data }) => {
        toast.success('' + data.addedUser.email + CONSTANTS.REG_SUCCESS_NOTIFICATION);
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        router.push(RoutesEnum.Login);
      })
      .catch(catchHandler)
      .finally(() => setLoadingStatus(false));
  };

  const emailFocusHandler = () => {
    setEmailFocus(true);
  };

  const passFocusHandler = () => {
    setPassFocus(true);
  };

  const confPassFocusHandler = () => {
    setConfPassFocus(true);
  };

  const emailBlurHandler = () => {
    if (emailValidation(email) === '') {
      setEmailError('');
      setEmailFocus(false);
    }
  };

  const passBlurHandler = () => {
    if (passValidation(password) === '') {
      setPassError('');
      setPassFocus(false);
    }
  };

  const confPassBlurHandler = () => {
    if (confPassValidation(password, confirmPassword) === '') {
      setConfPassError('');
      setConfPassFocus(false);
    }
  };

  useEffect(() => {
    if (emailFocus) {
      setEmailError(emailValidation(email));
    }

    if (passFocus) {
      setPassError(passValidation(password));
    }

    if (confPassFocus) {
      setConfPassError(confPassValidation(password, confirmPassword) as string);
    }
    setRegButtonStatus(!regButtonValidation());
  }, [emailFocus, passFocus, confPassFocus, email, password, confirmPassword, confPassValidation, regButtonValidation]);

  if (isLoggedIn) router.push(RoutesEnum.Main);

  return (
    <div className={cn('container', styles.root)}>
      <div className={cn(styles.wrap, 'form-wrap')}>
        <Typography.Title className={cn('form-title')} tag="h1" view="small">
          It-incubator
        </Typography.Title>
        <Typography.Title className={cn('form-subtitle')} tag="h2" view="xsmall">
          Sign Up
        </Typography.Title>
        <Input
          name="email"
          value={email}
          onChange={inputsChangeHandler}
          type="email"
          placeholder="email"
          className={styles.input}
          error={emailError}
          onFocus={emailFocusHandler}
          onBlur={emailBlurHandler}
        />
        <PasswordInput
          value={password}
          placeholder="password"
          name="password"
          onChange={inputsChangeHandler}
          success={passCheck()}
          block
          className={styles.input}
          error={passError}
          onFocus={passFocusHandler}
          onBlur={passBlurHandler}
        />
        <PasswordInput
          value={confirmPassword}
          placeholder="confirm password"
          name="confirmPassword"
          onChange={inputsChangeHandler}
          success={confirmPassword.length > 0 && password === confirmPassword}
          block
          className={styles.input}
          error={confPassError}
          onFocus={confPassFocusHandler}
          onBlur={confPassBlurHandler}
        />
        <div className={styles.footer}>
          <Link href={RoutesEnum.Login} passHref>
            <Button size="s" view="secondary" Component="a">
              Cancel
            </Button>
          </Link>
          <Button size="s" view="primary" loading={loadingStatus} disabled={regButtonStatus} onClick={registerHandler}>
            Register
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Registration;
