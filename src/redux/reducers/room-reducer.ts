import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../redux-store";
import roomAPI, {RoomListType} from "../../api/Rooms/roomAPI";



const SET_ROOMS = "SET-ROOMS"
const SET_CHARACTERS = "SET-CHARACTERS"
const SET_USERS = "SET-USERS"
const SET_SESSION = "SET-SESSION"



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
    readyStatus: boolean
}

type CurrentRoom = {
    charactersList: Character[]
    usersList: User[]
    usersInRoom: string[]
}

const initialState: RoomInitialState = {
    rooms: [],
    currentRoom: {
        charactersList: [],
        usersList: [],
        usersInRoom: [],
    },
    inSession: false,
    readyStatus: false
}



type ActionsType = SetRoomDataType | SetSessionType | SetCharactersType | SetUsersType

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

export default roomReducer
