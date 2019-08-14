import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/reducersIndex";
import logger from 'redux-logger';
import thunk from 'redux-thunk';

export default createStore (
  rootReducer, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(logger, thunk)
);
