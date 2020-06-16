import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  setLoading: ['payload'],
});

export const AppTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

const INITIAL_STATE = Immutable({
  isLoading: false,
});

/* ------------- Reducer ------------- */

const setLoading = (state, { payload: isLoading }) => state.set('isLoading', isLoading);

/* ------------- Link reducers to action types  ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_LOADING]: setLoading,
});
