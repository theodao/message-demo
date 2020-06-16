import { put, takeLatest, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import Auth from '../../config/auth';
import AuthActions, { AuthTypes } from './reducer';
import AppActions from '../App/reducer';

function* login({ payload }) {
  try {
    const { email, password, history } = payload;
    yield put(AppActions.setLoading(true));
    const response = yield call(new Auth().loginViaEmail, email, password);
    if (response.success) {
      yield put(AuthActions.setIsLoggedIn(true));
      history.push('/dashboard');
    } else {
      toast.error(response.message);
    }
  } catch (error) {
    console.log(error);
    toast.error('Something went wrong');
  } finally {
    yield put(AppActions.setLoading(false));
  }
}

function* loginViaPopup({ payload }) {
  try {
    const { history } = payload;
    const response = yield call(new Auth().logInViaPopup);
    if (response.success) {
      yield put(AuthActions.setIsLoggedIn(true));
      history.push('/dashboard');
    } else {
      toast.error(response.message);
    }
  } catch (error) {
    console.log(error);
  } finally {
  }
}

function* logout({ payload }) {
  try {
    const { history } = payload;
    const response = yield call(new Auth().logout);
    if (response.success) {
      yield put(AuthActions.setIsLoggedIn(false));
      history.push('/login');
    } else {
      toast.error(response.message);
    }
  } catch (error) {
    console.log(error);
    toast.error('Something went wrong');
  } finally {
  }
}

export default [
  takeLatest(AuthTypes.LOGIN, login),
  takeLatest(AuthTypes.LOGIN_VIA_POPUP, loginViaPopup),
  takeLatest(AuthTypes.LOGOUT, logout),
];
