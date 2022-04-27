import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../redux-store";
import roomAPI, {RoomListType} from "../../api/Rooms/roomAPI";


const SET_ROOMS = "SET-ROOMS"
const SET_CHARACTERS = "SET-CHARACTERS"
const SET_USERS = "SET-USERS"
const SET_SESSION = "SET-SESSION"
const SET_ROOM_USERS = "SET-ROOM-USERS"
const START_GAME = "START-GAME"
const CLEAR_ROOM = "CLEAR-ROOM"



export interface Character {
    id: number
    name: string
    available: boolean
    effectsList: CharEffect[]
}

type CharEffect = {
    id: number
    name: string
    value: number
}

export interface User {
    userId: number
    characterId: number
    username: string
    readyStatus: boolean
}



export interface RoomInitialState {
    rooms: RoomListType[]
    currentRoom: CurrentRoom
    inSession: boolean
    gameReadyStatus: boolean
}

type CurrentRoom = {
    charactersList: Character[]
    usersList: User[]
    usersInRoom: PayloadSetRoomUsersType[]
}

const initialState: RoomInitialState = {
    rooms: [],
    currentRoom: {
        charactersList: [],
        usersList: [],
        usersInRoom: [],
    },
    inSession: false,
    gameReadyStatus: false
}



type ActionsType =
    SetRoomDataType |
    SetSessionType |
    SetCharactersType |
    SetUsersType |
    SetRoomUsersType |
    StartGameType |
    ClearRoomType

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>



const roomReducer = (state = initialState, action: ActionsType): RoomInitialState => {
    switch (action.type) {
        case SET_ROOMS:
            return {
                ...state,
                rooms: [...action.payload],
            }
        case SET_SESSION:
            return {
                ...state,
                inSession: action.inSession,
            }
        case SET_CHARACTERS:
            return {
                ...state,
                currentRoom: {
                    ...state.currentRoom,
                    charactersList: [...action.payload],
                }
            }
        case SET_USERS:
            return {
                ...state,
                currentRoom: {
                    ...state.currentRoom,
                    usersList: [...action.payload],
                }
            }
        case SET_ROOM_USERS:
            return {
                ...state,
                currentRoom: {
                    ...state.currentRoom,
                    usersInRoom: [...action.payload]
                }
            }
        case START_GAME:
            return {
                ...state,
                gameReadyStatus: true
            }
        case CLEAR_ROOM:
            return {
                ...state,
                currentRoom: {
                    charactersList: [],
                    usersList: [],
                    usersInRoom: [],
                },
                inSession: false,
                gameReadyStatus: false
            }
        default:
            return state
    }
}



type SetRoomDataType = {
    type: typeof SET_ROOMS
    payload: RoomListType[]
}

export const setRoomsData = (payload: RoomListType[]): SetRoomDataType => (
    {
        type: SET_ROOMS,
        payload: payload
    }
)

export const getRooms = ():ThunkType => {

    return (async (dispatch) => {
        const response = await roomAPI.getRooms()
        if (response.resultCode === 0) {
            if (response.roomList) {
                dispatch(setRoomsData(response.roomList))
            }
        }
    })
}



type SetSessionType = {
    type: typeof SET_SESSION
    inSession: boolean
}

export const sessionConnect = (status: boolean): SetSessionType => (
    {
        type: SET_SESSION,
        inSession: status,
    }
)

export const joinToRoom = ():ThunkType => {

    return (async (dispatch) => {
        const response = await roomAPI.join()
        if (response.resultCode === 0) {
            dispatch(sessionConnect(true))
        }
    })
}

export const disconnectFromRoom = ():ThunkType => {

    return (async (dispatch) => {
        const response = await roomAPI.disconnect()
        if (response.resultCode === 0) {
            dispatch(sessionConnect(false))
        }
    })
}



type SetCharactersType = {
    type: typeof SET_CHARACTERS
    payload: Character[]
}

export const SetCharacters = (payload: Character[]): SetCharactersType => (
    {
        type: SET_CHARACTERS,
        payload
    }
)


type SetUsersType = {
    type: typeof SET_USERS
    payload: User[]
}

export const SetUsers = (payload: User[]): SetUsersType => (
    {
        type: SET_USERS,
        payload
    }
)

type PayloadSetRoomUsersType = {
    username: string
}

type SetRoomUsersType = {
    type: typeof SET_ROOM_USERS
    payload: PayloadSetRoomUsersType[]
}

export const SetRoomUsers = (payload: PayloadSetRoomUsersType[]): SetRoomUsersType => (
    {
        type: SET_ROOM_USERS,
        payload
    }
)

type StartGameType = {
    type: typeof START_GAME
}

export const GameIsReady = (): StartGameType => (
    {
        type: START_GAME
    }
)

export const StartGame = (): ThunkType => {

    return (async (dispatch) => {
        const response = await roomAPI.startGame()
        if (response.resultCode === 0) {
            dispatch(GameIsReady())
        }
    })
}

type ClearRoomType = {
    type: typeof CLEAR_ROOM
}

export const ClearRoom = (): ClearRoomType => (
    {
        type: CLEAR_ROOM
    }
)

interface ExitRoomProps {
    getChars: (id: number) => void
    bindUser: (characterId: number, userId: number | null) => void
    getUsersInRoom: (id: number) => void
}

export const ExitRoom = ({getChars, bindUser, getUsersInRoom}: ExitRoomProps): ThunkType => {

    return (async (dispatch) => {
        const response = await roomAPI.remove()
        if (response.resultCode === 0) {
            getChars(0)
            bindUser(0, 0)
            getUsersInRoom(0)
            dispatch(ClearRoom())
        }
    })
}

export default roomReducer
