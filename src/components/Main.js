import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../cssStyle/main.css';

import Setting  from './setting/Setting';

import {
	createNewNote,
	saveNote,
	selectNote,
} from '../actions/index'


class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newChengeTetx: '',
			titleNote: '',
			chengeTetxId: null,
			newTitleNote: '',
			isSettingShow: false,
			isShowCreateNewNote: false,
			isShowSelectNote: false,
		}
	}

	componentWillReceiveProps(nexProps) {
		const {
			newChengeTetx,
			chengeTetxId,
		} = this.state;

		if (chengeTetxId) {
			this.openNote(chengeTetxId)
		}
	}

	handleChenge = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		this.setState({[name]: value});
	}

	handleChengeIsShow = (event) => {
		let name = event;
		if (event.target) {
			name = event.target.dataset.name;
		}

		this.setState((prevState) => (
			{[name]: !prevState[name]}
		));
	}

	handleSave = () => {
		const id = this.state.chengeTetxId;
		const text = this.state.newChengeTetx;
		this.props.saveNote(id, text)
	}

	handleCreateNewNote = () => {
		const id = Date.now();
		const title = this.state.newTitleNote;
		this.props.createNewNote(id, '', title)
		this.setState( prevProps =>(
			{
				chengeTetxId: id,
				newChengeTetx: '',
				newTitleNote: '',
				titleNote: title,
			}
		));

		this.handleChengeIsShow('isShowCreateNewNote')
	}

	openNote = (id) => {
		const note = this.props.note.noteItems.find(item => {
			return item.id === id;
		})
	}

	handleSettingShow = () => {
		this.setState((prevState) => (
			{isSettingShow: !prevState.isSettingShow}
		))
	}

	handSelectNote = (event) => {
		const id = event.target.name;
		this.props.selectNote(id)
		const { note } = this.props;
		const activeNote = note.noteItems.find(item => item.id === Number(id))
		this.setState({
			newChengeTetx: activeNote.text,
			chengeTetxId: id,
		})
	}


	render () {
		const {
			note,
		} = this.props;

		const {
			newChengeTetx,
			chengeTetxId,
			isSettingShow,
			isShowCreateNewNote,
			isShowSelectNote,
			newTitleNote,
			titleNote,
		} = this.state;

		return (
			<div className="main-note">
			<Setting
				isSettingShow={isSettingShow}
				setting={note.setting}
				isShowCreateNewNote={isShowCreateNewNote}
				isShowSelectNote={isShowSelectNote}
				newTitleNote={newTitleNote}
				note={note}

				handleChenge={this.handleChenge}
				handleCreateNewNote={this.handleCreateNewNote}
				handSelectNote={this.handSelectNote}
				handleChengeIsShow={this.handleChengeIsShow}
				handleSettingShow={this.handleSettingShow}
			/>
				<div className="note-canvas">
					<h3>Note</h3>
					{note.activeNote &&
						<div>
							<div>{note.activeNote.title}</div>
							<textarea
								className="main-note__main-text"
								name="newChengeTetx"
								value={newChengeTetx}
								onChange={this.handleChenge}
								/>
							<input
								className="main-note_button"
								type='button'
								value='save'
								onClick={this.handleSave}
								/>
						</div>
					}
				</div>
		</div>
		)
	}
}

function mapStateToProps(state) {
  const { note } = state
  return { note }
}

export default connect(mapStateToProps, {
	createNewNote,
	saveNote,
	selectNote,
})(Main);
