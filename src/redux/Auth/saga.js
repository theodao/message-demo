import { put, takeLatest, call } from 'redux-saga/effects';
import AuthActions, { AuthTypes } from './reducer';

function* login(payload) {
  yield put(AuthActions.setIsLoggedIn(true));
}

// function* logout(payload) {

// }

export default [takeLatest(AuthTypes.LOGIN, login)];
