import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "./reducers/reducersIndex";
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

const middleWare = [];
middleWare.push(thunk);

const loggerMiddleware = createLogger({
  predicate: () => process.env.NODE_ENV === 'development',
});
middleWare.push(loggerMiddleware);


export default createStore (
  rootReducer, 
  compose(
    applyMiddleware(...middleWare),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  )
);
