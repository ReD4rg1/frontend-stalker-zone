import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";
import {sortChars, sortUsers} from "./utils";
import {Character, User} from "../../../redux/reducers/room-reducer";

interface Props {
    setConnected: (status: boolean) => void
    SetCharacters: (payload: Character[]) => void
    SetUsers: (payload: User[]) => void
    SetRoomUsers: (payload: string[]) => void
}

let stompClient: any = null

export function connect({setConnected, SetUsers, SetCharacters, SetRoomUsers}: Props) {
    const socket = new SockJS('http://localhost:8080/initialization-websocket')
    stompClient = Stomp.over(socket)
    stompClient.connect({}, () => {
        setConnected(true)
        stompClient.subscribe('/characters/list', (chars: any) => {
            SetCharacters(sortChars(JSON.parse(chars.body)))
        })
        stompClient.subscribe('/users/list', (users: any) => {
            SetUsers(sortUsers(JSON.parse(users.body)))
        })
        stompClient.subscribe('/usersInTheRoom/list', (users: any) => {
            SetRoomUsers(JSON.parse(users.body))
        })
    })
}

export function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect()
    }
}

export function getChars(id: number) {
    stompClient.send("/app/edit", {}, JSON.stringify({id}))
}

export function getUsersInRoom(id: number | null) {
    stompClient.send("/app/users", {}, JSON.stringify({id}))
}

export function bindUser(characterId: number, userId: number | null) {
    stompClient.send("/app/user-binding", {}, JSON.stringify({userId, characterId}))
}

export function toggleReadyStatus(userId: number | null, readyStatus: boolean) {
    stompClient.send("/app/user-status", {}, JSON.stringify({userId, readyStatus}))
}