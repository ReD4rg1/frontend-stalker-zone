import axios from "axios";
import {getToken} from "../token";

const token = getToken()

const instance = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: {'Authorization': `${token}`}
})

export type RoomListType = {
    id: number
    name: string
    numberOfUsers: number
}

interface Rooms {
    resultCode: number
    roomList?: RoomListType[]
}

const roomAPI = {

    getRooms() {
        return (
            instance.get(`/rooms`)
                .then((response): Rooms => response.data)
        )
    },

    join() {
        return (
            instance.post(`/rooms/add`)
                .then(response => response.data)
        )
    },

    disconnect() {
        return (
            instance.post(`/rooms/remove`)
                .then(response => response.data)
        )
    },
}

export default roomAPI
