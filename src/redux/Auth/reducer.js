import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  setIsLoggedIn: ['payload'],
  setUserToken: ['payload'],
  login: ['payload'],
  logout: ['payload'],
});

export const AuthTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

const INITIAL_STATE = Immutable({
  isLoggedIn: false,
  userToken: null,
});

/* ------------- Reducers ------------- */
const setUserToken = (state, { payload: userToken }) => state.set('userToken', userToken);
const setIsLoggedIn = (state, { payload: isLoggedIn }) => state.set('isLoggedIn', isLoggedIn);

/* ------------- Link reducers to action types  ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_IS_LOGGED_IN]: setIsLoggedIn,
  [Types.SET_USER_TOKEN]: setUserToken,
});
