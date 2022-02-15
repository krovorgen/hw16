import React, { ChangeEvent, FC, memo, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import moment from 'moment';

import { Button } from '@alfalab/core-components/button';
import { Table } from '@alfalab/core-components/table';
import { Loader } from '@alfalab/core-components/loader';

import { useAppSelector } from '../../redux/hooks';
import { LogoutButton } from '../../components/LogoutButton';
import { setCardPackTC } from '../../redux/thunk/card-pack-thunk';
import { changeResponseValue } from '../../redux/reducer/card-pack-reducer';

import styles from './Main.module.scss';
import { api, CardPacksItem } from '../../api';
import { Input } from '@alfalab/core-components/input';
import PaymentPlusMWhiteIcon from '@alfalab/icons-classic/PaymentPlusMWhiteIcon';
import { MultiRangeSlider } from '../../components/MultiRangeSlider';
import { setStatusAppAC } from '../../redux/reducer/app-reducer';

export const Main = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useAppSelector((state) => state.login.isLoggedIn);
  const cardPack = useAppSelector((state) => state.cardPack.responseData?.cardPacks);
  const cardPacksTotalCount = useAppSelector((state) => state.cardPack.responseData?.cardPacksTotalCount);
  const { page, pageCount } = useAppSelector((state) => state.cardPack);

  const [perPage, setPerPage] = useState(pageCount);
  const [currentPage, setCurrentPage] = useState(page);
  const [newCardValue, setNewCardValue] = useState('');

  const handlePerPageChange = (value: number) => {
    dispatch(changeResponseValue({ page: 0, pageCount: value }));
    setCurrentPage(0);
    setPerPage(value);
  };

  const handlePageChange = (pageIndex: number) => {
    dispatch(changeResponseValue({ page: pageIndex }));
    setCurrentPage(pageIndex);
  };

  const handleNewCardValue = (e: ChangeEvent<HTMLInputElement>) => {
    setNewCardValue(e.currentTarget.value);
  };

  const postNewCard = () => {
    dispatch(setStatusAppAC('loading'));
    api
      .postPack({ name: newCardValue })
      .then(() => {
        dispatch(setCardPackTC());
        setNewCardValue('');
      })
      .finally(() => dispatch(setStatusAppAC('idle')));
  };

  useEffect(() => {
    dispatch(setCardPackTC());
  }, [dispatch, page, pageCount]);

  if (!isLoggedIn) return <Navigate to="/login" />;
  return (
    <>
      <div className={cn('container', styles.root)}>
        <div>
          <MultiRangeSlider
            max={3000}
            callback={(selectedMin, selectedMax) => console.log('' + selectedMin + '---' + selectedMax)}
          />
        </div>

        <div className={styles.addItem}>
          <Input
            label="Новая колода"
            size="s"
            className={styles.input}
            value={newCardValue}
            onChange={handleNewCardValue}
          />
          <Button
            view="primary"
            size="s"
            leftAddons={<PaymentPlusMWhiteIcon />}
            className={styles.button}
            onClick={postNewCard}
          />
        </div>
        <Table
          pagination={
            <Table.Pagination
              className={styles.pagination}
              perPage={perPage}
              currentPageIndex={currentPage}
              pagesCount={Math.ceil(cardPacksTotalCount! / pageCount)}
              onPageChange={handlePageChange}
              onPerPageChange={handlePerPageChange}
              possiblePerPage={[5, 25, 50, 100]}
            />
          }
        >
          <Table.THead className={styles.thead}>
            <Table.THeadCell>Name</Table.THeadCell>
            <Table.THeadCell>Cards</Table.THeadCell>
            <Table.THeadCell>Last Updated</Table.THeadCell>
            <Table.THeadCell>Created by</Table.THeadCell>
            <Table.THeadCell>Actions</Table.THeadCell>
          </Table.THead>
          <Table.TBody>
            {cardPack ? (
              cardPack.length !== 0 &&
              cardPack.map((item, index) => {
                return <TableItem item={item} key={index} />;
              })
            ) : (
              <Loader />
            )}
          </Table.TBody>
        </Table>
      </div>
      <LogoutButton />
    </>
  );
};

type TableItemProps = {
  item: CardPacksItem;
};

const TableItem: FC<TableItemProps> = memo(({ item }) => {
  return (
    <Table.TRow>
      <Table.TCell>{item.name}</Table.TCell>
      <Table.TCell>{item.cardsCount}</Table.TCell>
      <Table.TCell>{moment(item.updated).format('Y.MM.DD HH:mm:ss')}</Table.TCell>
      <Table.TCell>{moment(item.created).format('Y.MM.DD HH:mm:ss')}</Table.TCell>
      <Table.TCell>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button size="xxs" view="primary">
            Delete
          </Button>
          <Button size="xxs">Edit</Button>
          <Button size="xxs">Learn</Button>
        </div>
      </Table.TCell>
    </Table.TRow>
  );
});
