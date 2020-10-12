import React, { useState, useEffect } from "react"
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
  const [gmaeInfo, setGameInfo] = useState("Game is going great")

  const updateSquare = (idx, isXNext) => {
    // check to stop overriding squares
    if (!squares[idx]) {
      const newSquares = [...squares]
      newSquares[idx] = isXNext ? "X" : "O"
      setIsXNext(!isXNext)
      setSquares(newSquares)
    }
  }

  useEffect(() => setGameInfo(gameStatus(squares)), [squares])

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={squares} updateSquare={updateSquare} isXNext={isXNext} />
      </div>
      <div className="game-info">
        <div>{gmaeInfo}</div>
      </div>
    </div>
  )
}

function gameStatus(squares) {
  const winningCombinationsIdx = [
    // horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // diagonal
    [0, 4, 8],
    [2, 4, 6],
  ]

  // check for the combinations
  for (const combination of winningCombinationsIdx) {
    const [s0, s1, s2] = [squares[combination[0]], squares[combination[1]], squares[combination[2]]]
    if (!!s0 && s0 === s1 && s0 === s2) return `Player ${s0} Won!`
  }

  // if there is no more empty squares, declare tie
  if (!squares.some((square) => square === "")) {
    return "tie"
  }

  // otherwise the game is ongoing
  return "Ongoing"
}

export default Game
