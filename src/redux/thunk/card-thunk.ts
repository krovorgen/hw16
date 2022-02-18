import { api, GetCardRequest } from '../../api';
import { catchHandler } from '../../helpers/catchHandler';
import { setStatusAppAC } from '../reducer/app-reducer';
import { AppDispatch } from '../store';
import { setCard, setCardsTotalCount, setCardUserId } from '../reducer/card-reducer';

export const getCard = (data: GetCardRequest) => (dispatch: AppDispatch) => {
  dispatch(setStatusAppAC('loading'));

  api
    .getCard(data)
    .then((res) => {
      dispatch(setCard(res.data.cards));
      dispatch(setCardsTotalCount(res.data.cardsTotalCount));
      dispatch(setCardUserId(res.data.packUserId));
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
