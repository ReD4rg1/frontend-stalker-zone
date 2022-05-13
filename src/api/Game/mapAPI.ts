import axios from "axios";
import {getToken} from "../token";
import {Location} from "../../redux/reducers/map-reducer";

const token = getToken()

const instance = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: {'Authorization': `${token}`}
})

const mapAPI = {

    getMap() {
        return (
        instance.get(`/map`)
            .then((response): Location[] => response.data)
        )
    },

    deleteMap() {
        return (
            instance.get(`/delete`)
                .then((response) => response.data)
        )
    },

}

export default mapAPI
