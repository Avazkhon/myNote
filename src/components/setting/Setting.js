import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
	createNewNote,
	selectNote,
	selectSetting,
} from '../../actions/index'

import DropList from '../DropList';

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
		const id = Date.now();
		const title = this.state.newTitleNote;
		const note = {
			id,
			title,
			text: '',
			createDate: Date(Date.now()),
			activeChapter: null,
			chapters: [
				{
					title: 'no name',
					text: '',
					id,
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
						arr={note.setting.itemsSetting}
						onClick={this.handleChengeIsShow}
						componentClassName="main-note_setting-buttons"
						elementClassName="main-note_button"
						title="Setting"
					/>
        }
				<div className="main-note__setting-form" >
					{ (note.setting.isContentSetting === 'isShowCreateNewNote') &&
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
					{(note.setting.isContentSetting === 'isShowSelectNote') &&

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
