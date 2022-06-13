import axios from "axios";
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

    setCoordinates(locationId: number, hexId: number, difficulty: number, playerId: number, locationName: string) {
        return (
            instance.post(`/coordinates/set-coordinates`, {locationId, hexId, difficulty, playerId, locationName})
                .then((response) => response.data)
        )
    },

    setOrder(playerId: number) {
        return (
            instance.post(`/order/set?playerId=${playerId}`, {})
                .then((response) => response.data)
        )
    },

    passOrder(playerId: number, place: "base" | "village" | "laboratory") {
        return (
            instance.post(`/order/end?playerId=${playerId}&place=${place}`, {})
                .then((response) => response.data)
        )
    },

    locationEnter(playerId: number) {
        return (
            instance.post(`/location/enter?playerId=${playerId}`, {})
                .then((response) => response.data)
        )
    },

    locationOut(playerId: number) {
        return (
            instance.post(`/location/out?playerId=${playerId}`, {})
                .then((response) => response.data)
        )
    },

    locationMove(playerId: number, level: number, position: number) {
        return (
            instance.post(`/location/set-position?playerId=${playerId}`, {})
                .then((response) => response.data)
        )
    },

}

export default playersAPI
