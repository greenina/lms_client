import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';

const INIT_STATE = {
  jwt: 'init',
  isStudent:true,
  userId:''
};

export const LoginSuccess = (token) => ({
  type: 'LoginSuccess',
  jwt: token
})

export const checkIfStudent = (_isStudent) => ({
  type: 'checkIfStudent',
  isStudent: _isStudent
})

export const checkUserId = (_userId) => ({
  type: 'userId',
  userId: _userId
})

function reducer(state, action) {
  if(state === undefined)
    state = INIT_STATE;

  switch(action.type){
    case 'LoginSuccess':
      // return Object.assign({}, state, {
      //   jwt: action.jwt
      // }
      return {...state, jwt: action.jwt};
    case 'checkIfStudent':
      return{...state,isStudent:action.isStudent}
    case 'userId':
      return{...state, userId:action.userId}
    default:
      return state;
  }
}

const store = createStore(reducer, composeWithDevTools());

store.subscribe(()=> {
  console.log(store.getState())
  // debugger;
  
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
