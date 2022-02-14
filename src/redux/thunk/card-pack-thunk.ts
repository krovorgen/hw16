import { Dispatch } from 'redux';

import { api } from '../../api';
import { catchHandler } from '../../helpers/catchHandler';
import { setStatusAppAC } from '../reducer/app-reducer';
import { setCardPack } from '../reducer/card-pack-reducer';
import { RootStateType } from '../store';

export const setCardPackTC = () => (dispatch: Dispatch, getState: () => RootStateType) => {
  dispatch(setStatusAppAC('loading'));
  api
    .getPack({ page: getState().cardPack.page, pageCount: getState().cardPack.pageCount })
    .then(({ data }) => {
      dispatch(setCardPack(data));
    })
    .catch(catchHandler)
    .finally(() => dispatch(setStatusAppAC('idle')));
};
