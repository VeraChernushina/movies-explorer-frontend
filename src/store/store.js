import { configureStore, compose, applyMiddleware } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers";
import createSagaMiddleware from "@redux-saga/core";
import { saga } from "./sagas";

const sagaMiddleware = createSagaMiddleware();

export default configureStore({
  reducer: rootReducer
}, compose(
  applyMiddleware(sagaMiddleware)
))

sagaMiddleware(saga);