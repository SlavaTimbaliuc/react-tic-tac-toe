import React from 'react';
import { Square } from './square'

export class Board extends React.Component {
    renderSquare(i) {
        let bold = false;
        if (this.props.lines) {
            if (this.props.lines[0] === i || this.props.lines[1] === i || this.props.lines[2] === i) {
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
        let rows = [0, 3, 6];
        let columns = [0, 1, 2];
        return (
            <div>
                {rows.map((row) => {
                        return (
                            <div key={row} className="board-row">
                                {
                                    columns.map((col) => {
                                        return this.renderSquare(row+col)
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}
