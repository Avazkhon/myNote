import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './nav_menu.css';

import DropList from 'widget/DropList'
import CreateNewChaper from './components/CreateNewChaper';
import Chapters from './components/Chapters'

import {
	createNewChapter,
	selectChapter,
	showNavMenu,
} from 'actions/index';

class NavMenu extends Component {
	// constructor(props) {
	// 	super(props);
	// }

	componentDidMount() {
		window.addEventListener('click', this.showSetting);
	}

	componentWillUnmount() {
		window.removeEventListener('click', this.showSetting);
	}

	showSetting = (e) => {
		const name = e.target.dataset.name;
		// console.log('1', this.name);
		// console.log('2', name);
		// console.log(e.path.includes(this.name));
		const domNode = ReactDOM.findDOMNode(this);
		console.log(domNode);
		if ((!domNode || !domNode.contains(e.target))) {
		this.props.showNavMenu(name)
		}
	}

	handleShowSetting = (e) => {
		const name = e.target.dataset.name;
		const nameState = this.props.note.navMenu.isContentSetting;
			this.name = name;
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
			backgroundColor,
			navMenu,
			activeNote,
		} = this.props.note;

		const color = backgroundColor.activeColor && backgroundColor.activeColor.color;

		return (
			<div
				className="nav-menu"
				style={{backgroundColor: color}}
				name="nav-menu"
			>

				<div
					data-name="dropList"
					className="nav-menu__title"
					onClick={this.handleShowSetting}
				>
				Nav menu
				</div>

					{(navMenu.isContentSetting === 'dropList') &&
						<DropList
							arr={navMenu.itemsSetting}
							onClick={this.handleShowSetting}
							componentClassName="main-note_setting-buttons"
							elementClassName="main-note_button"
							title="Nav menu setting"
						/>
					}

					{ activeNote.id &&
						<div>
							{
								(navMenu.isContentSetting === 'isShowCreateNewChapter') &&
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
