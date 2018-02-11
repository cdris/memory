import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';

export default function game_init(root, channel) {
  ReactDOM.render(<MemoryGame channel={channel}/>, root);
}

// App state for Memory is
// {
//   tiles: [{letter: String, state: String}...]
//   score: int
//   sleeping: boolean
// }

class MemoryGame extends React.Component {

  constructor(props) {
    super(props);
    this.channel = props.channel;
    this.state = {tiles: [], score: 0, sleeping: false};

    this.channel.join()
        .receive("ok", this.gotView.bind(this))
        .receive("error", resp => { alert("Unable to join:\n" + resp); });
  }

  gotView(view) {
    console.log("New view", view);
    this.setState(view.game);
    if (view.game.sleeping) {
      setTimeout(() => {
        if (this.state.sleeping) {
          this.channel.push("update")
              .receive("ok", this.gotView.bind(this));
        }
      }, 1000);
    }
  }

  newGame(ev) {
    this.channel.push("new")
        .receive("ok", this.gotView.bind(this));
  }

  tileClick(idx) {
    console.log("Sending guess: " + idx);
    this.channel.push("guess", { tile: idx })
        .receive("ok", this.gotView.bind(this));
  }

  render() {
    var tileClick = this.tileClick.bind(this);
    var tiles = _.map(this.state.tiles, (tile, i) => {
      return <Tile key={i} id={i} letter={tile.letter} state={tile.state}
                   click={tileClick}/>
    });
    return (
      <div>
        <div id="controls">
          <h3>Score: {this.state.score}</h3>
          <Button onClick={this.newGame.bind(this)}>
            New Game
          </Button>
        </div>
        <div id="tiles">{tiles}</div>
      </div>
    );
  }
}

function Tile(params) {
  return (
    <div className={"tile " + params.state} onClick={() => {
      params.click(params.id);
    }}>
      <div className="tileText">{params.letter}</div>
    </div>
  );
}
