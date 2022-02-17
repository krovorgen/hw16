import React, { ChangeEvent, FC, memo, SyntheticEvent, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import debounce from 'lodash/debounce';

import { Input } from '@alfalab/core-components/input';
import { Button } from '@alfalab/core-components/button';
import SearchMIcon from '@alfalab/icons-classic/SearchMIcon';
import { Switch } from '@alfalab/core-components/switch';

import { setStatusAppAC } from '../../../redux/reducer/app-reducer';
import { changeResponseValue } from '../../../redux/reducer/card-pack-reducer';

import styles from './SearchForm.module.scss';

type Props = {
  ownerCardPack: boolean;
};

export const SearchForm: FC<Props> = memo(({ ownerCardPack }) => {
  const dispatch = useDispatch();

  const handleNewCardValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(changeResponseValue({ searchValue: e.target.value }));
    },
    [dispatch]
  );

  const debouncedResults = useMemo(() => {
    return debounce(handleNewCardValue, 1000);
  }, [handleNewCardValue]);

  const handleChangeOwnerPack = useCallback(() => {
    dispatch(changeResponseValue({ ownerCardPack: !ownerCardPack }));
  }, [dispatch, ownerCardPack]);

  const postNewCard = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setStatusAppAC('loading'));

    // .finally(() => dispatch(setStatusAppAC('idle')));
  };
  return (
    <form className={styles.root} onSubmit={postNewCard}>
      <div className={styles.addItem}>
        <Input label="Найти колоду" size="s" className={styles.input} onChange={debouncedResults} required />
        <Button view="primary" size="s" leftAddons={<SearchMIcon />} className={styles.button} type="submit" />
      </div>

      <Switch checked={ownerCardPack} label="Мои колоды" onChange={handleChangeOwnerPack} />
    </form>
  );
});
