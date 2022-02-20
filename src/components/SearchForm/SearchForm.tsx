import React, { ChangeEvent, FC, memo, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import debounce from 'lodash/debounce';

import { Input } from '@alfalab/core-components/input';
import { Switch } from '@alfalab/core-components/switch';
import { changeResponseValue } from '@/redux/reducer/card-pack-reducer';

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

  return (
    <div className={styles.root}>
      <div className={styles.addItem}>
        <Input label="Найти колоду" size="s" className={styles.input} onChange={debouncedResults} required />
      </div>

      <Switch checked={ownerCardPack} label="Мои колоды" onChange={handleChangeOwnerPack} />
    </div>
  );
});

SearchForm.displayName = 'SearchForm';
