import React, { ChangeEvent } from 'react';
import cn from 'classnames';

import { Input } from '@alfalab/core-components/input';
import { PasswordInput } from '@alfalab/core-components/password-input';
import { Typography } from '@alfalab/core-components/typography';
import { Notification } from '@alfalab/core-components/notification';

import styles from './Registr.module.scss';
import { api } from '../../api';

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
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisiblity = React.useCallback(() => setIsVisible((prev) => !prev), []);
  const hideNotification = React.useCallback(() => setIsVisible(false), []);

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

  //Returns notification message
  const getErrorMsg = () => {
    if (email.length === 0 && password.length === 0 && confirmPassword.length === 0) {
      return 'Пользовательские данные не заполнены!';
    }
    if (email.length === 0 && passCheck()) {
      return 'Поле e-mail не заполнено!';
    }
    if (email.length === 0 && !passCheck()) {
      return 'Поле e-mail не заполнено, пароль и подтверждающий пароль не совпадают!';
    }
    if (email.length > 0 && password.length === 0 && confirmPassword.length === 0) {
      return 'Поля ввода пароля и подтверждающего пароля не заполнены!';
    }
    if (email.length > 0 && !passCheck()) {
      return 'Пароль и подтверждающий пароль не совпадают!';
    }
  };

  //Change input value for fields: email, password, confirm password
  const inputsChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    switch (event.currentTarget.name) {
      case 'email':
        setEmail(event.currentTarget.value);
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
    <div className={cn('container', styles.root)}>
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
          <Input name="email" value={email} onChange={inputsChangeHandler} type={'email'} className={styles.input} />
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
          />
        </div>
        {/*buttons*/}
        <div className={styles.buttonsBlock}>
          <div className={styles.buttonCancel}>Cancel</div>
          <div>
            <Notification
              badge="positive"
              title="Оповещение:"
              visible={isVisible}
              offset={180}
              onClickOutside={hideNotification}
              onClose={hideNotification}
              onCloseTimeout={hideNotification}
            >
              {getErrorMsg()}
            </Notification>
            {email.length > 0 && passCheck() ? (
              <>
                <div className={styles.buttonRegister} onClick={registerHandler}>
                  Register
                </div>
              </>
            ) : (
              <>
                <div className={styles.buttonRegister} onClick={toggleVisiblity}>
                  Register
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
