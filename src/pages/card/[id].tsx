import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import { useDebounce } from 'use-debounce';
import { useRouter } from 'next/router';

import { Table } from '@alfalab/core-components/table';
import { Loader } from '@alfalab/core-components/loader';
import { MagnifierMIcon } from '@alfalab/icons-glyph/MagnifierMIcon';
import { Input } from '@alfalab/core-components/input';

import { getCard } from '@/redux/thunk/card-thunk';
import { resetCard, setCardUserId } from '@/redux/reducer/card-reducer';
import { NewCardCreator } from '@/components/NewCardCreator';
import { CardTableItem } from '@/components/CardTableItem';
import { useAppSelector } from '@/redux/hooks';
import { RoutesEnum } from '@/helpers/routes';
import { GetCardRequest } from '@/api/api';

import styles from './Card.module.scss';

const Card = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const id = router.query.id as string;

  const isLoggedIn = useAppSelector((state) => state.login.isLoggedIn);
  const { page, pageCount, cards, cardsTotalCount, packUserId } = useAppSelector((state) => state.card);
  const userId = useAppSelector((state) => state.profile._id);

  const [perPage, setPerPage] = useState(pageCount);
  const [currentPage, setCurrentPage] = useState(page);

  const [sortKey, setSortKey] = useState<string | undefined>(undefined);
  const [isSortedDesc, setIsSortedDesc] = useState<boolean | undefined>(undefined);
  const defaultIsSortedDesc = false;

  const [searchTerm, setSearchTerm] = useState('');
  const [search] = useDebounce(searchTerm, 1000);

  const refreshData = useCallback(() => {
    const data: GetCardRequest = {
      cardsPack_id: id,
      page: currentPage + 1,
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
    refreshData();
  }, [currentPage, perPage, id, dispatch, sortKey, isSortedDesc, search, refreshData]);

  useEffect(() => {
    return () => {
      dispatch(resetCard());
      dispatch(setCardUserId(null));
    };
  }, [dispatch]);

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

  if (!isLoggedIn) router.push(RoutesEnum.Login);

  return (
    <>
      <div className={cn('container', styles.root)}>
        <div className={styles.search}>
          {packUserId === userId ? (
            <div className={styles.addNewCard}>
              <NewCardCreator cardsPack_id={id} refreshData={refreshData} />
            </div>
          ) : null}

          <Input
            label="Search..."
            name="search"
            value={searchTerm}
            onChange={handleChangeSearchTerm}
            clear
            onClear={() => setSearchTerm('')}
            block
            leftAddons={<MagnifierMIcon />}
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
                return <CardTableItem item={item} key={item._id} />;
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

export default Card;
