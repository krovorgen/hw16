import React, { ChangeEvent } from 'react';
import cn from 'classnames';

import { Input } from '@alfalab/core-components/input';
import { PasswordInput } from '@alfalab/core-components/password-input';
import { Typography } from '@alfalab/core-components/typography';

import styles from './Registr.module.scss';
import { api } from '../../api';
import {Link} from "react-router-dom";
import * as CONSTANTS from '../../helpers/constants'
import {Button} from "@alfalab/core-components/button";

export const Registr = () => {
  //Passwords visibility conditions
  const [passVisible, setPassVisible] = React.useState(false);
  const [confPassVisible, setConfPassVisible] = React.useState(false);
  //Email input field value
  const [email, setEmail] = React.useState('');
  //Password input field value
  const [password, setPassword] = React.useState('');
  //Confirm Password input field value
  const [confirmPassword, SetConfirmPassword] = React.useState('');

  //Toggle passwords visibility
  const visibilityHandler = (visible: boolean, name: 'password' | 'confirmPassword') => {
    switch (name) {
      case 'password':
        setPassVisible(visible);
        break;
      case 'confirmPassword':
        setConfPassVisible(visible);
        break;
      default:
        break;
    }
  };

  //Password and Confirm Password match checking
  const passCheck = () => {
    return password.length > 0 && confirmPassword.length > 0 && password === confirmPassword;
  };

  const emailValidation = (email: string) => {
    const emailCheck = () => {
      return /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(email)
    }
    if (email.length === 0 && !emailCheck()) {
      return CONSTANTS.REG_ERROR_EMPTY_EMAIL;
    } else if (email.length > 0 && !emailCheck()) {
      return CONSTANTS.REG_ERROR_WRONG_EMAIL;
    } else {
      return ''
    }
  }

  const passValidation = (pass: string) => {
    if (pass.length === 0) {
      return CONSTANTS.REG_ERROR_EMPTY_PASS;
    } else if (pass.length > 0 && pass.length < 7) {
      return CONSTANTS.REG_ERROR_SHORT_PASS;
    } else {
      return ''
    }
  }

  const confPassValidation = (pass: string, confPass: string) => {
    if (!passValidation(confPass)) {
      if (pass !== confPass) {
        return CONSTANTS.REG_ERROR_DIFF_PASS;
      } else {}
      return ''
    } else {
      return passValidation(confPass)
    }
  }

  const registerButtonValidation = () => {
    return emailValidation(email) === '' && confPassValidation(password, confirmPassword) === ''
  }

  //Change input value for fields: email, password, confirm password
  const inputsChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    switch (event.currentTarget.name) {
      case 'email':
        setEmail(event.currentTarget.value.trim());
        break;
      case 'password':
        setPassword(event.currentTarget.value);
        break;
      case 'confirmPassword':
        SetConfirmPassword(event.currentTarget.value);
        break;
      default:
        break;
    }
  };

  const registerHandler = () => {
    api.register(email, password).then((data) => console.log(data.data));
  };

  return (
      <div className={cn('container')}>
        <div className={styles.modalWindow}>
          <div className={styles.titlesBlock}>
            <Typography.Title tag={'h1'} className={styles.title}>
              It-incubator
            </Typography.Title>
            <Typography.Title tag={'h2'} className={styles.subtitle}>
              Sign Up
            </Typography.Title>
          </div>
          <div className={styles.inputsBlock}>
            <div>Email:</div>
            <Input
                name="email"
                value={email}
                onChange={inputsChangeHandler}
                type={'email'}
                className={styles.input}
                error={emailValidation(email)}
            />
            {/*password input field*/}
            <div>Password:</div>
            <PasswordInput
                passwordVisible={passVisible}
                onPasswordVisibleChange={(visible) => {
                  visibilityHandler(visible, 'password');
                }}
                value={password}
                name="password"
                onChange={inputsChangeHandler}
                success={passCheck()}
                block={true}
                className={styles.input}
                error={passValidation(password)}
            />
            {/*password confirm field*/}
            <div>Confirm password:</div>
            <PasswordInput
                passwordVisible={confPassVisible}
                onPasswordVisibleChange={(visible) => {
                  visibilityHandler(visible, 'confirmPassword');
                }}
                value={confirmPassword}
                name="confirmPassword"
                onChange={inputsChangeHandler}
                success={confirmPassword.length > 0 && password === confirmPassword}
                block={true}
                className={styles.input}
                error={confPassValidation(password, confirmPassword)}
            />
          </div>
          {/*buttons*/}
          <div className={styles.buttonsBlock}>
            <Link to="/login">
              <Button size={'s'} view="secondary">
                Cancel
              </Button>
            </Link>
            <Button size={'s'} view="primary" disabled={!registerButtonValidation()} onClick={registerHandler}>
              Register
            </Button>
          </div>
        </div>
      </div>
  );
};
