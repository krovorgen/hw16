import React from 'react';
import cn from 'classnames';

import { Input } from '@alfalab/core-components/input';
import { PasswordInput } from '@alfalab/core-components/password-input';
import { Typography } from '@alfalab/core-components/typography';
import { Button } from '@alfalab/core-components/button';
import { Row } from '@alfalab/core-components/grid/row';
import { Col } from '@alfalab/core-components/grid/col';

import styles from './Registr.module.scss';

export const Registr = () => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const test = () => {
    return (
      <div>
        <div>
          <Typography.Title tag={'h1'}>It-incubator</Typography.Title>
          <Typography.Title tag={'h2'}>Sign Up</Typography.Title>
        </div>
        <div>
          <Input label="Email" name="email" />
          <br />
          <PasswordInput
            passwordVisible={passwordVisible}
            onPasswordVisibleChange={(visible) => {
              setPasswordVisible(visible);
            }}
          />
          <br />
          <PasswordInput
            passwordVisible={passwordVisible}
            onPasswordVisibleChange={(visible) => {
              setPasswordVisible(visible);
            }}
          />
        </div>
        <div>
          <Row align="middle">
            <Col>
              <Button view="secondary">Cancel</Button>
            </Col>
            <Col>
              <Button view="primary">Register</Button>
            </Col>
          </Row>
        </div>
      </div>
    );
  };

  return <div className={cn('container', styles.root)}>{test()}</div>;
};
