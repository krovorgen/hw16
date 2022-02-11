import React from 'react';
import cn from 'classnames';

import { useAppSelector } from '../../redux/hooks';
import { Link, Navigate } from 'react-router-dom';
import { loginTC } from '../../redux/thunk/login-thunk';
import { useDispatch } from 'react-redux';
import { Input } from '@alfalab/core-components/input';
import { Checkbox } from '@alfalab/core-components/checkbox';
import { useFormik } from 'formik';
import { Button } from '@alfalab/core-components/button';
import { PasswordInput } from '@alfalab/core-components/password-input';
import * as Yup from 'yup';
import styles from './Login.module.scss';
import { Typography } from '@alfalab/core-components/typography';
import { Link as LinkUI } from '@alfalab/core-components/link/Component';

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

  if (isLoggedIn) return <Navigate to="/" />;

  return (
    <div className={cn('container', styles.root)}>
      <div className={cn(styles.wrap, 'form-wrap')}>
        <Typography.Title className={cn('form-title')} tag="h1" view="small">
          It-incubator
        </Typography.Title>
        <Typography.Title className={cn('form-subtitle')} tag="h2" view="xsmall">
          Sign In
        </Typography.Title>
        <form className={styles.form} onSubmit={loginForm.handleSubmit}>
          <Input
            className={styles.input}
            placeholder="Email"
            block
            {...loginForm.getFieldProps('email')}
            error={loginForm.touched.email && loginForm.errors.email}
            onBlur={loginForm.handleBlur}
          />
          <PasswordInput
            className={styles.input}
            placeholder="Password"
            block
            {...loginForm.getFieldProps('password')}
            error={loginForm.touched.password && loginForm.errors.password}
            onBlur={loginForm.handleBlur}
          />
          <div className={styles.wrapper}>
            <Checkbox
              className={styles.checkbox}
              name="rememberMe"
              checked={loginForm.values.rememberMe}
              onChange={() => loginForm.setFieldValue('rememberMe', !loginForm.values.rememberMe)}
              label={'Remember me'}
            />
            <Link to="/password-recovery">
              <LinkUI view="default" Component="span">
                Forgot Password
              </LinkUI>
            </Link>
          </div>
          <Button
            type="submit"
            view="primary"
            size="s"
            loading={loading}
            block
            disabled={!loginForm.isValid || !loginForm.dirty}
          >
            Submit
          </Button>
        </form>
        <p className={styles.text}>or</p>
        <Link to="/registration" className={styles.registration}>
          <LinkUI view="default" Component="span">
            Sign Up
          </LinkUI>
        </Link>
      </div>
    </div>
  );
};
