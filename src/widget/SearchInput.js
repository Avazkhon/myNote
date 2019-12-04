import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
	findText,
} from 'utils';

import DropList from 'widget/DropList';

import {
	selectChapter,
	selectNote,
} from '../actions/index';

import './searchInput_style.css';

class SearchInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchText: '',
			searchChapters: [],
		}
	}


	handleChenge = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		this.setState({[name]: value});
	}

	handleChengeSeacrh = (e) => {
		const value = e.target.value;
		const {
			note
		} = this.props;
		const result = findText(note, value);

		this.handleChenge(e);
		if (result.length !== 0) {
			this.setState({searchChapters: result});
		}

		if (value.length === 0) {
			this.setState({searchChapters: []});
		}
	}

	handleSelectchapter = (e) => {
		const id = Number(e.target.dataset.id_chapter);
		const {
			searchChapters,
		} = this.state;
		const {
			plainItem,
			activeNote,
			noteItems,
		} = this.props.note;

		const seacrhChapter = plainItem.find(item => item.id === id);
		const seacrhNote = noteItems.find(item => item.id === id);
		for (let i = 0; i < plainItem.length; i++) {
			if (plainItem[i].chapters && plainItem[i].chapters.length) {
				for (let j = 0; j < plainItem[i].chapters.length; j++) {
					if (plainItem[i].chapters[j].id === id) {
						this.props.selectNote(plainItem[i].id, plainItem[i].chapters[j].id);
					}
					 if (plainItem[i].id === id ) {
						this.props.selectNote(plainItem[i].id)
					}
				}
			}
		}
		this.setState({
			searchText: '',
			searchChapters: [],
		})
	}


	render () {
		const {
			searchText,
			searchChapters,
		} = this.state;

		return (
			<div className="search-input">
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
		)
	}
}


SearchInput.propType = {
  note: PropTypes.shape({}),
  selectChapter: PropTypes.func,
}

export default connect(null, {
	selectChapter,
	selectNote,
})(SearchInput);
