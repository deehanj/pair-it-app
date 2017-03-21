import { apiRequest, apiRequestAuth } from '../utils/api-requests';

import options from '../utils/github.settings';

export function makeAsyncActionSet(actionName) {
  return {
    REQUEST: actionName + '_REQUEST',
    SUCCESS: actionName + '_SUCCESS',
    FAILURE: actionName + '_FAILURE'
  };
}

// Authentication

export const LOGIN = makeAsyncActionSet('LOGIN');
export function loginUser(code) {
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
      .then(function (response) {
        dispatch({type: LOGIN.SUCCESS, payload: response.data});
      })
      .catch(function (error) {
        dispatch({type: LOGIN.FAILURE, payload: error.response.data});
      });

  };
};

export const LOGOUT = 'LOGOUT';
export function logout() {
  return { type: LOGOUT };
};

/*---------------METHOD FOR GETTING STUFF AUTHORIZED FROM GITHUB---------------*/
// Notifications

// export const NOTIFICATIONS = makeAsyncActionSet('NOTIFICATIONS');
// export function fetchNotifications() {
//   return (dispatch, getState) => {
//
//     const participating = getState().settings.participating;
//     const url = `https://api.github.com/notifications?participating=${participating}`;
//     const method = 'GET';
//     const token = getState().auth.token;
//
//     dispatch({type: NOTIFICATIONS.REQUEST});
//
//     return apiRequestAuth(url, method, token)
//       .then(function (response) {
//         dispatch({type: NOTIFICATIONS.SUCCESS, payload: response.data});
//       })
//       .catch(function (error) {
//         dispatch({type: NOTIFICATIONS.FAILURE, payload: error.response.data});
//       });
//
//   };
// };
