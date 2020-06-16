import { combineReducers } from 'redux';

export default combineReducers({
  auth: require('./Auth/reducer').reducer,
  app: require('./App/reducer').reducer,
});
