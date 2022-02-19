import { CardPacksItem } from '../../../api';
import React, { FC, memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { deleteCardPackTC } from '../../../redux/thunk/card-pack-thunk';
import { Table } from '@alfalab/core-components/table';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import styles from '../Main.module.scss';
import { Button } from '@alfalab/core-components/button';

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
        <Link to={`/card/${item._id}`}>{item.name}</Link>
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
              <Link to={`/card/${item._id}`}>
                <Button size="xxs" Component="span">
                  Edit
                </Button>
              </Link>
            </>
          )}
          <Button size="xxs">Learn</Button>
        </div>
      </Table.TCell>
    </Table.TRow>
  );
});
