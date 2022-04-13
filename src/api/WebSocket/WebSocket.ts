import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";
import {sort} from "./utils";

interface CharEffect {
    id: number
    name: string
    value: number
}

export interface Character {
    id: number
    name: string
    available: boolean
    effectsList: CharEffect[]
}

interface Props {
    setCharacters: (characters: Character[]) => void
    setConnected: (status: boolean) => void
}

let stompClient: any = null

export function connect({setCharacters, setConnected}: Props) {
    const socket = new SockJS('http://localhost:8080/initialization-websocket')
    stompClient = Stomp.over(socket)
    stompClient.connect({}, () => {
        setConnected(true)
        stompClient.subscribe('/characters/list', (chars: any) => {
            setCharacters(sort(JSON.parse(chars.body)))
        })
    })
}

export function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect()
    }
}

export function sendChar(id: number) {
    stompClient.send("/app/edit", {}, JSON.stringify({id}))
}
