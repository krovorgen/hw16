import React from 'react';
import cn from 'classnames';

import styles from './Login.module.scss';
import { useAppSelector } from '../../redux/hooks';
import { Navigate } from 'react-router-dom';
import { loginTC } from '../../redux/thunk/login-thunk';
import { useDispatch } from 'react-redux';
import { Input } from '@alfalab/core-components/input';
import { Checkbox } from '@alfalab/core-components/checkbox';
import { useFormik } from 'formik';
import { Button } from '@alfalab/core-components/button';
import { PasswordInput } from '@alfalab/core-components/password-input';
import * as Yup from 'yup';

export const Login = () => {
  const { isLoggedIn, loading } = useAppSelector((state) => state.login);
  const dispatch = useDispatch();

  const loginForm = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validationSchema: Yup.object({
      email: Yup.string().required().email(),
      password: Yup.string().required(),
    }),
    onSubmit: ({ email, password, rememberMe }) => {
      dispatch(loginTC(email, password, rememberMe));
    },
  });

  if (isLoggedIn) {
    return <Navigate to={'/'} />;
  }

  return (
    <div className={cn('container', styles.root)}>
      <form onSubmit={loginForm.handleSubmit} className={styles.form}>
        <div className={styles.inputRow}>
          <Input
            placeholder={'Email'}
            block={true}
            {...loginForm.getFieldProps('email')}
            error={loginForm.touched.email && loginForm.errors.email}
            onBlur={loginForm.handleBlur}
          />
        </div>

        <div className={styles.inputRow}>
          <PasswordInput
            placeholder={'Password'}
            block={true}
            {...loginForm.getFieldProps('password')}
            error={loginForm.touched.password && loginForm.errors.password}
            onBlur={loginForm.handleBlur}
          />
        </div>

        <div className={styles.inputRow}>
          <Checkbox
            checked={loginForm.values.rememberMe}
            onChange={() => loginForm.setFieldValue('rememberMe', !loginForm.values.rememberMe)}
            label={'Remember me'}
          />
        </div>

        <div className={styles.inputRow}>
          <Button
            type={'submit'}
            view={'primary'}
            loading={loading}
            block={true}
            disabled={!loginForm.isValid || !loginForm.dirty}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};
