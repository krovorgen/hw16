import React, { ChangeEvent, FormEvent, useState } from 'react';
import cn from 'classnames';

import styles from './Login.module.scss';
import { useAppSelector } from '../../redux/hooks';
import { Navigate } from 'react-router-dom';
import { loginTC } from '../../redux/thunk/login-thunk';
import { useDispatch } from 'react-redux';
import { Input } from '@alfalab/core-components/input';
import { Checkbox } from '@alfalab/core-components/checkbox';
import { Button } from '@alfalab/core-components/button';
import { PasswordInput } from '@alfalab/core-components/password-input';

export const Login = () => {
  const { isLoggedIn, loading } = useAppSelector((state) => state.login);
  const dispatch = useDispatch();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  if (isLoggedIn) {
    return <Navigate to={'/'} />;
  }

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case 'email':
        setEmail(e.target.value);
        break;

      case 'password':
        setPassword(e.target.value);
        break;

      default:
        return;
    }
  };

  const handleRememberMe = (e: ChangeEvent<HTMLInputElement> | undefined) => {
    setRememberMe((prev) => !prev);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(loginTC(email, password, rememberMe));
  };

  return (
    <div className={cn('container', styles.root)}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputRow}>
          <Input name={'email'} placeholder={'Email'} value={email} onChange={handleChangeInput} block={true} />
        </div>

        <div className={styles.inputRow}>
          <PasswordInput
            name={'password'}
            placeholder={'Password'}
            value={password}
            onChange={handleChangeInput}
            block={true}
          />
        </div>

        <div className={styles.inputRow}>
          <Checkbox checked={rememberMe} onChange={handleRememberMe} label={'Remember me'} />
        </div>

        <div className={styles.inputRow}>
          <Button type={'submit'} view={'primary'} loading={loading} block={true}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};
