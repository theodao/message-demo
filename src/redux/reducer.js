import { combineReducers } from 'redux';
import { reducer as AuthReducer } from './Auth/reducer';

export default combineReducers({
  auth: AuthReducer,
});
