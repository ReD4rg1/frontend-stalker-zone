import axios from "axios";
import { EventsType } from "../../redux/reducers/players-reducer";
import {getToken} from "../token";

const token = getToken()

const instance = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: {'Authorization': `${token}`}
})

const playersAPI = {

    makeRoll(playerId: number) {
        return (
            instance.get(`/players/get-number-of-move?playerId=${playerId}`)
                .then((response) => response.data)
        )
    },

    passMove() {
        return (
            instance.get(`/players/pass-move`)
                .then((response) => response.data)
        )
    },

    setCoordinates(locationId: number, hexId: number, difficulty: number, playerId: number) {
        return (
            instance.post(`/coordinates/set-coordinates`, {locationId, hexId, difficulty, playerId})
                .then((response) => response.data)
        )
    },

    applyEvent(playerId: number, eventId: number, type: EventsType) {
        return (
            instance.post(`/events/set`, {playerId, eventId, type})
                .then((response) => response.data)
        )
    },

    showEvent(playerId: number) {
        return (
            instance.get(`/events/set-state?playerId=${playerId}`)
                .then((response) => response.data)
        )
    },

    nextEvent(type: EventsType) {
        return (
            instance.get(`/events/next?eventType=${type}`)
                .then((response) => response.data)
        )
    },

}

export default playersAPI
