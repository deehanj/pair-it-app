// import something from 'somewhere';

import { apiRequest, apiRequestAuth } from '../utils/api-requests';
import store from '../store/configureStore.development'
import {setRepos} from './repo'

const SET_USER = 'SET_USER';
const SET_UNAVAILABLE = 'SET_UNAVAILABLE'

//ACTION CREATOR
export const setUser = (gitInfo) => ({
  type: SET_USER, gitInfo
})

export const setUnavailable = (name) => ({
  type: SET_UNAVAILABLE, name
})


// INITIAL STATE
const initialState = {
  gitInfo: {},
  unavailable: []
}

// REDUCERS
export default function reducer( state = initialState, action) {

  const newState = Object.assign({}, state)

  switch (action.type) {
    case SET_USER:
      newState.gitInfo = action.gitInfo;
      break;
    case SET_UNAVAILABLE:
      newState.unavailable = newState.unavailable.concat([action.name])
      break;
    default:
      return state;
  }

  return newState;

}

// ACTIONS

export function fetchUsername() {

  return (dispatch, getState) => {
    let url = `https://api.github.com/user`;
    const method = 'GET';
    const token = store.getState().auth.token;

    return apiRequestAuth(url, method, token)
      .then( res => store.dispatch(setUser(res.data)) )
      .then(() => {
        url = `${url}/repos`
        return apiRequestAuth(url, method, token)
      })
      .then(res => store.dispatch(setRepos(res.data)) )
      .catch(err => console.error(err))
  }

}



