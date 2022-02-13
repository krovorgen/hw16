import { Dispatch } from 'redux';

import { api } from '../../api';
import { catchHandler } from '../../helpers/catchHandler';
import { setStatusAppAC } from '../reducer/app-reducer';
import { setCardPack } from '../reducer/card-pack-reducer';

export const setCardPackTC = () => (dispatch: Dispatch) => {
  dispatch(setStatusAppAC('loading'));
  api
    .getPack()
    .then(({ data }) => {
      dispatch(setCardPack(data));
    })
    .catch(catchHandler)
    .finally(() => dispatch(setStatusAppAC('idle')));
};
