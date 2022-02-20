import { toast } from 'react-toastify';

import { api } from '@/api/api';
import { catchHandler } from '@/helpers/catchHandler';
import { setStatusAppAC } from '../reducer/app-reducer';
import { setCardPack } from '../reducer/card-pack-reducer';
import { AppDispatch, RootStateType } from '../store';

export const setCardPackTC = () => (dispatch: AppDispatch, getState: () => RootStateType) => {
  const { page, pageCount, ownerCardPack, searchValue, sortPacks } = getState().cardPack;
  const { _id } = getState().profile;
  dispatch(setStatusAppAC('loading'));
  api
    .getCardPack({
      page: page + 1,
      pageCount,
      user_id: ownerCardPack ? _id : undefined,
      packName: searchValue,
      sortPacks: !!sortPacks ? sortPacks : undefined,
    })
    .then(({ data }) => {
      dispatch(setCardPack(data));
    })
    .catch(catchHandler)
    .finally(() => dispatch(setStatusAppAC('idle')));
};

export const deleteCardPackTC = (cardPackId: string) => (dispatch: AppDispatch) => {
  dispatch(setStatusAppAC('loading'));
  api
    .deleteCardPack(cardPackId)
    .then(() => {
      dispatch(setCardPackTC());
      toast.success('card pack was deleted');
    })
    .catch(catchHandler)
    .finally(() => dispatch(setStatusAppAC('idle')));
};
