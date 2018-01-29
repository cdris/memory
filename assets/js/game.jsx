import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';

const MATCHED = "matched";
const UNMATCHED = "unmatched";
const SELECTED = "selected";

export default function run_game(root) {
  ReactDOM.render(<MemoryGame />, root);
}

class MemoryGame extends React.Component {

  constructor(props) {
    super(props);
    this.state = {tiles: this.new_tiles(), score: 0, sleeping: false};
  }

  new_tiles() {
    var letters = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D',
                   'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
    // https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      var tmp = letters[i];
      letters[i] = letters[j];
      letters[j] = tmp;
    }
    return _.map(letters, (x) => {return {letter:x, state: UNMATCHED}});
  }

  tileClick(index) {
    console.log(index);
    var tiles = this.state.tiles;
    var score = this.state.score;
    var sleeping = false;
    var clicked = tiles[index];
    var done = false;
    if (this.state.sleeping) {
      return;
    } else if (clicked.state == UNMATCHED) {
      score += 1;
      var selected = _.findWhere(tiles, {state: SELECTED});
      if (selected && selected.letter == clicked.letter) {
        // Tiles match
        tiles = _.map(tiles, (tile, i) => {
          if (i == index || tile.state == SELECTED) {
            return _.extend(tile, {state: MATCHED});
          } else {
            return tile;
          }
        });
      } else {
        // Either tiles do not match or first one selected
        // Set tile as selected
        tiles = _.map(tiles, (tile, i) => {
          return (i == index) ? _.extend(tile, {state: SELECTED}) : tile;
        });
        if (selected) {
          // if another tile is selected and does not match, delay
          sleeping = true;
          setTimeout(() => {
            this.setState({
              tiles: _.map(this.state.tiles, (tile) => {
                if (tile.state == SELECTED) {
                  return _.extend(tile, {state: UNMATCHED});
                } else {
                  return tile;
                }
              }),
              score: this.state.score,
              sleeping: false
            });
          }, 1000);
        }
      }
      this.setState({tiles: tiles, score: score, sleeping: sleeping});
    }
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
          <Button onClick={() => this.setState({tiles: this.new_tiles(),
                                                score: 0})}>
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
      <div className="tileText">
        {(params.state == UNMATCHED) ? "" : params.letter}
      </div>
    </div>
  );
}

