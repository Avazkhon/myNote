import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './nav_menu.css';

import CreateNewChaper from './components/CreateNewChaper';
import Chapters from './components/Chapters'
import DropList from '../DropList'

import {
	createNewChapter,
	selectChapter,
	showNavMenu,
} from 'actions/index';

class NavMenu extends Component {
	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		newTitleChapter: '',
	// 	}
	// }

	handleShowSetting = (e) => {
		const name = e.target.dataset.name;
		const nameState = this.props.note.navMenu.isContentSetting;
		if (name === nameState) {
			this.props.showNavMenu(null)
		}else {
			this.props.showNavMenu(name)
		}
	}

	handleChenge = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		this.setState({[name]: value});
	}

	render () {
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
				>
				Nav menu
				</div>

					{(setting.isContentSetting === 'dropList') &&
						<DropList
							arr={setting.itemsSetting}
							onClick={this.handleShowSetting}
							componentClassName="main-note_setting-buttons"
							elementClassName="main-note_button"
							title="Nav menu setting"
						/>
					}

					{ note.activeNote.id &&
						<div>
							{
								(setting.isContentSetting === 'isShowCreateNewChapter') &&
								<CreateNewChaper

								/>
							}
							<Chapters />
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
