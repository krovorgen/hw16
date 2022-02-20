import React, { FC, memo } from 'react';
import dayjs from 'dayjs';

import { CardItemType } from '@/api/api';
import { Table } from '@alfalab/core-components/table';

type CardTableItemProps = {
  item: CardItemType;
};

export const CardTableItem: FC<CardTableItemProps> = memo(({ item }) => {
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

CardTableItem.displayName = 'CardTableItem';
