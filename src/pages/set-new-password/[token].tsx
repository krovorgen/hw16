import React, { SyntheticEvent, useState } from 'react';
import cn from 'classnames';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import { Typography } from '@alfalab/core-components/typography';
import { PasswordInput } from '@alfalab/core-components/password-input';
import { Button } from '@alfalab/core-components/button';
import { api } from '@/api/api';
import { catchHandler } from '@/helpers/catchHandler';
import { useAppSelector } from '@/redux/hooks';
import { RoutesEnum } from '@/helpers/routes';

import styles from './SetNewPassword.module.scss';

const SetNewPassword = () => {
  const isLoggedIn = useAppSelector((state) => state.login.isLoggedIn);

  const router = useRouter();
  const token = router.query.token as string;

  const [loadingStatus, setLoadingStatus] = useState(false);

  const onSubmitForm = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingStatus(true);
    const formElements = e.currentTarget.elements as typeof e.currentTarget.elements & {
      password: { value: string };
    };

    api
      .setNewPassword(formElements.password.value, token)
      .then(({ data }) => {
        toast.success(data.info);
        router.push(RoutesEnum.Login);
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
        <Typography.Title className={cn('form-subtitle')} tag="h2" view="xsmall">
          Create new password
        </Typography.Title>
        <form onSubmit={onSubmitForm}>
          <PasswordInput className={styles.input} name="password" required />
          <Typography.Text className={styles.descr} view="primary-medium" tag="p">
            Create new password and we will send you further instructions to email
          </Typography.Text>
          <Button className={styles.submit} loading={loadingStatus} size="xs" view="tertiary" type="submit">
            Create new password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SetNewPassword;
