import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";
import {CurrentEvent, Player} from "../../../redux/reducers/players-reducer";
import { AvailableHexes } from "../../../redux/reducers/map-reducer";

interface Props {
    setConnected: (status: boolean) => void
    setPlayers: (players: Player[]) => void
    setAvailableHexes: (hexes: AvailableHexes) => void
    setEvents: (event: CurrentEvent) => void
}

let stompClient: any = null

export function connectWS({setConnected, setPlayers, setAvailableHexes, setEvents}: Props) {
    const socket = new SockJS('http://localhost:8080/player-ws')
    stompClient = Stomp.over(socket)
    stompClient.connect({}, () => {
        setConnected(true)
        stompClient.subscribe('/players', (players: any) => {
            setPlayers(JSON.parse(players.body))
        })
        stompClient.subscribe('/coordinates', (hexes: any) => {
            setAvailableHexes(JSON.parse(hexes.body))
        })
        stompClient.subscribe('/events', (events: any) => {
            setEvents(JSON.parse(events.body))
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
    stompClient.send("/app/get", {})
}

export function updateWS() {
    getPlayers()
    getCoords()
    getEvents()
}
