import axios from "axios";
import {token} from "./token";

const instance = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: {'Authorization': `${token}`},
})

const authAPI = {

    getAuth() {
        return (
            instance.post(`auth/me`, {token})
                .then(response => response.data)
        )
    },

    signUp(username: string, password: string) {
        console.log(username, password)
        return (
            instance.post(`auth/registration`, {username, password})
                .then(response => response.data)
        )
    },

    login(username: string, password: string) {
        return (
            instance.post(`auth/login`, {username, password})
                .then(response => response.data)
        )
    },

    logout() {
        return (
            instance.post(`auth/login`)
                .then(response => response.data)
        )
    },
}

export default authAPI
