import { AppDispatch } from '../store';
import { api } from '../../api';
import { toast } from 'react-toastify';
import { catchHandler } from '../../helpers/catchHandler';
import { setPacks, setPacksLoading } from '../reducer/packs-reducer';
import * as CONSTANTS from '../../helpers/constants';

export const setPacksTC = () => (dispatch: AppDispatch) => {
  dispatch(setPacksLoading(true));

  api
    .getAllPacks()
    .then((response) => {
      console.log(response.data);
      dispatch(setPacks(response.data));
      toast.success(CONSTANTS.PACKS_SUCCESS_NOTIFICATION);
    })
    .catch(catchHandler)
    .finally(() => {
      dispatch(setPacksLoading(false));
    });
};
