import { put, takeLatest, call } from 'redux-saga/effects';
import Auth from '../../config/auth';
import AuthActions, { AuthTypes } from './reducer';

function* login({ payload }) {
  try {
    const { email, password } = payload;
    const response = yield call(new Auth().loginViaEmail, email, password);
    if (response.success) {
      // yield put(push('/dashboard'))
    } else {
      // toast.error(result.message);
    }
    yield put(AuthActions.setIsLoggedIn(true));
  } catch (error) {
    console.log(error);
    AuthActions.setError();
  } finally {
  }
}

function* loginViaPopup({ payload }) {
  try {
    const response = yield call(new Auth().logInViaPopup);
  } catch (error) {
    console.log(error);
  } finally {
  }
}

function* logout(payload) {
  try {
    const response = yield call(new Auth().logout);
    yield put(AuthActions.setIsLoggedIn(false));
  } catch (error) {
    console.log(error);
  } finally {
  }
}

export default [
  takeLatest(AuthTypes.LOGIN, login),
  takeLatest(AuthTypes.LOGIN_VIA_POPUP, loginViaPopup),
  takeLatest(AuthTypes.LOGOUT, logout),
];
