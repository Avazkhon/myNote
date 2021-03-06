import React, { Component } from 'react';
import { Provider } from 'react-redux'

import Main from 'container';

import store from 'store/index';

class App extends Component {
	render () {
		return (
			<Provider store={store} >
				<Main />
			</Provider>
		)
	}
}

export default App;
