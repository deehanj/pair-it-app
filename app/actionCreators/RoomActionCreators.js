import { UPDATE_SOCKET_ROOM } from '../constants/RoomConstants'

export const setSocketRoom = (room) => ({
	type: UPDATE_SOCKET_ROOM,
	room
})