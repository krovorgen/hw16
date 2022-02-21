import { api, GetCardRequest } from '../../api';
import { catchHandler } from '@/helpers/catchHandler';
import { setStatusAppAC } from '../reducer/app-reducer';
import { AppDispatch, RootStateType } from '../store';
import { setCard } from '../reducer/card-reducer';

export const getCard = (id: string) => (dispatch: AppDispatch, getState: () => RootStateType) => {
  dispatch(setStatusAppAC('loading'));

  const { page, pageCount } = getState().card;

  const data: GetCardRequest = {
    cardsPack_id: id,
    page: page + 1,
    pageCount,
  };

  api
    .getCard(data)
    .then((res) => {
      const { cards, cardsTotalCount, packUserId } = res.data;
      dispatch(setCard({ cards, cardsTotalCount, packUserId }));
    })
    .catch(catchHandler)
    .finally(() => dispatch(setStatusAppAC('idle')));
};

export const deleteCard = (id: string) => (dispatch: AppDispatch) => {
  dispatch(setStatusAppAC('loading'));

  api
    .deleteCard(id)
    .then(() => {})
    .catch(catchHandler)
    .finally(() => dispatch(setStatusAppAC('idle')));
};
