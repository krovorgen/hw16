import React, { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Input } from '@alfalab/core-components/input';
import { Button } from '@alfalab/core-components/button';
import PaymentPlusMWhiteIcon from '@alfalab/icons-classic/PaymentPlusMWhiteIcon';
import { Switch } from '@alfalab/core-components/switch';

import { setStatusAppAC } from '../../../redux/reducer/app-reducer';
import { api } from '../../../api';
import { setCardPackTC } from '../../../redux/thunk/card-pack-thunk';
import { catchHandler } from '../../../helpers/catchHandler';

import styles from './AddCardForm.module.scss';

export const AddCardForm = () => {
  const dispatch = useDispatch();

  const [newCardValue, setNewCardValue] = useState('');
  const [privateStatus, setPrivateStatus] = React.useState(false);
  const handleChange = () => setPrivateStatus((v) => !v);

  const handleNewCardValue = (e: ChangeEvent<HTMLInputElement>) => {
    setNewCardValue(e.currentTarget.value);
  };

  const postNewCard = () => {
    dispatch(setStatusAppAC('loading'));
    api
      .postPack({ name: newCardValue, private: privateStatus })
      .then(() => {
        dispatch(setCardPackTC());
        setNewCardValue('');
      })
      .catch(catchHandler)
      .finally(() => dispatch(setStatusAppAC('idle')));
  };
  return (
    <form className={styles.root}>
      <div className={styles.addItem}>
        <Input
          label="Новая колода"
          size="s"
          className={styles.input}
          value={newCardValue}
          onChange={handleNewCardValue}
          required
        />
        <Button
          view="primary"
          size="s"
          leftAddons={<PaymentPlusMWhiteIcon />}
          className={styles.button}
          onClick={postNewCard}
        />
      </div>
      <Switch checked={privateStatus} label="Приватная колода" onChange={handleChange} />
    </form>
  );
};
