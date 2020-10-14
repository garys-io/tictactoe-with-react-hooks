import React, { useReducer } from "react"
import { gameInitalState, gameReducer } from "./GameReducer"
import { Button, Container, Grid } from "@material-ui/core"

function Board({ squares, onSquareClick }) {
  function renderSquare(i) {
    return (
      <Grid item xs={4}>
        <Button
          fullWidth
          style={{ height: "50px" }}
          size="large"
          variant="outlined"
          color="primary"
          onClick={() => onSquareClick(i)}
        >
          {squares[i]}
        </Button>
      </Grid>
    )
  }

  return (
    <Grid container direction="row" justify="space-evenly" alignItems="stretch" spacing={3}>
      {renderSquare(0)}
      {renderSquare(1)}
      {renderSquare(2)}
      {renderSquare(3)}
      {renderSquare(4)}
      {renderSquare(5)}
      {renderSquare(6)}
      {renderSquare(7)}
      {renderSquare(8)}
    </Grid>
  )
}

function Game() {
  const [state, dispatch] = useReducer(gameReducer, gameInitalState)

  return (
    <Container>
      <div>{state.gameInfo + ` Next player: ${state.isXNext ? "X" : "O"}`}</div>
      <Board
        squares={state.squares}
        onSquareClick={(idx) => dispatch({ type: "SQUARE_CLICK", idx })}
        isXNext={state.isXNext}
      />
      <Button variant="contained" color="primary" onClick={() => dispatch({ type: "RESET_GAME" })}>
        Reset
      </Button>
    </Container>
  )
}

export default Game
