import { applyMiddleware, createStore } from "redux";
import rootReducer from "./reducers/reducersIndex";
import logger from 'redux-logger';

export default createStore (
  rootReducer, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(logger)
);
