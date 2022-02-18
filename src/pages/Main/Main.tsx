import React, { FC, memo, useCallback, useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import dayjs from 'dayjs';

import { Button } from '@alfalab/core-components/button';
import { Table } from '@alfalab/core-components/table';
import { Loader } from '@alfalab/core-components/loader';

import { useAppSelector } from '../../redux/hooks';
import { LogoutButton } from '../../components/LogoutButton';
import { deleteCardPackTC, setCardPackTC } from '../../redux/thunk/card-pack-thunk';
import { changeResponseValue } from '../../redux/reducer/card-pack-reducer';
import { CardPacksItem } from '../../api';
import { MultiRangeSlider } from '../../components/MultiRangeSlider';
import { AddCardForm } from './AddCardForm';

import styles from './Main.module.scss';
import { SearchForm } from './SearchForm';

export const Main = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useAppSelector((state) => state.login.isLoggedIn);
  const userId = useAppSelector((state) => state.profile._id);
  const { page, pageCount, ownerCardPack, responseData, searchValue } = useAppSelector((state) => state.cardPack);

  const [perPage, setPerPage] = useState(pageCount);
  const [currentPage, setCurrentPage] = useState(page);

  const handlePerPageChange = useCallback(
    (value: number) => {
      dispatch(changeResponseValue({ page: 0, pageCount: value }));
      setCurrentPage(0);
      setPerPage(value);
    },
    [dispatch]
  );

  const handlePageChange = useCallback(
    (pageIndex: number) => {
      dispatch(changeResponseValue({ page: pageIndex }));
      setCurrentPage(pageIndex);
    },
    [dispatch]
  );

  useEffect(() => {
    isLoggedIn && dispatch(setCardPackTC());
  }, [dispatch, page, pageCount, isLoggedIn, userId, ownerCardPack, searchValue]);

  if (!isLoggedIn) return <Navigate to="/login" />;
  return (
    <>
      <div className={cn('container', styles.root)}>
        <MultiRangeSlider
          max={3000}
          callback={(selectedMin, selectedMax) => console.log('' + selectedMin + '---' + selectedMax)}
        />
        <SearchForm ownerCardPack={ownerCardPack} />

        <AddCardForm />

        <Table
          pagination={
            <Table.Pagination
              className={styles.pagination}
              perPage={perPage}
              currentPageIndex={currentPage}
              pagesCount={Math.ceil(responseData?.cardPacksTotalCount! / pageCount)}
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
            {responseData?.cardPacks ? (
              responseData.cardPacks.length !== 0 &&
              responseData.cardPacks.map((item, index) => {
                return <TableItem item={item} userId={userId} key={index} />;
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
  userId: string;
};

const TableItem: FC<TableItemProps> = memo(({ item, userId }) => {
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
              <Button size="xxs">Edit</Button>
            </>
          )}
          <Button size="xxs">Learn</Button>
        </div>
      </Table.TCell>
    </Table.TRow>
  );
});
