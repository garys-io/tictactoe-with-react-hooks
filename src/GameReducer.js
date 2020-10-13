export const gameInitalState = {
  isXNext: true,
  squares: Array(9).fill(""),
  gameInfo: "Game is going great",
}

export function gameReducer(state, action) {
  switch (action.type) {
    case "SQUARE_CLICK":
      return squareClickReducer(state, action)
    default:
      throw new Error()
  }
}

function squareClickReducer(state, action) {
  // check to stop overriding squares
  if (!state.squares[action.idx]) {
    const newSquares = squaresReducer(state, action)
    return {
      ...state,
      isXNext: !state.isXNext,
      squares: newSquares,
      gameInfo: gmaeInfoReducer(newSquares),
    }
  }
  return state
}

function squaresReducer(state, action) {
  const newSquares = [...state.squares]
  newSquares[action.idx] = state.isXNext ? "X" : "O"
  return newSquares
}

function gmaeInfoReducer(squares) {
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
