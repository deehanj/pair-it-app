const SET_STREAM_URL = 'SET_STREAM_URL';

const SET_LOCAL_VIDEO_STREAM_URL = 'SET_LOCAL_VIDEO_STREAM_URL'

const SET_REMOTE_VIDEO_STREAM_URL = 'SET_REMOTE_VIDEO_STREAM_URL'

const initialState = {
  URL: {},
  localURL : {},
  remoteURL : {}
};

const reducer = (state = initialState, action) => {
    const newState = Object.assign({}, state)

    switch (action.type) {

        case SET_STREAM_URL:
            newState.URL = action.URL
            break;
        case SET_LOCAL_VIDEO_STREAM_URL:
            newState.localURL = action.URL
            break
        case SET_REMOTE_VIDEO_STREAM_URL:
            newState.remoteURL = action.URL
            break
        default:
            return state
    }
    return newState
}

export default reducer;