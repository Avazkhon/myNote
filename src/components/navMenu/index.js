import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './nav_menu.css'

import {
	selectChapter,
} from '../../actions/index';

class NavMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}

	handleSelectchapter = (e) => {
		const id = e.target.dataset.id;
		this.props.selectChapter(Number(id))
	}

	render () {
		const {
			note,
		} = this.props;

		return (
			<div className="nav-menu">
        <div className="nav-menu__title" >nav menu</div>
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
}

function mapStateToProps(state) {
  const { note } = state
  return { note }
}

export default connect(
	mapStateToProps,
	{selectChapter}
)(NavMenu);
