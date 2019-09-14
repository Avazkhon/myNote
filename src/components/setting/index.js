import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
	createNewNote,
	selectNote,
	selectSetting,
} from 'actions/index'

import DropList from 'widget/DropList';

class Setting extends Component {
  constructor(props) {
		super(props);
		this.state = {
			chengeTetxId: null,
			newTitleNote: '',
			isSettingShow: false,
			isShowCreateNewNote: false,
			isShowSelectNote: false,
		}
	}

	handleChenge = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		this.setState({[name]: value});
	}

	handleChengeIsShow = (event) => {
		let name = event;
		if (event.target) {
			name = event.target.dataset.name;
		}

		this.props.selectSetting(name);
	}

	handleCreateNewNote = () => {
		const title = this.state.newTitleNote;
		const checkTitle = this.props.note.noteItems.find((note) => note.title === title)
		if (checkTitle) {
			return null;
		}

		const id = Date.now();
		const note = {
			id,
			title,
			text: '',
			createDate: Date(Date.now()),
			activeChapter: id,
			chapters: [
				{
					title: 'no name',
					text: '',
					id: id + 1010,
				}
			],
		}

		if (title.length >= 2) {
			this.props.createNewNote(note)
			this.setState( prevProps =>(
				{
					chengeTetxId: id,
					newTitleNote: '',
				}
			));

			this.handleChengeIsShow('isShowCreateNewNote')
			this.props.selectSetting();
		}
	}

	handleSettingShow = () => {
		this.setState((prevState) => (
			{isSettingShow: !prevState.isSettingShow}
		))
		this.props.selectSetting();
	}

	handleCloseSettingShow = (e) => {
		if (e.target.className === 'main-note_button') {
			this.setState({
				isSettingShow: false,
			})
		}
	}

	handSelectNote = (event) => {
		const id = event.target.dataset.name;
		this.props.selectNote(id)
		this.props.selectSetting();
	}

  render() {
    const {
      note,

    } = this.props;

    const {
      newTitleNote,
      isSettingShow,
    } = this.state;

    return(
      <div onClick={this.handleCloseSettingShow}>
        <input
  				className="main-note_setting-show btn"
  				type="button"
  				onClick={this.handleSettingShow}
  				value="Setting"
  			/>
        {
					isSettingShow &&
					<DropList
						arr={note.mainSetting.itemsSetting}
						onClick={this.handleChengeIsShow}
						componentClassName="main-note_setting-buttons"
						elementClassName="main-note_button"
						title="Setting"
					/>
        }
				<div className="main-note__setting-form" >
					{ (note.mainSetting.isContentSetting === 'isShowCreateNewNote') &&
						<div>
							<div>Title for new note</div>
							<input
								type='text'
								name='newTitleNote'
								value={newTitleNote}
								onChange={this.handleChenge}/>
							<input
								className="main-note_button"
								type='button'
								value='create new note'
								onClick={this.handleCreateNewNote}
			       />
						</div>
					}
					{(note.mainSetting.isContentSetting === 'isShowSelectNote') &&

					<DropList
						arr={note.noteItems}
						onClick={this.handSelectNote}
						componentClassName="main-note_setting-buttons"
						elementClassName="main-note_button"
						title="Select note"
					/>
					}
				</div>
      </div>
    )
  }
}

function mapStateToProps({
  note,
}) {
  return { note }
}

export default connect(mapStateToProps, {
  createNewNote,
  selectNote,
	selectSetting,
})(Setting);
