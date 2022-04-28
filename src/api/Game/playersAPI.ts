import axios from "axios";
import {getToken} from "../token";

const token = getToken()

const instance = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: {'Authorization': `${token}`}
})

const playersAPI = {

    getCoords() {
        return (
            instance.get(`/coordinates`)
                .then((response) => response.data)
        )
    },

}

export default playersAPI
