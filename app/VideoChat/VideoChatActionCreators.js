const SET_STREAM_URL = 'SET_STREAM_URL';

const SET_LOCAL_VIDEO_STREAM_URL = 'SET_LOCAL_VIDEO_STREAM_URL'

const SET_REMOTE_VIDEO_STREAM_URL = 'SET_REMOTE_VIDEO_STREAM_URL'

export const UpdateURL = URLObject => (
	{
		type: SET_STREAM_URL,
		URL: URLObject
	}
)

export const UpdateLocalURL = URLObject => (
	{
		type:SET_LOCAL_VIDEO_STREAM_URL,
		URL: URLObject
	}
)

export const UpdateRemoteURL = URLObject => (
	{
		type: SET_REMOTE_VIDEO_STREAM_URL,
		URL: URLObject
	}
)