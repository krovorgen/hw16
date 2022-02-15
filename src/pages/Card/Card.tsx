import React, { FC, memo, useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import cn from 'classnames';

import { useAppSelector } from '../../redux/hooks';
import { CardItemType } from '../../api';

import styles from './Card.module.scss';
import { Table } from '@alfalab/core-components/table';
import { Loader } from '@alfalab/core-components/loader';

import dayjs from 'dayjs';
import { getCard } from '../../redux/thunk/card-thunk';

export const Card = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useAppSelector((state) => state.login.isLoggedIn);
  const { page, pageCount, cards, cardsTotalCount } = useAppSelector((state) => state.card);

  const { id } = useParams();
  const [perPage, setPerPage] = useState(pageCount);
  const [currentPage, setCurrentPage] = useState(page);

  useEffect(() => {
    if (!id) return;
    dispatch(getCard({ cardsPack_id: id, page: currentPage, pageCount: perPage, sortCards: '1grade' }));
  }, [currentPage, perPage]);

  const handlePageChange = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };

  const handlePerPageChange = (value: number) => {
    console.log('change per page', value);
    setPerPage(value);
  };

  if (!isLoggedIn) return <Navigate to="/login" />;
  return (
    <>
      <div className={cn('container', styles.root)}>
        <Table
          pagination={
            <Table.Pagination
              className={styles.pagination}
              perPage={perPage}
              currentPageIndex={currentPage}
              pagesCount={Math.ceil(cardsTotalCount / perPage)}
              onPageChange={handlePageChange}
              onPerPageChange={handlePerPageChange}
              possiblePerPage={[5, 10, 25, 50]}
            />
          }
        >
          <Table.THead className={styles.thead}>
            <Table.THeadCell>Question</Table.THeadCell>
            <Table.THeadCell>Answer</Table.THeadCell>
            <Table.THeadCell>Last Updated</Table.THeadCell>
            <Table.THeadCell>Grade</Table.THeadCell>
          </Table.THead>
          <Table.TBody>
            {cards ? (
              cards.length !== 0 &&
              cards.map((item) => {
                return <TableItem item={item} key={item._id} />;
              })
            ) : (
              <Loader />
            )}
          </Table.TBody>
        </Table>
      </div>
    </>
  );
};

type TableItemProps = {
  item: CardItemType;
};

const TableItem: FC<TableItemProps> = memo(({ item }) => {
  return (
    <Table.TRow>
      <Table.TCell>{item.question}</Table.TCell>
      <Table.TCell>{item.answer}</Table.TCell>
      <Table.TCell>{dayjs(item.updated).format('DD.MM.YY')}</Table.TCell>
      <Table.TCell>{item.grade}</Table.TCell>
    </Table.TRow>
  );
});
