import * as constants from '../constants/VideoChatConstants'

export const UpdateURL = URLObject => (
	{
		type: constants.SET_STREAM_URL,
		URL: URLObject
	}
)

export const UpdateLocalURL = URLObject => (
	{
		type: constants.SET_LOCAL_VIDEO_STREAM_URL,
		URL: URLObject
	}
)

export const UpdateRemoteURL = URLObject => (
	{
		type: constants.SET_REMOTE_VIDEO_STREAM_URL,
		URL: URLObject
	}
)

export const clearAllURLs = () => (
	{
		type: constants.CLEAR_ALL_URLS,
	}
)
