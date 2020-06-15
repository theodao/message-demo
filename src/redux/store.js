import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import rootReducer from './reducer';
import rootSaga from './saga';

// Create store for redux
export default () => {
  /* ------------- Redux Configuration ------------- */
  const middleware = [];
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  /* ------------- Saga Middleware ------------- */

  const sagaMiddleware = createSagaMiddleware();
  middleware.push(createLogger());
  middleware.push(sagaMiddleware);

  /* ------------- Create store  ------------- */

  const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)));

  /* ------------- Run Root saga ------------- */
  const sagaManager = sagaMiddleware.run(rootSaga);

  return {
    store,
    sagaManager,
    sagaMiddleware,
  };
};
