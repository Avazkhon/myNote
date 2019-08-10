import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createNewNote } from '../actions/index'


class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			chengeTetx: '',
			chengeTetxId: null,
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
		const id = Date.now();
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


	render () {
		const {
			note,
		} = this.props;

		const {
			chengeTetx,
			setting,
			chengeTetxId,
		} = this.state;

		return (
			<div>
				<div>
					<div>Setting</div>
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
})(Main);
