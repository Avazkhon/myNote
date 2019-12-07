import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './dropList.css';


class DropList extends Component {

  render () {
    const {
      arr,
      onClick,
      componentClassName,
      elementClassName,
      title,
      idChapter,
    } = this.props;

    return (
      <div className={`drop-List ${componentClassName}`}>
        <div className="drop-List__title">{title}</div>
        <ul>
          {
            arr.map((item) => {
              return (
                <li key={item.id} className="drop-List_item">
                  <div
                    data-id_chapter={idChapter || item.id}
                    onClick={onClick}
                    className={elementClassName}
                    data-name={item.name ? item.name : item.id}
                  >{item.title}</div>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

DropList.propType = {
  arr: PropTypes.array,
  onClick: PropTypes.func,
  componentClassName: PropTypes.string,
  elementClassName: PropTypes.string,
  title: PropTypes.string,
  idChapter: PropTypes.number,
}

export default DropList
