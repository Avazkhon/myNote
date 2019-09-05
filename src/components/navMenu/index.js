import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './nav_menu.css';

import DropList from '../DropList'

import {
	createNewChapter,
	selectChapter,
	showNavMenu,
} from '../../actions/index';

class NavMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newTitleChapter: '',
		}
	}

	handleSelectchapter = (e) => {
		const id = e.target.dataset.id;
		this.props.selectChapter(Number(id))
	}

	handleShowSetting = (e) => {
		const name = e.target.dataset.name;
		const nameState = this.props.note.navMenu.isContentSetting;
		if (name === nameState) {
			this.props.showNavMenu(null)
			// this.setState((prevState) => ({
			// 	setting: {
			// 		...prevState.setting,
			// 		isContentSetting: null,
			// 	}
			// }))
		}else {
			this.props.showNavMenu(name)
			// this.setState((prevState) => ({
			// 	setting: {
			// 		...prevState.setting,
			// 		isContentSetting: name,
			// 	}
			// }))
		}
	}

	handleChenge = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		this.setState({[name]: value});
	}

	handleCreateNewNote = (e) => {
		const chapter =	{
			title: this.state.newTitleChapter,
			text: 'more tar tares',
			id: Date.now() + 27,
		}
		const id = this.props.note.activeNote.id;

		this.props.createNewChapter(id, chapter)
		this.handleShowSetting(e)
	}

	render () {
		const {
			// setting,
			newTitleChapter,
		} = this.state;

		const {
			note,
		} = this.props;

		const setting = note.navMenu;

		return (
			<div className="nav-menu">
        <div
					data-name="dropList"
					className="nav-menu__title"
					onClick={this.handleShowSetting}
				>Nav menu</div>
				{(setting.isContentSetting === 'dropList') &&
					<DropList
						arr={setting.itemsSetting}
						onClick={this.handleShowSetting}
						componentClassName="main-note_setting-buttons"
						elementClassName="main-note_button"
						title="Nav menu setting"
					/>
				}
				{
					note.activeNote.id &&
					<div>
						<div
						className={`nav-menu-maine-text ${note.activeNote.id === note.activeNote.activeChapter ? 'nav-menu_active-chapter' : ''}`}
						data-id={note.activeNote.id}
						onClick={this.handleSelectchapter}
						>
							main text
						</div>
						{
							(setting.isContentSetting === 'isShowCreateNewChapter') &&
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
						}
						<ul className="nav-menu__items">
							{note.activeNote.chapters.length >= 1 &&
								note.activeNote.chapters.map((chapter) => {
								return (
									<li key={chapter.id}>
										<div
											className={chapter.id === note.activeNote.activeChapter ? 'nav-menu_active-chapter' : ''}
											data-id={chapter.id}
											onClick={this.handleSelectchapter}
										>
											{chapter.title}
										</div>
									</li>
								)
								})
							}
						</ul>
					</div>
				}
		  </div>
		)
	}
}

NavMenu.propType = {
	note: PropTypes.object,
  selectChapter: PropTypes.func,
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
		selectChapter,
		showNavMenu,
	}
)(NavMenu);
