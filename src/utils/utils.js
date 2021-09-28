export function convertIndexToRowCol(index) {
    if (index === null) {
        return null
    }
    const mapping = [
        {row: 0, col: 0}, // 0
        {row: 0, col: 1}, // 1
        {row: 0, col: 2}, // 2
        {row: 1, col: 0}, // 3
        {row: 1, col: 1}, // 4
        {row: 1, col: 2}, // 5
        {row: 2, col: 0}, // 6
        {row: 2, col: 1}, // 7
        {row: 2, col: 2}, // 8
    ]
    return mapping[index];
}
 
export function calculateWinner(squares) {
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

export function allSquaresFilled(squares) {
    for (let i = 0; i < squares.length; i++) {
        if (!squares[i]) {
            return false;
        }
    }
    return true;
}