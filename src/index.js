import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Square(props) {
  return(
    <button 
      className = 'square'
      onClick = { props.onClick }
    >
      { props.value }
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true
    }
  }

  handleClick(i) {
    if( calculateWinner(this.state.squares) || this.state.squares[i] ) {  // if there is a winner or 
                                                                          // this square this already occupied
      return;
    }

    const newSquares = this.state.squares.slice();
    newSquares[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState({ 
      squares: newSquares,
      xIsNext: !this.state.xIsNext
    });
  }

  renderSquare(i) {
    return (
      <Square 
        value =  { this.state.squares[i] }
        onClick = { () => this.handleClick(i) }
      />
    );
  }

  render() {
    let status = '';

    if(isGameOver(this.state.squares)) {
      status += 'GAME OVER' + '\n';
      const winner = calculateWinner(this.state.squares);

      if(winner){
        status += 'Winner: ' + winner + '\n' + 'Congratulations!';
      }
      else{
        status += 'It\'s a draw!';
      }
    }
    else {
      status += 'Next player: ' + (this.state.xIsNext ? 'X' : '0');
    }

    return (
      <div>
        <div className = 'game-name'>
          {'Tic-Tac-Toe\n\n'}
        </div>
        <div className="status">
          {status}
        </div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for( let i = 0; i < lines.length; i++ ) {
    let [a, b, c] = lines[i];

    if( squares[a] && squares[a] === squares[b] && squares[a] === squares[c] ){
      return squares[a];
    }
  }

  return null;
}

function isGameOver(squares) {
  if( calculateWinner(squares) )
    return true;

  let isOver = true;

  for( let i = 0; i < squares.length; i++ ) {
    if( !squares[i] ){
      isOver = false;
      break;
    }
  }

  return isOver;
}
  