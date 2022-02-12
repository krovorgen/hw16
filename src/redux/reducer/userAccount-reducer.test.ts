import { clearUserAccountData, InitialStateType, setUserAccountData, userAccountReducer } from './userAccount-reducer';

test('should create action', () => {
  const payload = {
    _id: '1',
    name: 'user@mail.com',
  };
  expect(setUserAccountData(payload)).toEqual({
    payload: {
      _id: '1',
      name: 'user@mail.com',
    },
    type: 'userAccount/setUserAccountData',
  });
});

test('should create action', () => {
  expect(clearUserAccountData()).toEqual({
    payload: {
      _id: '',
      name: '',
    },
    type: 'userAccount/clearUserAccountData',
  });
});

test('should change state', () => {
  const initialState: InitialStateType = {
    _id: '',
    name: '',
  };

  const payload = {
    _id: '1',
    name: 'user@mail.com',
  };

  const action = setUserAccountData(payload);

  expect(userAccountReducer(initialState, action)).toEqual({
    _id: '1',
    name: 'user@mail.com',
  });
});

test('should change state', () => {
  const initialState: InitialStateType = {
    _id: '1',
    name: 'user@mail.com',
  };

  const action = clearUserAccountData();

  expect(userAccountReducer(initialState, action)).toEqual({
    _id: '',
    name: '',
  });
});
