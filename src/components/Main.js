import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
	getLengthTextNote,
	findText,
} from 'utils';

import DropList from 'widget/DropList';


import '../cssStyle/main.css';
import '../cssStyle/main_element.css';
import '../cssStyle/setting.css';
import '../cssStyle/dropList.css'

import Setting  from './setting/Setting';
import NavMenu from './navMenu/index'

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
		const {
			note
		} = this.props;
		this.handleChenge(e);
		const text = findText(note, e.target.value);
		this.setState({searchChapters: text})
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
				<Setting />
				<div className="note-content" >
					{ note.activeNote.id &&
						<div>
							<input
								value={searchText}
								name="searchText"
								type="search"
								onChange={this.handleChengeSeacrh}
								placeholder='Search text'
							/>
							{searchChapters.length !== 0 &&
								<DropList
									arr={searchChapters}
									onClick={this.handleSelectchapter}
									componentClassName="main-note_setting-buttons"
									elementClassName="main-note_button"
									title="Resilt search"
								/>
							}
						</div>
					}
					<div>
						<NavMenu />
					</div>
					<div className="note-canvas">
						<h3>Note</h3>
						{note.activeNote.id &&
							<div>
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
								<textarea
									className="main-note__main-text"
									name="newChengeTetx"
									value={newChengeTetx}
									onChange={this.handleChenge}
								/>
							</div>
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
							</div>
						}
						{note.activeNote.id &&
							<div>words in the text: {getLengthTextNote(note)}</div>
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
