import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
	getLengthTextNote,
	findText,
} from 'utils';

import DropList from 'widget/DropList';
import SearchInput from 'widget/SearchInput';


import 'cssStyle/main.css';
import 'cssStyle/main_element.css';
import 'cssStyle/dropList.css'

import Setting  from 'components/setting';
import NavMenu from 'components/navMenu';

import {
	saveNote,
	selectNote,
	deleteNote,
	changeTitleNote,
	selectChapter,
} from '../actions/index';

class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newChengeTetx: '',
			idInput: '',
			changeTitle: '',
			searchText: '',
			searchChapters: [],
		}
	}
	componentDidMount() {
		if (this.props.note.activeNote) {
			this.setState({
				newChengeTetx: this.props.note.activeNote.text,
			});
		}
	}
	componentWillReceiveProps(nexProps) {

		if (nexProps.note.activeNote.id) {
			if (nexProps.note.activeNote.id === nexProps.note.activeNote.activeChapter) {
				this.setState((p) => ({
					newChengeTetx: nexProps.note.activeNote.text,
				}));
			} else {
				const chapter = nexProps.note.activeNote.chapters.find(chapter => chapter.id === nexProps.note.activeNote.activeChapter);
				this.setState((p) => ({
					newChengeTetx: chapter && chapter.text,
				}));
			}

		}
	}

	handleChenge = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		this.setState({[name]: value});
	}


	handleSave = () => {
		const id = this.props.note.activeNote.id;
		const text = this.state.newChengeTetx;
		const activeChapter = this.props.note.activeNote.activeChapter;
		this.props.saveNote(id, text, activeChapter);
		// this.props.selectNote(id);
	}

	handleDelete = () => {
		const id = this.props.note.activeNote.id;
		this.props.deleteNote(id);
	}


	getInput = (e) => {
		const id = Number(e.target.dataset.id);
		const title = e.target.dataset.title;
		this.setState({idInput: id, changeTitle: title});
	}

	handleChangeTitleNote = (e) => {
		const title = e.target.value
		this.setState({changeTitle: title})
	}

	pressEnter = (e) => {
		if (e.key === 'Enter') {
			const value = e.target.value;
			if (value.length <=1) {
				return
			}
			const idNote = this.props.note.activeNote.id;
			this.props.changeTitleNote(idNote, value)
			this.setState({idInput: null, changeTitle: ''});

		}
	}

	handleChengeSeacrh = (e) => {
		const value = e.target.value;
		const {
			note
		} = this.props;
		const result = findText(note, value);

		this.handleChenge(e);
		if (result.length !== 0) {
			this.setState({searchChapters: result})
		}

		if (value.length === 0) {
			this.setState({searchChapters: []})
		}
	}

	handleSelectchapter = (e) => {
		const id = e.target.dataset.id_chapter;
		this.props.selectChapter(Number(id))
		this.setState({
			searchText: '',
			searchChapters: [],
		})
	}


	render () {
		const {
			note,
		} = this.props;

		const {
			newChengeTetx,
			idInput,
			changeTitle,
			searchText,
			searchChapters,
		} = this.state;

		const date = note.activeNote.id && note.activeNote.createDate.match(/[0-9]+\ [0-9]+\ [0-9]+:[0-9]+/gm)[0];

		return (
			<div className="main-note">
				<div className="note-content" >
					<h3 className="main-note_title">Note</h3>
					<Setting />
					<NavMenu />
					<div className="note-canvas">
						{note.activeNote.id &&
							<>
								<div
									data-id={note.activeNote.id}
									data-title={note.activeNote.title}
									onDoubleClick={this.getInput}
									className="note_title"
								>
								{!(idInput === note.activeNote.id) && note.activeNote.title}

								{ idInput === note.activeNote.id &&
									<input
										name={note.activeNote.id}
										type="text"
										value={changeTitle}
										onChange={this.handleChangeTitleNote}
										onKeyPress={this.pressEnter}
									/>
								}
								</div>
								<div className="note_date" >Create - {date}</div>
								{ note.activeNote.id &&	<SearchInput	note={note} />}

								<textarea
									className="main-note__main-text"
									name="newChengeTetx"
									value={newChengeTetx}
									onChange={this.handleChenge}
								/>
							</>
						}
						{ note.activeNote.id &&
							<div className="main-note_btn-gruop ">
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

								{note.activeNote.id &&
									<div className="length-text-note">words in the text: {getLengthTextNote(note)}</div>
								}

							</div>
						}
					</div>
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
	changeTitleNote,
	selectChapter,
})(Main);
