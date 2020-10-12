import React, { useState } from "react"
import "./Game.css"

function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  )
}

function Board({ squares, updateSquare, isXNext }) {
  function renderSquare(i) {
    return <Square value={squares[i]} onClick={() => updateSquare(i, isXNext)} />
  }

  const status = `Next player: ${isXNext ? "X" : "O"}`
  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

function Game() {
  const [squares, setSquares] = useState(Array(9).fill(""))
  const [isXNext, setIsXNext] = useState(true)

  const updateSquare = (idx, isXNext) => {
    // check to stop overriding squares
    if (!squares[idx]) {
      const newSquares = [...squares]
      newSquares[idx] = isXNext ? "X" : "O"
      setIsXNext(!isXNext)
      setSquares(newSquares)
    }
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={squares} updateSquare={updateSquare} isXNext={isXNext} />
      </div>
      <div className="game-info">
        <div>{"Game info"}</div>
      </div>
    </div>
  )
}

export default Game
