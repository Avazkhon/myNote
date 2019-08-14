import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Setting extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      isSettingShow,
      setting,
      isShowCreateNewNote,
      isShowSelectNote,
      newTitleNote,
      note,

      handleChenge,
      handleCreateNewNote,
      handSelectNote,
      handleChengeIsShow,
      handleSettingShow,
    } = this.props;

    return(
      <div>
        <input
  				className="main-note_button"
  				type="button"
  				onClick={handleSettingShow}
  				value="Setting"
  			/>
        {
          isSettingShow &&
          <div className="main-note_setting-buttons">
            <ul>
              {
                setting.map((item) => {
                  return (
                    <li key={item.id}>
                      <div
                        onClick={handleChengeIsShow}
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
								onChange={handleChenge}/>
							<input
								className="main-note_button"
								type='button'
								value='create new note'
								onClick={handleCreateNewNote}
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
													onClick={handSelectNote}
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

Setting.propTypes = {
  isSettingShow: PropTypes.bool,
  isShowCreateNewNote: PropTypes.bool,
  isShowSelectNote: PropTypes.bool,
  setting: PropTypes.array,
  newTitleNote: PropTypes.string,
  note: PropTypes.object,

  handleChenge: PropTypes.func,
  handleCreateNewNote: PropTypes.func,
  handSelectNote: PropTypes.func,
  handleChengeIsShow: PropTypes.func,
  handleSettingShow: PropTypes.func,
}

export default Setting
