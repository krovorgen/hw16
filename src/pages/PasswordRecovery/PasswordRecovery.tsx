import React, { useState } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';

import { Input } from '@alfalab/core-components/input';
import { Button } from '@alfalab/core-components/button';
import { Link as LinkUI } from '@alfalab/core-components/link';
import { Typography } from '@alfalab/core-components/typography';
import email from '../../images/email.svg';

import styles from './PasswordRecovery.module.scss';

export const PasswordRecovery = () => {
  const [step, setStep] = useState<1 | 2>(1);
  return (
    <div className={cn('container', styles.root)}>
      <div className={styles.wrap}>
        <Typography.Title tag="h1" view="small">
          It-incubator
        </Typography.Title>
        {step === 1 && (
          <>
            <Typography.Title tag="h2" view="xsmall">
              Forgot your password?
            </Typography.Title>
            <Input label="email" name="email" />
            <Typography.Text view="primary-medium" tag="p">
              Enter your email address and we will send you further instructions
            </Typography.Text>
            <Button size="xs" view="tertiary" onClick={() => setStep(2)}>
              Send Instructions
            </Button>
            <Typography.Text view="primary-medium" tag="p">
              Did you remember your password?
            </Typography.Text>
            <Link to="/login">
              <LinkUI view="default" Component="span">
                Try logging in
              </LinkUI>
            </Link>
          </>
        )}
        {step === 2 && (
          <>
            <img src={email} alt="email" />
            <Typography.Title tag="h2" view="xsmall">
              Check Email
            </Typography.Title>
            <Typography.Text view="primary-medium" tag="p">
              We’ve sent an Email with instructions to ${`HARDCODE`}
            </Typography.Text>
          </>
        )}
      </div>
    </div>
  );
};
