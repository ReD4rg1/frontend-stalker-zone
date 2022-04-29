import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";
import { Player } from "../../../redux/reducers/players-reducer";
import { AvailableHexes } from "../../../redux/reducers/map-reducer";

interface Props {
    setConnected: (status: boolean) => void
    setPlayers: (players: Player[]) => void
    setAvailableHexes: (hexes: AvailableHexes) => void
}

let stompClient: any = null

export function connectWS({setConnected, setPlayers, setAvailableHexes}: Props) {
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
    })
}

export function disconnectWS() {
    if (stompClient !== null) {
        stompClient.disconnect()
    }
}

export function getPlayers() {
    stompClient.send("/app/get-players", {})
}

export function getCoords() {
    stompClient.send("/app/get-coordinates", {})
}
