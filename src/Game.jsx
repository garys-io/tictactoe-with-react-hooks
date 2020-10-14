import React, { useReducer } from "react"
import { gameInitalState, gameReducer } from "./GameReducer"
import { Button, Container, Grid } from "@material-ui/core"

function Board({ squares, onSquareClick }) {
  return (
    <Grid container direction="row" justify="space-evenly" alignItems="stretch" spacing={3}>
      {squares.map((square, i) => (
        <Grid item xs={4} key={i}>
          <Button
            fullWidth
            style={{ height: "50px" }}
            size="large"
            variant="outlined"
            color="primary"
            onClick={() => onSquareClick(i)}
          >
            {square}
          </Button>
        </Grid>
      ))}
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
