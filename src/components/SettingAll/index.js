import React, { Component } from 'react';
import { connect } from 'react-redux';

// import {
// 	createNewNote,
// 	selectNote,
// 	selectSetting,
// 	selectBackgroundImage,
// 	clearData,
// 	selectBackgroundColor,
// } from 'actions'

// import DropList from 'widget/DropList';

// import './setting.css';

class Setting extends Component {
  constructor(props) {
		super(props);
		this.state = {
      isShow: false,
		}
	}

  handleShow = () => {
    this.setState(preState => ({isShow: !preState.isShow}))
  }

  render() {
    const {
      // note,
      setingArr,
      title,
    } = this.props;

    const {
      // newTitleNote,
      // isSettingShow,
      isShow,
    } = this.state;

    return(
      <div className="main-note_setting">
        <input
          className="main-note_setting-show btn"
          type="button"
          onClick={this.handleShow}
          value="Setting file"
        />
        {
          isShow &&
          <div className={`drop-List main-note_setting-buttons`}>
            <div className="drop-List__title">{title}</div>
            <ul>
              {
                setingArr.map((item) => {
                  return (
                    <li key={item.name} className="drop-List_item">
                      <div
                        onClick={item.onClick}
                        className="main-note_button"
                        data-name={item.name}
                      >{item.name}</div>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        }
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
  // createNewNote,
  // selectNote,
	// selectSetting,
	// selectBackgroundImage,
	// clearData,
	// selectBackgroundColor,
})(Setting);
