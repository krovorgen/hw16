import React, { FC, memo } from 'react';
import dayjs from 'dayjs';

import { CardItemType } from '@/api/api';
import { Table } from '@alfalab/core-components/table';
import { Button } from '@alfalab/core-components/button';

type CardTableItemProps = {
  item: CardItemType;
  userId: string;
  handleDeleteCard: (cardId: string) => void;
};

export const CardTableItem: FC<CardTableItemProps> = memo(({ item, userId, handleDeleteCard }) => {
  return (
    <Table.TRow>
      <Table.TCell>{item.question}</Table.TCell>
      <Table.TCell>{item.answer}</Table.TCell>
      <Table.TCell>{dayjs(item.created).format('DD.MM.YY HH:mm:ss')}</Table.TCell>
      <Table.TCell>{dayjs(item.updated).format('DD.MM.YY HH:mm:ss')}</Table.TCell>
      <Table.TCell>{item.grade}</Table.TCell>
      <Table.TCell>
        {item.user_id === userId && (
          <Button size="xxs" view="primary" onClick={() => handleDeleteCard(item._id)}>
            Delete
          </Button>
        )}
      </Table.TCell>
    </Table.TRow>
  );
});

CardTableItem.displayName = 'CardTableItem';
