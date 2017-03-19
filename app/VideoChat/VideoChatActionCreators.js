const SET_STREAM_URL = 'SET_STREAM_URL';

export const UpdateURL = URLObject=>({
	type: SET_STREAM_URL,
	URL: URLObject
})