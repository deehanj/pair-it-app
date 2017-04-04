import { apiRequest, apiRequestAuth } from '../utils/api-requests'
import { fetchUsername } from '../actionCreators/UserActionCreators'
import options from '../utils/github.settings'

export function makeAsyncActionSet(actionName) {
  return {
    REQUEST: actionName + '_REQUEST',
    SUCCESS: actionName + '_SUCCESS',
    FAILURE: actionName + '_FAILURE'
  };
}

export const LOGIN = makeAsyncActionSet('LOGIN');
export const LOGOUT = 'LOGOUT';

const initialState = {
  response: {},
  token: null,
  isFetching: false,
  failed: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN.REQUEST:
      return {
        ...state,
        isFetching: true,
        failed: false,
        response: {},
        token: null
      };
    case LOGIN.SUCCESS:
      return {
        ...state,
        isFetching: false,
        token: action.payload.access_token
      };
    case LOGIN.FAILURE:
      return {
        ...state,
        isFetching: false,
        failed: true,
        response: action.payload
      };
    case LOGOUT:
      return {
        ...state,
        response: null,
        token: null
      };
    default:
      return state;
  }
}


export const loginUser = (code) => {
  return (dispatch, getState) => {

    const url = 'https://github.com/login/oauth/access_token';
    const method = 'POST';
    const data = {
      client_id: options.client_id,
      client_secret: options.secret,
      code: code
    };

    dispatch({type: LOGIN.REQUEST});

    return apiRequest(url, method, data)
      .then((response) => {
        return dispatch({type: LOGIN.SUCCESS, payload: response.data});
      })
      .then(fetchUsername())
      .catch((error) => {
        console.error(error);
        dispatch({type: LOGIN.FAILURE, payload: error.response.data});
      });

  };
}

export const logout = () => {
  return { type: LOGOUT };
}

export default reducer

