import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import { seamlessImmutableReconciler } from 'redux-persist-seamless-immutable';
import storage from 'redux-persist/lib/storage';
import { createLogger } from 'redux-logger';
import { createBrowserHistory } from 'history';
import rootReducer from './reducer';
import rootSaga from './saga';

export const history = createBrowserHistory();

// Create store for redux
export default () => {
  /* ------------- Redux Configuration ------------- */
  const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: seamlessImmutableReconciler,
  };
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const middleware = [];
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  /* ------------- Redux Middleware ------------- */

  const sagaMiddleware = createSagaMiddleware();
  middleware.push(createLogger());
  middleware.push(sagaMiddleware);

  /* ------------- Create store  ------------- */

  const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(...middleware)));
  const persistor = persistStore(store);

  /* ------------- Run Root saga ------------- */
  const sagaManager = sagaMiddleware.run(rootSaga);

  return {
    store,
    sagaManager,
    sagaMiddleware,
    persistor,
  };
};
