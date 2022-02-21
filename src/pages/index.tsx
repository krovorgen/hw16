import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { NextPage } from 'next';

import { Table } from '@alfalab/core-components/table';
import { Loader } from '@alfalab/core-components/loader';
import { useAppSelector } from '@/redux/hooks';
import { changeResponseValue } from '@/redux/reducer/card-pack-reducer';
import { setCardPackTC } from '@/redux/thunk/card-pack-thunk';
import { RoutesEnum } from '@/helpers/routes';
import { SearchForm } from '@/components/SearchForm';
import { AddCardForm } from '@/components/AddCardForm';
import { TableItem } from '@/components/TableItem';
import { LogoutButton } from '@/components/LogoutButton';

import styles from './Main.module.scss';

const defaultIsSortedDesc = false;
const Home: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const isLoggedIn = useAppSelector((state) => state.login.isLoggedIn);
  const userId = useAppSelector((state) => state.profile._id);
  const { page, pageCount, ownerCardPack, responseData, searchValue, sortPacks } = useAppSelector(
    (state) => state.cardPack
  );

  const [perPage, setPerPage] = useState(pageCount);
  const [currentPage, setCurrentPage] = useState(page);
  const [sortKey, setSortKey] = useState<string | undefined>(undefined);
  const [isSortedDesc, setIsSortedDesc] = useState<boolean | undefined>(undefined);

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

  const handleSort = (key: string) => {
    setSortKey(key);
    currentPage !== 0 && setCurrentPage(0);
    if (isSortedDesc !== undefined) {
      dispatch(changeResponseValue({ sortPacks: `${isSortedDesc ? 0 : 1}${sortKey}` }));
      setIsSortedDesc(!isSortedDesc ? undefined : defaultIsSortedDesc);
    } else {
      dispatch(changeResponseValue({ sortPacks: undefined }));
      setIsSortedDesc(!defaultIsSortedDesc);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(setCardPackTC());
    } else {
      router.push(RoutesEnum.Login);
    }
  }, [dispatch, router, page, pageCount, isLoggedIn, userId, ownerCardPack, searchValue, sortPacks]);

  return (
    <>
      <div className={cn('container', styles.root)}>
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
            <Table.TSortableHeadCell
              isSortedDesc={sortKey === 'name' ? isSortedDesc : undefined}
              onSort={() => handleSort('name')}
            >
              Name
            </Table.TSortableHeadCell>
            <Table.TSortableHeadCell
              isSortedDesc={sortKey === 'cardsCount' ? isSortedDesc : undefined}
              onSort={() => handleSort('cardsCount')}
            >
              Cards
            </Table.TSortableHeadCell>
            <Table.TSortableHeadCell
              isSortedDesc={sortKey === 'updated' ? isSortedDesc : undefined}
              onSort={() => handleSort('updated')}
            >
              Last Updated
            </Table.TSortableHeadCell>
            <Table.TSortableHeadCell
              isSortedDesc={sortKey === 'created' ? isSortedDesc : undefined}
              onSort={() => handleSort('created')}
            >
              Created by
            </Table.TSortableHeadCell>
            <Table.THeadCell>Actions</Table.THeadCell>
          </Table.THead>
          <Table.TBody>
            {responseData?.cardPacks ? (
              responseData.cardPacks.length !== 0 &&
              responseData.cardPacks.map((item) => {
                return <TableItem item={item} userId={userId} key={item._id} />;
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

export default Home;
