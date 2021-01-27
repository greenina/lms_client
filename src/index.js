import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { combineReducers, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {composeWithDevTools} from 'redux-devtools-extension';
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from './redux/store';
require('dotenv').config();



//const store = createStore(reducer, composeWithDevTools());


store.subscribe(()=> {
  console.log(store.getState())
  // debugger;
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
