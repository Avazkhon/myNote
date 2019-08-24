import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../cssStyle/main.css';
import '../cssStyle/main_element.css'

import Setting  from './setting/Setting';

import {
	saveNote,
	selectNote,
	deleteNote,
} from '../actions/index'


class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newChengeTetx: '',
			chengeTetxId: null,
		}
	}
	componentDidMount() {
		if (this.props.note.activeNote) {
			this.setState({
				newChengeTetx: this.props.note.activeNote.text,
				chengeTetxId: this.props.note.activeNote.id,
			});
		}
	}
	componentWillReceiveProps(nexProps) {

		if (this.props.note.activeNote) {
			this.setState((p) => ({
				newChengeTetx: nexProps.note.activeNote.text,
				chengeTetxId: nexProps.note.activeNote.id,
			}), console.log('state', this.state));
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
		this.props.saveNote(id, text);
		this.props.selectNote(id);
	}

	handleDelete = () => {
		const id = this.state.chengeTetxId;
		this.props.deleteNote(id);
	}


	render () {
		const {
			note,
		} = this.props;

		const {
			newChengeTetx,
		} = this.state;
		console.log('newChengeTetx', newChengeTetx)
		console.log('this.props.note.activeNote.text', this.props.note.activeNote)

		return (
			<div className="main-note">
				<Setting />
				<div className="note-canvas">
					<h3>Note</h3>
					{note.activeNote.title &&
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
								{note.activeNote.id &&

									<input
										className="main-note_button"
										type='button'
										value='delete'
										onClick={this.handleDelete}
									/>
								}
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
	selectNote,
	deleteNote,
})(Main);
