import axios from "axios";
import {getToken} from "../token";

const token = getToken()

const instance = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: {'Authorization': `${token}`}
})

const playersAPI = {

    getPlayersInitial() {
        return (
            instance.get(`/players/initial`)
                .then((response) => response.data)
        )
    },

    getCoords() {
        return (
            instance.get(`/coordinates`)
                .then((response) => response.data)
        )
    },

}

export default playersAPI
