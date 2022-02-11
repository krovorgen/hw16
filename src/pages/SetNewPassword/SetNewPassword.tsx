import React, { SyntheticEvent } from 'react';
import cn from 'classnames';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

import { Typography } from '@alfalab/core-components/typography';
import { PasswordInput } from '@alfalab/core-components/password-input';
import { Button } from '@alfalab/core-components/button';
import { api } from '../../api';
import { catchHandler } from '../../helpers/catchHandler';

import styles from '../PasswordRecovery/PasswordRecovery.module.scss';

export const SetNewPassword = () => {
  const { token } = useParams();
  let navigate = useNavigate();

  const onSubmitForm = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElements = e.currentTarget.elements as typeof e.currentTarget.elements & {
      password: { value: string };
    };
    api
      .setNewPassword(formElements.password.value, token!)
      .then(({ data }) => {
        toast.success(data.info);
        navigate('login');
      })
      .catch(catchHandler);
  };

  return (
    <div className={cn('container', styles.root)}>
      <div className={styles.wrap}>
        <Typography.Title tag="h1" view="small">
          It-incubator
        </Typography.Title>
        <Typography.Title tag="h2" view="xsmall">
          Create new password
        </Typography.Title>
        <form onSubmit={onSubmitForm}>
          <PasswordInput name="password" required />
          <Typography.Text view="primary-medium" tag="p">
            Create new password and we will send you further instructions to email
          </Typography.Text>
          <Button size="xs" view="tertiary" type="submit">
            Create new password
          </Button>
        </form>
      </div>
    </div>
  );
};
