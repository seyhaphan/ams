import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger/src';
import { rootReducer } from './redux/reducers/index';
// import 'bootstrap/dist/css/bootstrap.min.css'
import '../src/style/bootstrap.min.css'

const middleware = [thunk, logger]
export const store = createStore(rootReducer, applyMiddleware(...middleware))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

