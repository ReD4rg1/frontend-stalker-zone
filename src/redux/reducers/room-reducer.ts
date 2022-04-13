import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../redux-store";
import roomAPI, {RoomListType} from "../../api/roomAPI";



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
}



export interface RoomInitialState {
    rooms: RoomListType[]
    currentRoom: CurrentRoom
    inSession: boolean
}

type CurrentRoom = {
    charactersList: Character[]
    usersList: User[]
}

const initialState: RoomInitialState = {
    rooms: [],
    currentRoom: {
        charactersList: [],
        usersList: [],
    },
    inSession: false,
}



type ActionsType = SetRoomDataType | SetSessionType | SetCharactersType

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
                ...action.payload,
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
    payload: RoomListType[]
}

export const SetCharacters = (payload: any): SetCharactersType => (
    {
        type: SET_CHARACTERS,
        payload: {
            ...payload
        }
    }
)

export default roomReducer
