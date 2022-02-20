import React, { FC, memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import Link from 'next/link';

import { Table } from '@alfalab/core-components/table';
import { Button } from '@alfalab/core-components/button';
import { CardPacksItem } from '@/api/api';
import { deleteCardPackTC } from '@/redux/thunk/card-pack-thunk';

import styles from './TableItem.module.scss';

type TableItemProps = {
  item: CardPacksItem;
  userId: string;
};
export const TableItem: FC<TableItemProps> = memo(({ item, userId }) => {
  const dispatch = useDispatch();

  const deleteCardPack = useCallback(() => {
    dispatch(deleteCardPackTC(item._id));
  }, [dispatch, item._id]);

  return (
    <Table.TRow>
      <Table.TCell>
        <Link href={`/card/${item._id}`}>{item.name}</Link>
      </Table.TCell>
      <Table.TCell>{item.cardsCount}</Table.TCell>
      <Table.TCell>{dayjs(item.updated).format('YY.MM.DD HH:mm:ss')}</Table.TCell>
      <Table.TCell>{dayjs(item.created).format('YY.MM.DD HH:mm:ss')}</Table.TCell>
      <Table.TCell className={styles.nav}>
        <div className={styles.navWrap}>
          {item.user_id === userId && (
            <>
              <Button size="xxs" view="primary" onClick={deleteCardPack}>
                Delete
              </Button>
              <Link href={`/card/${item._id}`} passHref>
                <Button size="xxs">Edit</Button>
              </Link>
            </>
          )}
          <Button size="xxs">Learn</Button>
        </div>
      </Table.TCell>
    </Table.TRow>
  );
});

TableItem.displayName = 'TableItem';
