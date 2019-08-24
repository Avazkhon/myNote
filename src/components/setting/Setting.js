import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
	createNewNote,
	selectNote,
} from '../../actions/index'

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

		this.setState((prevState) => (
			{[name]: !prevState[name]}
		));
	}

	handleCreateNewNote = () => {
		const id = Date.now();
		const title = this.state.newTitleNote;
		this.props.createNewNote(id, '', title)
		this.setState( prevProps =>(
			{
				chengeTetxId: id,
				newTitleNote: '',
			}
		));

		this.handleChengeIsShow('isShowCreateNewNote')
	}

	handleSettingShow = () => {
		this.setState((prevState) => (
			{isSettingShow: !prevState.isSettingShow}
		))
	}

	handleCloseSettingShow = (e) => {
		if (e.target.className === 'main-note_button') {
			this.setState({
				isSettingShow: false,
			})
		}
	}

	handSelectNote = (event) => {
		const id = event.target.name;
		this.props.selectNote(id)
	}

  render() {
    const {
      setting,
      note,

    } = this.props;

    const {
      newTitleNote,
      isSettingShow,
      isShowCreateNewNote,
      isShowSelectNote,
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
          <div className="main-note_setting-buttons">
            <ul>
              {
                note.setting.map((item) => {
                  return (
                    <li key={item.id}>
                      <div
                        onClick={this.handleChengeIsShow}
                        className="main-note_button"
                        data-name={item.name}
                      >{item.title}</div>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        }
				<div className="main-note__setting-form" >
					{ isShowCreateNewNote &&
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
					{isShowSelectNote &&
						<div>
							<div>Select note</div>
							<ul>
								{
									(note.noteItems.map((note) => {
										return (
											<li key={note.id}>
												<input
													className="main-note_button"
													type='button'
													name={note.id}
													value={note.title}
													onClick={this.handSelectNote}
												/>
											</li>
										)
									}))
								}
							</ul>
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
})(Setting);
