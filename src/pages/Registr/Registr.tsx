import React, { ChangeEvent } from 'react';
import cn from 'classnames';

import { Input } from '@alfalab/core-components/input';
import { PasswordInput } from '@alfalab/core-components/password-input';
import { Typography } from '@alfalab/core-components/typography';
import { Button } from '@alfalab/core-components/button';
import { Row } from '@alfalab/core-components/grid/row';
import { Col } from '@alfalab/core-components/grid/col';

import styles from './Registr.module.scss';
import { api } from '../../api';

export const Registr = () => {
  const [passwordsVisible, setPasswordsVisible] = React.useState({
    password: false,
    confirmPassword: false,
  });
  const [inputsData, setInputsData] = React.useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const visibilityHandler = (visible: boolean, name: 'password' | 'confirmPassword') => {
    switch (name) {
      case 'password':
        setPasswordsVisible({ ...passwordsVisible, password: visible });
        break;
      case 'confirmPassword':
        setPasswordsVisible({ ...passwordsVisible, confirmPassword: visible });
        break;
      default:
        break;
    }
  };

  const inputsChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.currentTarget.name);
    console.log(event.currentTarget.value);
    switch (event.currentTarget.name) {
      case 'email':
        setInputsData({ ...inputsData, email: event.currentTarget.value });
        break;
      case 'password':
        setInputsData({ ...inputsData, password: event.currentTarget.value });
        break;
      case 'confirmPassword':
        setInputsData({ ...inputsData, confirmPassword: event.currentTarget.value });
        break;
      default:
        break;
    }
  };

  const registerHandler = () => {
    api.register(inputsData.email, inputsData.password).then((data) => console.log(data.data));
  };

  const test = () => {
    return (
      <div className={styles.window}>
        <div>
          <Typography.Title tag={'h1'}>It-incubator</Typography.Title>
          <Typography.Title tag={'h2'}>Sign Up</Typography.Title>
        </div>
        <div>
          <div>Email:</div>
          <Input
            name="email"
            value={inputsData.email}
            onChange={inputsChangeHandler}
            type={'email'}
            className={styles.input}
          />
          <br />
          {/*password input field*/}
          <div>Password:</div>
          <PasswordInput
            passwordVisible={passwordsVisible.password}
            onPasswordVisibleChange={(visible) => {
              visibilityHandler(visible, 'password');
            }}
            value={inputsData.password}
            name="password"
            onChange={inputsChangeHandler}
          />
          <br />
          {/*password confirm field*/}
          <div>Confirm password:</div>
          <PasswordInput
            passwordVisible={passwordsVisible.confirmPassword}
            onPasswordVisibleChange={(visible) => {
              visibilityHandler(visible, 'confirmPassword');
            }}
            value={inputsData.confirmPassword}
            name="confirmPassword"
            onChange={inputsChangeHandler}
          />
        </div>
        {/*buttons*/}
        <div>
          <Row align="middle">
            <Col>
              <Button view="secondary">Cancel</Button>
            </Col>
            <Col>
              <Button view="primary" onClick={registerHandler}>
                Register
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    );
  };

  return <div className={cn('container', styles.root)}>{test()}</div>;
};
