import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
	createNewNote,
	selectNote,
	selectSetting,
	selectBackgroundImage,
	clearData,
	selectBackgroundColor,
} from 'actions'

import DropList from 'widget/DropList';

import './setting.css';

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

		this.settingRef = React.createRef();
	}
	componentDidMount() {
		window.addEventListener('click', this.showSetting);
	}

	componentWillUnmount() {
		window.removeEventListener('click', this.showSetting);
	}

	showSetting = (e) => {
		const id = this.settingRef.current.id;
		if (id !== e.target.name) {
			this.setState({isSettingShow: false});
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

	handleSelectBackgroundImg = (e) => {
		const id = Number(e.target.dataset.id_chapter);
		this.props.selectBackgroundImage(id);
	}

	clearLocalStorage = (e) => {
		this.props.clearData();
		this.handleChengeIsShow(e);
	}

	handleSelectBackgroundColor = (e) => {
		const id = Number(e.target.dataset.id_chapter);
		this.props.selectBackgroundColor(id)
		this.handleChengeIsShow(e);
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
      <div
				ref={this.settingRef}
				name="main-setting"
				className="main-note_setting"
				onClick={this.handleCloseSettingShow}
			>
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
				<div
					className="main-note__setting-form"
				>
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
					{ (note.mainSetting.isContentSetting === 'selectBackgroundImage') &&
						<DropList
							arr={note.backgroundImage.image}
							onClick={this.handleSelectBackgroundImg}
							componentClassName="main-note_setting-buttons"
							elementClassName="main-note_button"
							title="Select background image"
						/>
					}

					{ (note.mainSetting.isContentSetting === 'selectBackgroundColor') &&
						<DropList
							arr={note.backgroundColor.colors}
							onClick={this.handleSelectBackgroundColor}
							componentClassName="main-note_setting-buttons"
							elementClassName="main-note_button"
							title="Select background color"
						/>
					}

					{ (note.mainSetting.isContentSetting === 'clearData') &&
						<div className="main-note_setting-buttons clear-data">
							<div className="clear-data_title">Are you sure?</div>
							<input
								type="button"
								className="main-note_button clear-data_no"
								value="no"
								onClick={this.handleChengeIsShow}
							/>
							<input
								type="button"
								className="main-note_button clear-data_yes"
								value="yes"
								onClick={this.clearLocalStorage}
							/>
						</div>
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
	selectBackgroundImage,
	clearData,
	selectBackgroundColor,
})(Setting);
