import { InitialStateType, packsReducer, setPacks, setPacksLoading } from './packs-reducer';
import { PackType } from '../../api';

let initialState = {} as InitialStateType;

beforeEach(() => {
  initialState = {
    cardPacks: [] as Array<PackType>,
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 0,
    pageCount: 0,
    loading: false,
  };
});

const payload = {
  cardPacks: [
    {
      cardsCount: 0,
      created: '2022-02-12T16:33:57.474Z',
      deckCover: 'picture',
      grade: 0,
      more_id: '61fbbfd94d4ed50004a0a106',
      name: 'NewDeck',
      path: '/def',
      private: false,
      rating: 0,
      shots: 0,
      type: 'pack',
      updated: '2022-02-12T16:33:57.474Z',
      user_id: '61fbbfd94d4ed50004a0a106',
      __v: 0,
      _id: '6207e175a553bd0004b2cc42',
    },
  ],
  cardPacksTotalCount: 3962,
  maxCardsCount: 103,
  minCardsCount: 0,
  page: 1,
  pageCount: 4,
};

test('should create action', () => {
  expect(setPacks(payload)).toEqual({
    payload: payload,
    type: 'packs/setPacks',
  });
});

test('should create action', () => {
  expect(setPacksLoading(true)).toEqual({
    payload: true,
    type: 'packs/setPacksLoading',
  });
});

test('should change state', () => {
  const action = setPacks(payload);
  expect(packsReducer(initialState, action)).toEqual({ ...payload, loading: false });
});

test('should change state', () => {
  const action = setPacksLoading(true);
  expect(packsReducer(initialState, action)).toEqual({ ...initialState, loading: true });
});
