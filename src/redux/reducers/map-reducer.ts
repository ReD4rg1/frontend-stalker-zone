import getGeneratedMap from "../generators/generate-map";
import {Player} from "./players-reducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../redux-store";
import mapAPI from "../../api/Game/mapAPI";

const GENERATE_MAP = "GENERATE-MAP"
const SET_MAP = "SET-MAP"
const SET_AVAILABLE_HEXES = "SET-AVAILABLE-HEXES"

export interface MapInitialState {
    locations: Location[]
    mapIsGenerated: boolean
    availableHexes: AvailableHexes
}

export interface AvailableHexes {
    playerId: number
    coordinates: AvailableHex[]
}

interface AvailableHex {
    moveId: number
    locationId: number
    move: boolean
}

export interface Location {
    id: number,
    hexList: IHex[]
}

export interface IHex {
    hexId: number,
    playerList: number[],
    active: boolean,
    containLocation: boolean,
    specialLocation: boolean,
    locationName: string,
    locationLevel: number,
    locationId: number,
    top: HexSideType,
    topLeft: HexSideType,
    topRight: HexSideType,
    bottom: HexSideType,
    bottomLeft: HexSideType,
    bottomRight: HexSideType
}

type HexSideType = {
    moveId: number,
    locationId: number,
    difficulty: number
}

type ActionsType = GenerateMapType | SetMapType | SetAvailableHexesType

let initialState: MapInitialState = {
    locations: [],
    mapIsGenerated: false,
    availableHexes: {
        playerId: 0,
        coordinates: []
    },
}

const mapReducer = (state = initialState, action: ActionsType): MapInitialState => {
    switch (action.type) {
        case GENERATE_MAP:
            return getGeneratedMap({state, players: action.players})

        case SET_MAP:
            return {
                ...state,
                mapIsGenerated: true,
                locations: action.map,
            }
        case SET_AVAILABLE_HEXES:
            return {
                ...state,
                availableHexes: {
                    ...action.hexes,
                },
            }
        default:
            return state
    }
}

type GenerateMapType = {
    type: typeof GENERATE_MAP
    players: Player[]
}

interface GenerateMapProps {
    players: Player[]
}

export const generateMap = ({players}: GenerateMapProps): GenerateMapType => (
    {
        type: GENERATE_MAP,
        players: players,
    }
)

type SetMapType = {
    type: typeof SET_MAP
    map: Location[]
}

const setMap = (map: Location[]): SetMapType => (
    {
        type: SET_MAP,
        map
    }
)

type SetAvailableHexesType = {
    type: typeof SET_AVAILABLE_HEXES
    hexes: AvailableHexes
}

export const setAvailableHexes = (hexes: AvailableHexes): SetAvailableHexesType => (
    {
        type: SET_AVAILABLE_HEXES,
        hexes
    }
)

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const fetchMap = (): ThunkType => {
    return (async (dispatch) => {
        dispatch(setMap(await mapAPI.getMap()))
    })
}

export default mapReducer
