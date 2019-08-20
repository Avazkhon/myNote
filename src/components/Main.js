import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../cssStyle/main.css';

import Setting  from './setting/Setting';

import {
	saveNote,
} from '../actions/index'


class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newChengeTetx: '',
			titleNote: '',
			chengeTetxId: null,
			newTitleNote: '',
		}
	}

	handleChenge = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		this.setState({[name]: value});
	}


	handleSave = () => {
		const id = this.state.chengeTetxId;
		const text = this.state.newChengeTetx;
		this.props.saveNote(id, text)
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

					handleCreateNewNote={this.handleCreateNewNote}
					handSelectNote={this.handSelectNote}
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
	saveNote,
})(Main);
