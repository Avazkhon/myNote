import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
	createNewChapter,
	showNavMenu,
} from 'actions/index';

class CreateNewChapter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newTitleChapter: '',
		}
	}

	handleShowSetting = (e) => {
		const name = e.target.dataset.name;
		const nameState = this.props.note.navMenu.isContentSetting;
		if (name === nameState) {
			this.props.showNavMenu(null)
		}else {
			this.props.showNavMenu(name)
		}
	}

	handleChenge = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		this.setState({[name]: value});
	}

	handleCreateNewNote = (e) => {
		const title = this.state.newTitleChapter
		if (title.length <=1) {
			return
		}
		const chapter =	{
			title,
			text: '',
			id: Date.now() + 27,
		}
		const id = this.props.note.activeNote.id;

		this.props.createNewChapter(id, chapter)
		this.handleShowSetting(e)
	}

	render () {
		const {
			newTitleChapter,
		} = this.state;

		return (

			<div>
				<div>Title for new note</div>
				<input
					type='text'
					name='newTitleChapter'
					value={newTitleChapter}
					onChange={this.handleChenge}/>
				<input
					className="main-note_button"
					type='button'
					value='create new note'
					onClick={this.handleCreateNewNote}
			 />
			 <input
				 className="main-note_button"
				 type='button'
				 value='X'
				 onClick={this.handleShowSetting}
			/>
			</div>
		)
	}
}

CreateNewChapter.propType = {
	note: PropTypes.object,
	createNewChapter: PropTypes.func,
	showNavMenu: PropTypes.func,
}

function mapStateToProps(state) {
  const { note } = state
  return { note }
}

export default connect(
	mapStateToProps,
	{
		createNewChapter,
		showNavMenu,
	}
)(CreateNewChapter);
