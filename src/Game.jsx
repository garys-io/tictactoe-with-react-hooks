import React, { useReducer } from "react"
import { gameInitalState, gameReducer } from "./GameReducer"
import "./Game.css"

function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  )
}

function Board({ squares, onSquareClick, isXNext }) {
  function renderSquare(i) {
    return <Square value={squares[i]} onClick={() => onSquareClick(i)} />
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
  const [state, dispatch] = useReducer(gameReducer, gameInitalState)

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={state.squares}
          onSquareClick={(idx) => dispatch({ type: "SQUARE_CLICK", idx })}
          isXNext={state.isXNext}
        />
      </div>
      <div className="game-info">
        <div>{state.gameInfo}</div>
      </div>
      <div>
        <button onClick={() => dispatch({ type: "RESET_GAME" })}>Reset</button>
      </div>
    </div>
  )
}

export default Game
