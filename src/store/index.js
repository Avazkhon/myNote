import { createStore, compose } from "redux";
import rootReducer from '../reducers/index';

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const confgureStore = preloadedState => (
	createStore (
		rootReducer,
		preloadedState,
		composeEnhancers(),
	)
)

const store = confgureStore({})

export default  store;