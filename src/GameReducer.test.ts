import { cloneDeep } from "lodash"
import { gameInitalState, GameInstance, gameReducer } from "./GameReducer"

describe("Checking the working of SQUARE_CLICK", () => {
  test("Should set a X for first move and toggle the isXNext to false", () => {
    const expectedState = cloneDeep(gameInitalState)
    expectedState.squares[0] = "X"
    expectedState.isXNext = false
    expectedState.gameInfo = "Ongoing"
    let state = cloneDeep(gameInitalState)
    state = gameReducer(state, { type: "SQUARE_CLICK", idx: 0 })
    expect(state).toEqual(expectedState)
  })

  test("Should set a O for second move and toggle the isXNext twice to true", () => {
    const expectedState = cloneDeep(gameInitalState)
    expectedState.squares[0] = "X"
    expectedState.squares[1] = "O"
    expectedState.isXNext = true
    expectedState.gameInfo = "Ongoing"
    let state = cloneDeep(gameInitalState)
    state = gameReducer(state, { type: "SQUARE_CLICK", idx: 0 })
    state = gameReducer(state, { type: "SQUARE_CLICK", idx: 1 })
    expect(state).toEqual(expectedState)
  })

  test("Should not modify anything if the square at idx is already in use", () => {
    const expectedState = cloneDeep(gameInitalState)
    expectedState.squares[5] = "O"
    let state = cloneDeep(gameInitalState)
    state.squares[5] = "O"
    state = gameReducer(state, { type: "SQUARE_CLICK", idx: 5 })
    expect(state).toEqual(expectedState)
  })

  test("The gameInfo should be 'Player O Won!' when they complete a strike", () => {
    const expectedState = {
      squares: ["O", "O", "O", "X", "X", "", "", "X", ""],
      isXNext: true,
      gameInfo: "Player O won",
    }
    let state: GameInstance = {
      squares: ["O", "O", "", "X", "X", "", "", "X", ""],
      isXNext: false,
      gameInfo: "Ongoing",
    }
    state = gameReducer(state, { type: "SQUARE_CLICK", idx: 2 })
    expect(state).toEqual(expectedState)
  })

  test("Should not update any square if gameInfo is anything other than `Ongoing`", () => {
    const expectedState = {
      squares: ["O", "O", "", "X", "X", "", "", "X", ""],
      isXNext: false,
      gameInfo: "Player O won",
    }
    let state: GameInstance = {
      squares: ["O", "O", "", "X", "X", "", "", "X", ""],
      isXNext: false,
      gameInfo: "Player O won",
    }
    state = gameReducer(state, { type: "SQUARE_CLICK", idx: 2 })
    expect(state).toEqual(expectedState)
  })
})

describe("Checking the working of RESET_GAME", () => {
  test("The game should be reset to the inital condition from a random state", () => {
    let state: GameInstance = {
      squares: ["", "O", "", "X", "", "O", "O", "X", "X"],
      gameInfo: "Ongoing",
      isXNext: false,
    }
    state = gameReducer(state, { type: "RESET_GAME" })
    expect(state).toEqual(cloneDeep(gameInitalState))
  })
})
