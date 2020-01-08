import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from '../reducers/index';
import { save } from 'redux-localstorage-simple';

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const confgureStore = preloadedState => (
	createStore (
		rootReducer,
		preloadedState,
		composeEnhancers(applyMiddleware(save({namespace: 'reduxState'}))),
	)
)

const store = confgureStore({})

export default  store;
