import * as constants from '../constants/VideoChatConstants'

const initialState = {
  URL: {},
  localURL: {},
  remoteURL: {},
};

const reducer = (state = initialState, action) => {
    const newState = Object.assign({}, state)
    switch (action.type) {
        case constants.SET_STREAM_URL:
            newState.URL = action.URL
            break;
        case constants.SET_LOCAL_VIDEO_STREAM_URL:
            newState.localURL = action.URL
            break
        case constants.SET_REMOTE_VIDEO_STREAM_URL:
            newState.remoteURL = action.URL
            break
        case constants.CLEAR_ALL_URLS:
            newState.URL = {};
            newState.localURL = {};
            newState.remoteURL = {};
            break
        default:
            return state
    }
    return newState
}

export default reducer;