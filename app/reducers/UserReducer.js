const SET_USER = 'SET_USER'

const initialState = {
  username: ''
}

const reducer = (state = initialState, action) => {
  const newState = Object.assign({}, state)
  switch (action.type) {
    case SET_USER:
      newState.username = action.username
      break
    
    default:
      return state
  }
  return newState
}

export const setUser = username => ({
  type: SET_USER, username
})


export default reducer
