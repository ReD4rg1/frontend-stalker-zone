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

    setCoordinates(locationId: number, hexId: number, difficulty: number, playerId: number) {
        return (
            instance.post(`/coordinates/set-coordinates`, {locationId, hexId, difficulty, playerId})
                .then((response) => response.data)
        )
    },

}

export default playersAPI
