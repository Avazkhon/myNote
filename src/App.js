import React, { Component } from 'react';
import { Provider } from 'react-redux'

import store from './store/index';

console.log(store.getState())

class App extends Component {
	render () {
		return (
			<Provider store={store} >
				<div>
					<h3>title</h3>
					<input type='text' />
					<input type='button' value='add' />
					<div>
						<h3>List</h3>
						<ul>
						</ul>
					</div>
				</div>
			</Provider>
		)
	}
}

export default App;
