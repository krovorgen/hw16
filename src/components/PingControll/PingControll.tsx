import React, { useEffect, useState } from 'react';

import { api } from '../../api';

import styles from './PingControl.module.scss';

export const PingControl = () => {
  const [ping, setPing] = useState('');

  useEffect(() => {
    api.checkPing(Date.now()).then(({ data }) => setPing(data.ping));
  }, []);
  return <div>Ping: {ping}</div>;
};
