import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './App';

const initialState = [
  'Встретить майские праздники!',
  'Встретить 9 Мая!'
]

function nodeText( state = initialState, action ) {
  if(action.type === 'ADD_TEXT') {
    return [
	  ...state,
	  action.payload
    ];
  }
  return state;
};

const store = createStore(nodeText);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);