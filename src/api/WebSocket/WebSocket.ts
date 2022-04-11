import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";

let stompClient: any = null
const handlers: any[] = []

export function connect() {
    const socket = new SockJS('http://localhost:8080/initialization-websocket')
    stompClient = Stomp.over(socket)
    stompClient.connect({}, (frame: any) => {
        console.log('Connected: ' + frame)
        stompClient.subscribe('/characters/list', (char: any) => {
            handlers.forEach((handler) => handler(JSON.parse(char.body)))
        })
    })
}

export function addHandler(handler: any) {
    handlers.push(handler)
}

export function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect()
    }
    console.log("Disconnected")
}

export function sendChar(charId: {id: number}) {
    stompClient.send("/app/edit", {}, JSON.stringify({charId}))
}