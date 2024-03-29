import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";
import {CurrentEvent, Player} from "../../../redux/reducers/players-reducer";
import { AvailableHexes } from "../../../redux/reducers/map-reducer";
import {sortPlayers} from "./utils";
import {AuthInitialState} from "../../../redux/reducers/auth-reducer";

interface Props {
    setConnected: (status: boolean) => void
    setPlayers: (players: Player[], userId: number) => void
    setAvailableHexes: (hexes: AvailableHexes) => void
    setEvents: (event: CurrentEvent) => void
    setMonster: (monster: any) => void
    setFightEffect: (effect: any) => void
    setFightQueue: (queue: any) => void
    auth: AuthInitialState
}

let stompClient: any = null

export function connectWS({setConnected, setPlayers, setAvailableHexes, setEvents, setMonster, auth, setFightEffect, setFightQueue}: Props) {
    const socket = new SockJS('http://localhost:8080/player-ws')
    stompClient = Stomp.over(socket)
    stompClient.connect({}, () => {
        setConnected(true)
        stompClient.subscribe('/players', (players: any) => {
            setPlayers(sortPlayers(JSON.parse(players.body)), auth.userId)
        })
        stompClient.subscribe('/coordinates', (hexes: any) => {
            setAvailableHexes(JSON.parse(hexes.body))
        })
        stompClient.subscribe('/events', (events: any) => {
            setEvents(JSON.parse(events.body))
        })
        stompClient.subscribe('/monster', (monster: any) => {
            setMonster(JSON.parse(monster.body))
        })
        stompClient.subscribe('/monster-effect', (effect: any) => {
            setFightEffect(JSON.parse(effect.body))
        })
        stompClient.subscribe('/monster-queue', (queue: any) => {
            setFightQueue(JSON.parse(queue.body))
        })
    })
}

export function disconnectWS() {
    if (stompClient !== null) {
        stompClient.disconnect()
    }
}

function getPlayers() {
    stompClient.send("/app/get-players", {})
}

function getCoords() {
    stompClient.send("/app/get-coordinates", {})
}

function getEvents() {
    stompClient.send("/app/get-event", {})
}

export function getMonster() {
    stompClient.send("/app/get-monster", {})
}

function getFightEffect() {
    stompClient.send("/app/get-fight-effect", {})
}

function getFightQueue() {
    stompClient.send("/app/get-fight-queue", {})
}

export function updateWS() {
    getPlayers()
    getCoords()
    getEvents()
}

export function updateFight() {
    getMonster()
    getFightEffect()
    getFightQueue()
}
