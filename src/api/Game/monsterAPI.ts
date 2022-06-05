import {getToken} from "../token";
import axios from "axios";

const token = getToken()

const instance = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: {'Authorization': `${token}`}
})

const monsterAPI = {

    setMonster(level: number) {
        return (
            instance.post(`/monster/set`, {level})
                .then((response) => response.data)
        )
    },

}

export default monsterAPI
