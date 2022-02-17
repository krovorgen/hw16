import React, { ChangeEvent, FC, memo, useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import cn from 'classnames';

import { useAppSelector } from '../../redux/hooks';
import { CardItemType, GetCardRequest } from '../../api';

import styles from './Card.module.scss';
import { Table } from '@alfalab/core-components/table';
import { Loader } from '@alfalab/core-components/loader';

import dayjs from 'dayjs';
import { getCard } from '../../redux/thunk/card-thunk';
import { Input } from '@alfalab/core-components/input';
import { resetCard } from '../../redux/reducer/card-reducer';

import { useDebounce } from 'use-debounce';

export const Card = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useAppSelector((state) => state.login.isLoggedIn);
  const { page, pageCount, cards, cardsTotalCount } = useAppSelector((state) => state.card);

  const { id } = useParams();
  const [perPage, setPerPage] = useState(pageCount);
  const [currentPage, setCurrentPage] = useState(page);

  const [sortKey, setSortKey] = useState<string | undefined>(undefined);
  const [isSortedDesc, setIsSortedDesc] = useState<boolean | undefined>(undefined);
  const defaultIsSortedDesc = false;

  const [searchTerm, setSearchTerm] = useState('');
  const [search] = useDebounce(searchTerm, 1000);

  useEffect(() => {
    if (!id) return;

    const data: GetCardRequest = {
      cardsPack_id: id,
      page: currentPage,
      pageCount: perPage,
    };

    if (isSortedDesc !== undefined) {
      if (sortKey === 'grade') {
        data.sortCards = `${isSortedDesc ? 1 : 0}${sortKey}`;
      } else {
        data.sortCards = `${isSortedDesc ? 0 : 1}${sortKey}`;
      }
    }

    if (search) {
      data.cardQuestion = search;
    }

    dispatch(getCard(data));
  }, [currentPage, perPage, id, dispatch, sortKey, isSortedDesc, search]);

  useEffect(() => {
    return () => {
      dispatch(resetCard());
    };
  }, []);

  const handlePageChange = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };

  const handlePerPageChange = (value: number) => {
    setPerPage(value);
  };

  const handleSort = (key: string) => {
    setSortKey(key);
    if (isSortedDesc !== undefined) {
      setIsSortedDesc(!isSortedDesc ? undefined : defaultIsSortedDesc);
    } else {
      setIsSortedDesc(!defaultIsSortedDesc);
    }
  };

  const handleChangeSearchTerm = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // const handleClearSearchTerm = (event: MouseEvent<HTMLButtonElement>) => {
  //   setSearchTerm('');
  // };

  if (!isLoggedIn) return <Navigate to="/login" />;

  return (
    <>
      <div className={cn('container', styles.root)}>
        <div className={styles.search}>
          <Input
            label="Search..."
            name="search"
            value={searchTerm}
            onChange={handleChangeSearchTerm}
            clear
            onClear={() => setSearchTerm('')}
            block
          />
        </div>

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
            <Table.TSortableHeadCell
              title="Question"
              isSortedDesc={sortKey === 'question' ? isSortedDesc : undefined}
              onSort={() => handleSort('question')}
            >
              Question
            </Table.TSortableHeadCell>
            <Table.TSortableHeadCell
              title="Answer"
              isSortedDesc={sortKey === 'answer' ? isSortedDesc : undefined}
              onSort={() => handleSort('answer')}
            >
              Answer
            </Table.TSortableHeadCell>
            <Table.TSortableHeadCell
              title="Created"
              isSortedDesc={sortKey === 'created' ? isSortedDesc : undefined}
              onSort={() => handleSort('created')}
            >
              Created
            </Table.TSortableHeadCell>
            <Table.TSortableHeadCell
              title="Last Updated"
              isSortedDesc={sortKey === 'updated' ? isSortedDesc : undefined}
              onSort={() => handleSort('updated')}
            >
              Last Updated
            </Table.TSortableHeadCell>
            <Table.TSortableHeadCell
              title="Grade"
              isSortedDesc={sortKey === 'grade' ? isSortedDesc : undefined}
              onSort={() => handleSort('grade')}
            >
              Grade
            </Table.TSortableHeadCell>
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
      <Table.TCell>{dayjs(item.created).format('DD.MM.YY HH:mm:ss')}</Table.TCell>
      <Table.TCell>{dayjs(item.updated).format('DD.MM.YY HH:mm:ss')}</Table.TCell>
      <Table.TCell>{item.grade}</Table.TCell>
    </Table.TRow>
  );
});
