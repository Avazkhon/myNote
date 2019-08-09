import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveNote } from '../actions/index'


class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			chengeTetx: '',
		}

	}

	handleChenge = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		this.setState({[name]: value});
	}

	handleSave = () => {
		const id = Date.now();
		const text = this.state.chengeTetx;
		this.props.saveNote(id, text)
		this.setState({chengeTetx: ''});

	}

	render () {
		const {
			note
		} = this.props;

		const {
			chengeTetx
		} = this.state;


		return (
			<div>
				<h3>text</h3>
				<textarea name="chengeTetx" value={chengeTetx} onChange={this.handleChenge}/>
				<input type='button' value='save' onClick={this.handleSave}/>
			</div>
		)
	}
}

function mapStateToProps(state) {
  const { note } = state
  return { note }
}

export default connect(mapStateToProps, {
	saveNote,
})(Main);
