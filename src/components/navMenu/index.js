import React, { Component } from 'react';
import { connect } from 'react-redux';

import './nav_menu.css'

class NavMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}

	render () {
		const {
			note,
		} = this.props;

		return (
			<div className="nav-menu">
        NavMenu
		  </div>
		)
	}
}

function mapStateToProps(state) {
  const { note } = state
  return { note }
}

export default connect(mapStateToProps, {})(NavMenu);
