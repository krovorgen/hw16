import React, { useState } from 'react';
import cn from 'classnames';
import { useParams } from 'react-router-dom';

import { Typography } from '@alfalab/core-components/typography';
import { PasswordInput } from '@alfalab/core-components/password-input';
import { Button } from '@alfalab/core-components/button';

import styles from '../PasswordRecovery/PasswordRecovery.module.scss';

export const SetNewPassword = () => {
  const { token } = useParams();
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <div className={cn('container', styles.root)}>
      <div className={styles.wrap}>
        <Typography.Title tag="h1" view="small">
          It-incubator
        </Typography.Title>
        <Typography.Title tag="h2" view="xsmall">
          Create new password
        </Typography.Title>
        <PasswordInput
          passwordVisible={passwordVisible}
          onPasswordVisibleChange={(visible) => {
            setPasswordVisible(visible);
          }}
        />
        <Typography.Text view="primary-medium" tag="p">
          Create new password and we will send you further instructions to email
        </Typography.Text>
        <Button size="xs" view="tertiary">
          Create new password
        </Button>
      </div>
    </div>
  );
};
