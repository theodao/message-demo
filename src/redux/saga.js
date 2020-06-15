import { all } from 'redux-saga/effects';

/* ------------- Sagas ------------- */
import authSaga from './Auth/saga';

export default function* root() {
  yield all([...authSaga]);
}
