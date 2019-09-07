import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
	selectChapter,
	selectSettingAll,
} from 'actions/index';

class Chapters extends Component {

	handleSelectchapter = (e) => {
		const id = e.target.dataset.id;
		this.props.selectChapter(Number(id))
	}

	handleShowSettingChapter = (e) => {
		const { name } = e.target.dataset;
		this.props.selectSettingAll('chapterSetting', name)
	}

	render () {

		const {
			note,
		} = this.props;


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
  						<li key={chapter.id}>
  							<div
  								className={chapter.id === note.activeNote.activeChapter ? 'nav-menu_active-chapter' : ''}
  								data-id={chapter.id}
  								onClick={this.handleSelectchapter}
  							>
  								{chapter.title}
  							</div>
								<div>
									<div data-name={chapter.title} onClick={this.handleShowSettingChapter}>#</div>
									{note.chapterSetting.isContentSetting === chapter.title &&
										<div>
										hello worrld
										</div>
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
	}
)(Chapters);
