import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../cssStyle/main.css';
import '../cssStyle/main_element.css'

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
		}
	}

	componentWillReceiveProps(nexProps) {
		if (
			!this.props.note.activeNote
			|| this.props.note.activeNote.id
			!== nexProps.note.activeNote.id
		) {
			this.setState({
				newChengeTetx: nexProps.note.activeNote.text,
				chengeTetxId: nexProps.note.activeNote.id,
			});
		}
	}

	handleChenge = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		this.setState({[name]: value});
	}


	handleSave = () => {
		const id = this.state.chengeTetxId;
		console.log(id)
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
			newTitleNote,
			titleNote,
		} = this.state;

		return (
			<div className="main-note">
				<Setting />
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
