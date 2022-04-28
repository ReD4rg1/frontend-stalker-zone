import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";
import { Player } from "../../../redux/reducers/players-reducer";

interface Props {
    setConnected: (status: boolean) => void
    setPlayers: (players: Player[]) => void
}

let stompClient: any = null

export function connectWS({setConnected, setPlayers}: Props) {
    const socket = new SockJS('http://localhost:8080/player-ws')
    stompClient = Stomp.over(socket)
    stompClient.connect({}, () => {
        setConnected(true)
        stompClient.subscribe('/players', (players: any) => {
            console.log("players: ", players)
            setPlayers(JSON.parse(players.body))
        })
    })
}

export function disconnectWS() {
    if (stompClient !== null) {
        stompClient.disconnect()
    }
}

export function getPlayers() {
    stompClient.send("/app/players", {})
}
