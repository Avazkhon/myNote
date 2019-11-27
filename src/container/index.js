import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
	getLengthTextNote,
	findText,
} from 'utils';

import SearchInput from 'widget/SearchInput';


import 'cssStyle/main.css';
import 'cssStyle/main_element.css';

import Setting  from 'components/setting';
import SettingAll from 'components/SettingAll';
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

	render () {
		const {
			note,
		} = this.props;

		const {
			newChengeTetx,
			idInput,
			changeTitle,
		} = this.state;

		const {
			activeNote,
			backgroundImage,
		} = note;

		const setingArr = [
			{id: 1, title:'Save changes', name: 'save', onClick: this.handleSave},
			{id: 2, title: 'Delete this note ', name: 'delete', onClick: this.handleDelete}
		]

		const img = backgroundImage && backgroundImage.image.find(img => img.id === backgroundImage.activeImg);
		const date = activeNote.id && activeNote.createDate.match(/[0-9]+\ [0-9]+\ [0-9]+:[0-9]+/gm)[0];
		const style = {'backgroundImage': `url(${img && img.url})`}

		const arr = [

		]
		return (
			<div
			style={style}
				className="main-note">
				<div className="note-content" >
					<div className="main-note_title"></div>
					<div className="setting-gruop">
						<Setting />
						{
							activeNote.id &&
							<SettingAll
								title="Setting file"
								setingArr={setingArr}
							/>
						}
					</div>
					{activeNote.id &&
						<NavMenu />
					}
					<div className="note-canvas">
						{activeNote.id &&
							<>
								<div
									data-id={activeNote.id}
									data-title={activeNote.title}
									onDoubleClick={this.getInput}
									className="note_title"
								>
								{!(idInput === activeNote.id) && activeNote.title}

								{ idInput === activeNote.id &&
									<input
										name={activeNote.id}
										type="text"
										value={changeTitle}
										onChange={this.handleChangeTitleNote}
										onKeyPress={this.pressEnter}
									/>
								}
								</div>
								<div className="note_date" >Create - {date}</div>
								{ activeNote.id &&	<SearchInput	note={note} />}

								<textarea
									className="main-note__main-text"
									name="newChengeTetx"
									value={newChengeTetx}
									onChange={this.handleChenge}
								/>
							</>
						}
						{
							activeNote.id &&
							<div className="main-note_btn-gruop ">
								<div className="length-text-note">words in the text: {getLengthTextNote(activeNote)}</div>
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
