import React, { useEffect } from 'react';
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

import styles from './Main.module.scss';

export const Main = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useAppSelector((state) => state.login.isLoggedIn);
  const cardPack = useAppSelector((state) => state.cardPack.responseData?.cardPacks);

  useEffect(() => {
    dispatch(setCardPackTC());
  }, [dispatch]);

  if (!isLoggedIn) return <Navigate to="/login" />;

  return (
    <>
      <div className={cn('container', styles.root)}>
        <Table>
          <Table.THead>
            <Table.THeadCell>Name</Table.THeadCell>
            <Table.THeadCell>Cards</Table.THeadCell>
            <Table.THeadCell>Last Updated</Table.THeadCell>
            <Table.THeadCell>Created by</Table.THeadCell>
            <Table.THeadCell>Actions</Table.THeadCell>
          </Table.THead>
          <Table.TBody>
            {cardPack ? (
              cardPack.length !== 0 &&
              cardPack.map((item, index) => (
                <Table.TRow key={index}>
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
              ))
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
