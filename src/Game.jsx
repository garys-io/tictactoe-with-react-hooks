import React, { useReducer } from "react"
import { gameInitalState, gameReducer } from "./GameReducer"
import { Button, Container, Grid, Typography } from "@material-ui/core"

const style = {
  height: "100px",
  fontSize: "50px",
}

function Board({ squares, onSquareClick }) {
  return (
    <Grid container direction="row" justify="space-evenly" alignItems="stretch" spacing={5}>
      {squares.map((square, i) => (
        <Grid item xs={4} key={i}>
          <Button
            fullWidth
            style={style}
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
  const displayText =
    state.gameInfo +
    (state.gameInfo === "Ongoing" ? ` next player is ${state.isXNext ? "X" : "O"}` : "")

  return (
    <Container>
      <Grid container justify="space-evenly" alignItems="stretch" spacing={5}>
        <Grid item xs={12}>
          <Typography align="center" varient="h1" style={style}>
            {displayText}
          </Typography>
        </Grid>
      </Grid>
      <Board
        squares={state.squares}
        onSquareClick={(idx) => dispatch({ type: "SQUARE_CLICK", idx })}
        isXNext={state.isXNext}
      />
      <Grid container justify="space-evenly" alignItems="stretch" spacing={5}>
        <Grid item xs={12}>
          <Button
            fullWidth
            style={style}
            variant="contained"
            color="primary"
            onClick={() => dispatch({ type: "RESET_GAME" })}
          >
            Reset
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Game
