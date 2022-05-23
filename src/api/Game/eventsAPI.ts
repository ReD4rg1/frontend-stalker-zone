import axios from "axios";
import { EventsType } from "../../redux/reducers/players-reducer";
import {getToken} from "../token";

const token = getToken()

const instance = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: {'Authorization': `${token}`}
})

const eventsAPI = {

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

    eventRoll(playerId: number) {
        return (
            instance.get(`/events/roll?playerId=${playerId}`)
                .then((response) => response.data)
        )
    },

}

export default eventsAPI
