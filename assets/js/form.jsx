import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';

export default function form_init(root, channel) {
  ReactDOM.render(<MemoryForm />, root);
}

class MemoryForm extends React.Component {

  // Based on the reactjs forms quick start documentation
  // https://reactjs.org/docs/forms.html

  constructor(props) {
    super(props);
    this.state = {game: ''}
  }

  handleChange(event) {
    this.setState({game: event.target.value});
  }

  handleSubmit(event) {
    window.location.href = `/game/${this.state.game}`
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div class="form-group">
          <label for="gameName">Game Name</label>
          <input type="text" name="gameName" class="form-control" id="gameName" required pattern="[a-zA-Z0-9]+" placeholder="enter game name" onChange={this.handleChange.bind(this)}/>
        </div>
        <button type="submit" class="btn btn-primary">Join Game</button>
      </form>
    );
  }
}
