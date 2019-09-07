import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
	selectChapter,
} from 'actions/index';

class Chapters extends Component {

	handleSelectchapter = (e) => {
		const id = e.target.dataset.id;
		this.props.selectChapter(Number(id))
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
}

function mapStateToProps(state) {
  const { note } = state
  return { note }
}

export default connect(
	mapStateToProps,
	{
		selectChapter,
	}
)(Chapters);
