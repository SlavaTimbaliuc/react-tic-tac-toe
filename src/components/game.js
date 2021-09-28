import React from 'react';

import { 
    convertIndexToRowCol, 
    calculateWinner, 
    allSquaresFilled,
} from '../utils/utils'
import { Board } from './board'

export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                indexPressed: null,
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
                squares: squares,
                indexPressed: i,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winnerObj = calculateWinner(current.squares);

        let moves = history.map((historyObject, index) => {
            let desc = index ?
                "Go to move #" + index :
                "Go to Game Start";
            let info = convertIndexToRowCol(historyObject.indexPressed);
            if (info != null) {
                desc = desc + " (row: " + info.row + " col: " + info.col + ")";
            }
            let button = <button onClick={() => this.jumpTo(index)}>{desc}</button>
            if (index === this.state.stepNumber) {
                button = <button onClick={() => this.jumpTo(index)}><b>{desc}</b></button>
            }
            return (
                <li key={index}>
                    {button}
                </li>
            )
        })

        let status;
        if (winnerObj) {
            status = 'Winner ' + winnerObj.winner;
        } else if (allSquaresFilled(current.squares) && this.state.stepNumber !== 0) {
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