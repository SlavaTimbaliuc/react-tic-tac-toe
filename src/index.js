import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    if (props.bold) {
        return (
            <button className="square" onClick={props.onClick}>
                <b>{props.value}</b>
            </button>
        );
    }
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        let bold = false;
        if (this.props.lines) {
            if (this.props.lines[0] == i || this.props.lines[1] == i || this.props.lines[2] == i) {
                bold = true
            }
        }
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
                bold={bold}
            />
        )
    }

    render() {
        let indexes = [0, 3, 6];
        return (
            <div>
                {
                    indexes.map((index) => {
                        return (
                            <div key={index} className="board-row">
                                {this.renderSquare(index)}
                                {this.renderSquare(index+1)}
                                {this.renderSquare(index+2)}
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}
  
class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
            moveAsc: true,
        }
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        })
    }

    reverseMovesSorting() {
        this.setState({
            moveAsc : !this.state.moveAsc,
        })
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winnerObj = calculateWinner(current.squares);

        let moves = history.map((squares, move) => {
            const desc = move ?
                "Go to move #" + move :
                "Go to Game Start";
            let button = <button onClick={() => this.jumpTo(move)}>{desc}</button>
            if (move == this.state.stepNumber) {
                button = <button onClick={() => this.jumpTo(move)}><b>{desc}</b></button>
            }
            return (
                <li key={move}>
                    {button}
                </li>
            )
        })

        let status;
        if (winnerObj) {
            status = 'Winner ' + winnerObj.winner;
        } else if (allSquaresFilled(current.squares) && this.state.stepNumber != 0) {
            status = 'Draw'
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        if (!this.state.moveAsc) {
            moves = moves.reverse()
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board 
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                        lines={winnerObj ? winnerObj.lines : null}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <button onClick={() => this.reverseMovesSorting()}>Sort Moves</button>
                    <ol>{moves}</ol>
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

function allSquaresFilled(squares) {
    for (let i = 0; i < squares.length; i++) {
        if (!squares[i]) {
            return false;
        }
    }
    return true;
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return {
                winner: squares[a],
                lines: lines[i],
            };
        }
    }
    return null;
}