import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8080/',
    //headers: {'API-KEY': '67e9bc59-d756-4699-841e-f4005ff4fe7c'},
})

const authAPI = {

    getAuth() {
        return (
            instance.get(`auth/me`)
                .then(response => response.data)
        )
    },

    signUp(name: string, password: string) {
        return (
            instance.post(`auth/registration`, {name, password})
                .then(response => response.data)
        )
    },

    login(name: string, password: string) {
        return (
            instance.post(`auth/login`, {name, password})
                .then(response => response.data)
        )
    },

    logout() {
        return (
            instance.delete(`auth/login`)
                .then(response => response.data)
        )
    },
}

export default authAPI
