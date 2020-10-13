import { cloneDeep } from "lodash"

export type gameInfoType = "Ongoing" | "Tie" | "Player X won" | "Player O won"

export type gameReducerActionType = "SQUARE_CLICK" | "RESET_GAME"

export interface gameReducerAction {
  type: gameReducerActionType
  idx?: number
}

export interface GameInstance {
  isXNext: boolean
  squares: string[]
  gameInfo: gameInfoType
}

export const gameInitalState: GameInstance = {
  isXNext: true,
  squares: Array(9).fill(""),
  gameInfo: "Ongoing",
}

export function gameReducer(state: GameInstance, action: gameReducerAction) {
  switch (action.type) {
    case "SQUARE_CLICK":
      return squareClickReducer(state, action)
    case "RESET_GAME":
      return {
        ...cloneDeep(gameInitalState),
      }
    default:
      throw new Error()
  }
}

function squareClickReducer(state: GameInstance, action: gameReducerAction) {
  // check to stop overriding squares
  if (!state.squares[parseInt(action.idx + "")]) {
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

function squaresReducer(state: GameInstance, action: gameReducerAction) {
  const newSquares = [...state.squares]
  newSquares[parseInt(action.idx + "")] = state.isXNext ? "X" : "O"
  return newSquares
}

function gmaeInfoReducer(squares: string[]): gameInfoType {
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
    if (!!s0 && s0 === s1 && s0 === s2) return s0 === "X" ? "Player X won" : "Player O won"
  }

  // if there is no more empty squares, declare tie
  if (!squares.some((square) => square === "")) {
    return "Tie"
  }

  // otherwise the game is ongoing
  return "Ongoing"
}
