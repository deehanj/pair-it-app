import * as constants from '../constants/UserConstants'

const initialState = {
  gitInfo: {},
  unavailable: []
}

const reducer = (state = initialState, action) => {

  const newState = Object.assign({}, state)

  switch (action.type) {
    case constants.SET_USER:
      newState.gitInfo = action.gitInfo;
      break;
    case constants.SET_UNAVAILABLE:
      newState.unavailable = newState.unavailable.concat([action.name])
      break;
    case constants.SET_AVAILABLE:
      newState.unavailable = newState.unavailable.filter(name => name !== action.name)
      break;
    case constants.REMOVE_USER:
      newState.gitInfo = {}
      break;
    default:
      return state;
  }

  return newState;

}

export default reducer
