import React, { Component } from 'react';

class SettingAll extends Component {
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
      setingArr,
      title,
    } = this.props;

    const {
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
                    <li key={item.id} className="drop-List_item">
                      <div
                        title={item.title}
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

export default SettingAll;
