import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
	createNewNote,
	saveNote,
} from '../actions/index'


class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newChengeTetx: '',
			titleNote: '',
			chengeTetxId: null,
			newTitleNote: '',
			isSettingShow: false,
			isShowCreateNewNote: false,
			isShowOpenNote: false,
			setting: [
				{
					id: 1,
					title: 'New note',
					name: 'isShowCreateNewNote'
				},
				{
					id: 2,
					title: 'Open note',
					name: 'isShowOpenNote'
				}
			]
		}
	}

	componentWillReceiveProps(nexProps) {
		const {
			newChengeTetx,
			chengeTetxId,
		} = this.state;

		if (chengeTetxId) {
			this.openNote(chengeTetxId)
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
			name = event.target.name;
		}

		this.setState((prevState) => (
			{[name]: !prevState[name]}
		));
	}

	handleSave = () => {
		const id = this.state.chengeTetxId;
		const text = this.state.newChengeTetx;
		console.log(text)
		this.props.saveNote(id, text)
	}

	handleCreateNewNote = () => {
		const id = Date.now();
		const title = this.state.newTitleNote;
		this.props.createNewNote(id, '', title)
		this.setState( prevProps =>(
			{
					chengeTetxId: id,
					newChengeTetx: '',
					newTitleNote: '',
					titleNote: title,
			}
		));

		this.handleChengeIsShow('isShowCreateNewNote')
	}

	openNote = (id) => {
		const note = this.props.note.noteItems.find(item => {
			return item.id === id;
		})
	}

	handleSettingShow = () => {
		this.setState((prevState) => (
			{isSettingShow: !prevState.isSettingShow}
		))
	}


	render () {
		const {
			note,
		} = this.props;

		const {
			newChengeTetx,
			setting,
			chengeTetxId,
			isSettingShow,
			isShowCreateNewNote,
			newTitleNote,
			titleNote,
		} = this.state;

		return (
			<div>
					<div onClick={this.handleSettingShow}>Setting</div>
					{
						isSettingShow &&
						<ul>
							{
								setting.map((item) => {
									return (
										<li key={item.id}>
											<input
												type='button'
												name={item.name}
												onClick={this.handleChengeIsShow}
												value={item.title}
											/>
										</li>
									)
								})
							}
						</ul>
					}
					{ isShowCreateNewNote &&
						<div>
							<div>Title for new note</div>
							<input
								type='text'
								name='newTitleNote'
								value={newTitleNote}
								onChange={this.handleChenge}/>
							<input
								type='button'
								value='create new note'
								onClick={this.handleCreateNewNote}
			       />
						</div>
					}
					<h3>Note</h3>
					{note.activeNote &&
						<div>
							<div>{titleNote}</div>
							<textarea
								name="newChengeTetx"
								value={newChengeTetx}
								onChange={this.handleChenge}
								/>
							<input
								type='button'
								value='save'
								onClick={this.handleSave}
								/>
						</div>
					}
			</div>
		)
	}
}

function mapStateToProps(state) {
  const { note } = state
  return { note }
}

export default connect(mapStateToProps, {
	createNewNote,
	saveNote,
})(Main);
