import React, { useState, useEffect } from 'react'

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
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

const Square = ({value, cl}) => {

    return (
        <button className="square" onClick={cl}>
            {value}
        </button>
    );
}

const Board = ({squares, xIsNext, onPlay}) => {


    const winner = calculateWinner(squares)
    let status;
    if (winner) {
        status = 'Winner is ' + winner;
    } else {
        status = 'Next player is ' + (xIsNext ? 'X' : 'O');
    }

    const handleClick = (i) => {
        if (squares[i] || calculateWinner(squares)) {
            return;
        }
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = "X";
        } else {
            nextSquares[i] = "O";
        }
        onPlay(nextSquares);
    }
    

    return (
        <>
            <div>{status}</div>
            <div className='board-row'>
                <Square value={squares[0]} cl={() => handleClick(0)}/>
                <Square value={squares[1]} cl={() => handleClick(1)}/>
                <Square value={squares[2]} cl={() => handleClick(2)}/>
            </div>
            <div className='board-row'>
                <Square value={squares[3]} cl={() => handleClick(3)}/>
                <Square value={squares[4]} cl={() => handleClick(4)}/>
                <Square value={squares[5]} cl={() => handleClick(5)}/>
            </div>
            <div className='board-row'>
                <Square value={squares[6]} cl={() => handleClick(6)}/>
                <Square value={squares[7]} cl={() => handleClick(7)}/>
                <Square value={squares[8]} cl={() => handleClick(8)}/>
            </div>
        </>
    );
}

function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [xIsNext, setXIsNext] = useState(true);
    const [currMove, setCurrMove] = useState(0);
    const squares = history[currMove]

    const handlePlay = (nextSquares) => {
        const newHistory = [...history.slice(0, currMove + 1), nextSquares];
        setHistory(newHistory);
        setCurrMove(newHistory.length - 1);
        setXIsNext(!xIsNext);
    }

    const jumpTo = (index) => {
        setCurrMove(index);
        setXIsNext(index % 2 === 0);
    };

    const moves = history.map((cells, index) => {
        let description;
        if (index > 0) {
            description = 'Go to move #' + index;
        } else {
            description = 'Go to game start';
        }
        return (
            <li key={index}>
                <button onClick={() => jumpTo(index)}>{description}</button>
            </li>
        )
    });

    return (
        <>
            <div className="game">
                <div className="game-board">
                <Board squares={squares} xIsNext={xIsNext} onPlay={handlePlay}/>
                </div>
                <div className="game-info">
                <ol>{moves}</ol>
                </div>
            </div>
      </>
    );
  }

export default Game