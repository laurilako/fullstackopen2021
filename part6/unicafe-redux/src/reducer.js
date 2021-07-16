const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GOOD':
      const stategood = {good: state.good + 1, ok: state.ok, bad: state.bad}
      return stategood
    case 'OK':
      const stateok = {good: state.good, ok: state.ok + 1, bad: state.bad}
      return stateok
    case 'BAD':
      const statebad = {good: state.good, ok: state.ok, bad: state.bad + 1}
      return statebad
    case 'ZERO':
      const statezero = {good: 0, ok: 0, bad: 0}
      return statezero
    default:
      return state
  }
}

export default counterReducer