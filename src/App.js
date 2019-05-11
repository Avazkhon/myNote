import React from 'react';
import {connect} from 'react-redux';

function NoteRender(props) {
  console.log(props.noteSore)
  return (
  	<ul>
	  { props.noteSore.map((note, index) => {
		return <li key={index}>{note}</li>
		}
	  )}
	</ul>
  )
}

class App extends React.Component{
  
  handleAdd() {
    console.log('input', this.input.value);
    this.props.onNote(this.input.value)
  }

  render() {
  	console.log(this.props.noteSore)
  	return (
  	  <div>
  	  	<input type='text' ref={(input) => {this.input = input}}/>
  	  	<button onClick={ this.handleAdd.bind(this) } >Add</button>
		<NoteRender noteSore={this.props.noteSore}/>
  	  </div>
  	)
  }
}

export default connect(
  state => ({
	noteSore: state
  }),
  dispatch => ({
  	onNote: (note) => {
  	  dispatch({ type: 'ADD_TEXT', 'payload': note})
  	}
  })
)(App);