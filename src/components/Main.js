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
			chengeTetx: '',
			chengeTetxId: null,
			isSettingShow: false,
			setting: [
				{
					id: 1,
					title: 'New note',
				},
				{
					id: 2,
					title: 'Open note',
				}
			]
		}
	}

	componentWillReceiveProps(nexProps) {
		const {
			chengeTetx,
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

	handleSave = () => {
		const id = this.state.chengeTetxId;
		const text = this.state.chengeTetx;
		this.props.saveNote(id, text)
		this.setState({chengeTetx: ''});

	}

	handleCreateNewNote = () => {
		const id = Date.now();
		this.props.createNewNote(id, '')

		this.setState({
				chengeTetxId: id,
			});

		}

		openNote = (id) => {
			const note = this.props.note.find(item => {
				return item.id === id;
			})

			this.setState({
					chengeTetx: note.text,
					chengeTetxId: null,
				});
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
			chengeTetx,
			setting,
			chengeTetxId,
			isSettingShow,
		} = this.state;

		return (
			<div>
				<div>
					<div onClick={this.handleSettingShow}>Setting</div>
					{
						isSettingShow &&
						<ul>
							{
								setting.map((item) => {
									return (
										<li key={item.id} onClick={this.handleCreateNewNote}>
											{item.title}
										</li>
									)
								})
							}
						</ul>
					}
					<div>
					</div>
				</div>
				<h3>text</h3>
				<textarea name="chengeTetx" value={chengeTetx} onChange={this.handleChenge}/>
				<input type='button' value='save' onClick={this.handleSave}/>
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
