import { Dispatch } from 'redux';

import { api } from '../../api';
import { catchHandler } from '../../helpers/catchHandler';
import { setStatusAppAC } from '../reducer/app-reducer';
import { setCardPack } from '../reducer/card-pack-reducer';
import { AppDispatch, RootStateType } from '../store';
import { toast } from 'react-toastify';

export const setCardPackTC = () => (dispatch: Dispatch, getState: () => RootStateType) => {
  const { page, pageCount, ownerCardPack } = getState().cardPack;
  const { _id } = getState().profile;
  dispatch(setStatusAppAC('loading'));
  api
    .getCardPack({ page, pageCount, user_id: ownerCardPack ? _id : undefined })
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
