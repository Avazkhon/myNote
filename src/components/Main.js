import React, { Component } from 'react';
import { connect } from 'react-redux';

class Main extends Component {


	render () {
		const {
			note
		} = this.props

		return (
			<div>
				<h3>title</h3>
				<input type='text' />
				<input type='button' value='add' />
				<div>
					<h3>List</h3>
					<ul>
					{note.map(item => {
						return (
							<li key={item.id} >
								<h6>{item.range}</h6>
								<p>{item.text}</p>
							</li>
						)
					})}
					</ul>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
  const { note } = state
  return { note }
}

export default connect(mapStateToProps, {})(Main);
