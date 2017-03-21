import something from 'somewhere';

import { apiRequest, apiRequestAuth } from '../utils/api-requests';


// ACTION CREATORS
const SET_USERNAME = 'SET_USERNAME';


// INITIAL STATE
const initialState = {
  username: '',
  repos: []
}

// REDUCERS
export default function reducer( state = initialState, action) {

  const newState = Object.assign({}, state)

  switch (action.type) {
    case SET_USERNAME:
        newState.username = action.username;
        break;
    default:
      return state;
  }

  return newState;

}

// ACTIONS

export function fetchUsername() {
  return (dispatch, getState) => {
    const url = 'https://api.github.com/user?access_token=';
    const method = 'GET';
    const token = getState().auth.token;

    return apiRequestAuth(url, method, token)
      .then(res => console.log(res.data)) //will dispatch to SET_USERNAME
      .catch(err => console.error(err))
  }

}
