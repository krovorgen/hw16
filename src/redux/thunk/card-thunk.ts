import { api, GetCardRequest } from '../../api';
import { catchHandler } from '../../helpers/catchHandler';
import { setStatusAppAC } from '../reducer/app-reducer';
import { AppDispatch } from '../store';
import { setCard, setCardsTotalCount } from '../reducer/card-reducer';

export const getCard = (data: GetCardRequest) => (dispatch: AppDispatch) => {
  dispatch(setStatusAppAC('loading'));

  api
    .getCard(data)
    .then((res) => {
      dispatch(setCard(res.data.cards));
      dispatch(setCardsTotalCount(res.data.cardsTotalCount));
    })
    .catch(catchHandler)
    .finally(() => dispatch(setStatusAppAC('idle')));
};
