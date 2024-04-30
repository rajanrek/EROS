import { applyMiddleware, compose, configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from "@redux-saga/core";
import rootReducers from './reducers/rootReducers';
import rootSaga from './sagas/RootSagas/rootSagas';
// import { composeWithDevTools } from 'redux-devtools-extension';


const sagaMiddleware = createSagaMiddleware();

// const composeEnhancers =
//   typeof window === 'object' &&
//   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//       // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
//     }) : compose;


export const store = configureStore({
  reducer: rootReducers,
  middleware: [sagaMiddleware],
  // enhancers:[composeEnhancers],
});

sagaMiddleware.run(rootSaga);
