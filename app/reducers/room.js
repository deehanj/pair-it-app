import { UPDATE_SOCKET_ROOM } from '../constants/RoomConstants'

const initialState = {
	name: '',
}

const reducer = (state = initialState, action) => {
	const newState = Object.assign({}, state)
		switch (action.type) {
			case UPDATE_SOCKET_ROOM:
				newState.name = action.room
				break
			default:
				return state
		}
	return newState;
}

export default reducer;