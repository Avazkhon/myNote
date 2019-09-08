import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
	selectChapter,
	selectSettingAll,
	deleteChapter,
} from 'actions/index';

import DropList from 'widget/DropList';

import '../style/chapter.css'

class Chapters extends Component {

	constructor(props) {
		super(props);
		this.state = {
			idInput: '',
			changeTitle: '',
		}
	}

	handleSelectchapter = (e) => {
		const id = e.target.dataset.id;
		this.props.selectChapter(Number(id))
	}

	handleShowSettingChapter = (e) => {
		const { name } = e.target.dataset;
		this.props.selectSettingAll('chapterSetting', name)
	}

	handleChengeChpater = (e) => {
		const idNote = this.props.note.activeNote.id;
		const id_chapter = Number(e.target.dataset.id_chapter);
		this.props.deleteChapter(idNote, id_chapter)
	}

	getInput = (e) => {
		const id = Number(e.target.dataset.id);
		const title = e.target.dataset.title;
		// console.log(e.target.dataset)
		this.setState({idInput: id, changeTitle: title}, () => console.log(this.state));
	}

	handleChangeTitleChapter = (e) => {
		const title = e.target.value
		this.setState({changeTitle: title})
	}

	render () {

		const {
			note,
		} = this.props;

		const {
			idInput,
			changeTitle,
		} = this.state

		return (
      <div>
  			<div
  			className={`nav-menu-maine-text ${note.activeNote.id === note.activeNote.activeChapter ? 'nav-menu_active-chapter' : ''}`}
  			data-id={note.activeNote.id}
  			onClick={this.handleSelectchapter}
  			>
  				main text
  			</div>
  			<ul className="nav-menu__items">
  				{note.activeNote.chapters.length >= 1 &&
  					note.activeNote.chapters.map((chapter) => {
  					return (
  						<li
								className="nav-menu__item"
								key={chapter.id}
								onDoubleClick={this.getInput}
							>

  							<div
  								className={chapter.id === note.activeNote.activeChapter ? 'nav-menu_active-chapter' : 'nav-menu_chapter'}
  								data-id={chapter.id}
									data-title={chapter.title}
  								onClick={this.handleSelectchapter}
  							>
  								{!(idInput === chapter.id) && chapter.title}

									{ idInput === chapter.id &&
										<input
											value={changeTitle}
											onChange={this.handleChangeTitleChapter}
										/>
									}
  							</div>

								<div className="chapter-dropList">
									<div data-name={chapter.title} onClick={this.handleShowSettingChapter}>#</div>
									{note.chapterSetting.isContentSetting === chapter.title &&
										<DropList
											idChapter={chapter.id}
											arr={note.chapterSetting.itemsSetting}
											onClick={this.handleChengeChpater}
											componentClassName="main-note_setting-buttons"
											elementClassName="main-note_button"
											title="Chapter Setting"
										/>
									}
								</div>

  						</li>
  					)
  					})
  				}
  			</ul>
  		</div>
		)
	}
}

Chapters.propType = {
	note: PropTypes.object,
	selectSettingAll: PropTypes.func,
}

function mapStateToProps(state) {
  const { note } = state
  return { note }
}

export default connect(
	mapStateToProps,
	{
		selectChapter,
		selectSettingAll,
		deleteChapter,
	}
)(Chapters);
