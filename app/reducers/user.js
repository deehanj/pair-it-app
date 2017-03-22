// import something from 'somewhere';

import { apiRequest, apiRequestAuth } from '../utils/api-requests';
import store from '../store/configureStore.development'


const SET_USER = 'SET_USER';

//ACTION CREATOR
export const setUser = (gitInfo) => ({
  type: SET_USER, gitInfo
})

// INITIAL STATE
const initialState = {
  gitInfo: {}
}

// REDUCERS
export default function reducer( state = initialState, action) {

  const newState = Object.assign({}, state)

  switch (action.type) {
    case SET_USER:
        newState.gitInfo = action.gitInfo;
        break;
    default:
      return state;
  }

  return newState;

}

// ACTIONS

export function fetchUsername() {

  console.log('Inside fetchUsername');

  return (dispatch, getState) => {
    const url = `https://api.github.com/user`;
    const method = 'GET';
    const token = store.getState().auth.token;

    return apiRequestAuth(url, method, token)
      .then( res => store.dispatch(setUser(res.data)) )
      .catch(err => console.error(err))
  }

}
