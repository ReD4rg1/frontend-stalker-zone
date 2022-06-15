import {getToken} from "../token";
import axios from "axios";

const token = getToken()

const instance = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: {'Authorization': `${token}`}
})

const monsterAPI = {

    setMonster(level: number, eventId: number) {
        return (
            instance.post(`/monster/set?level=${level}&eventId=${eventId}`, {})
                .then((response) => response.data)
        )
    },

    startFight(playerId: number) {
        return (
            instance.post(`/fight/start?playerId=${playerId}`, {})
                .then((response) => response.data)
        )
    },

    playerAttack(playerId: number) {
        return (
            instance.post(`/fight/player-attack?playerId=${playerId}`, {})
                .then((response) => response.data)
        )
    },

    monsterAttack(playerId: number) {
        return (
            instance.post(`/fight/monster-attack?playerId=${playerId}`, {})
                .then((response) => response.data)
        )
    },

    nextMember(playerId: number) {
        return (
            instance.post(`/fight/next-member?playerId=${playerId}`, {})
                .then((response) => response.data)
        )
    },

    endFight(playerId: number) {
        return (
            instance.post(`/fight/end?playerId=${playerId}`, {})
                .then((response) => response.data)
        )
    },

    playerDied(playerId: number) {
        return (
            instance.post(`/fight/player-died?playerId=${playerId}`, {})
                .then((response) => response.data)
        )
    },
}

export default monsterAPI
