import * as constants from '../constants/UserConstants'
import store from '../store/configureStore.development'
import { apiRequest, apiRequestAuth } from '../utils/api-requests'
import { setRepos } from '../actionCreators/RepoActionCreators'

export const setUser = (gitInfo) => ({
  type: constants.SET_USER, gitInfo
})

export const setUnavailable = (name) => ({
  type: constants.SET_UNAVAILABLE, name
})

export const setAvailable = (name) => ({
  type: constants.SET_AVAILABLE, name
})

export const removeUser = () => ({
  type: constants.REMOVE_USER
})

export const fetchUsername = () => {

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
