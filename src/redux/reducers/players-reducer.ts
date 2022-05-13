import {createAndAddPlayers, showInitPlayersInfo} from "../generators/create-players";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../redux-store";
import playersAPI from "../../api/Game/playersAPI";
import {updateWS} from "../../api/Game/ws/playersWS";

const CREATE_PLAYERS = "CREATE-PLAYERS"
const SHOW_PLAYERS = "SHOW-PLAYERS"
const SET_PLAYERS = "SET-PLAYERS"
const SET_EVENTS = "SET-EVENTS"

export interface PlayersInitialState {
    players: Player[]
    initialPlayersInfo: IInitialPlayerInfo[]
    playersIsReady: boolean
    currentEvent: CurrentEvent
}

export interface CurrentEvent {
    id: number
    title: string
    text: string
    description: string
    type: EventsType
}

export type EventsType = "simpleCard"

export interface IInitialPlayerInfo {
    id: number,
    name: string,
    effects: {
        healBoost: number,
        mapMoveModifier: number,
        damageBoost: number,
        armorBoost: number,
        seedMoney: number,
        maxHp: number,
        secrecyBoost: number
    }
}

export interface Player {
    id: number
    userId: number
    name: string
    hp: number
    reputation: number
    numberOfMoves: number
    order: OrderType | null
    effects: PlayerEffectsType
    money: number
    states: States
    inventory: Inventory
    coordinates: CoordinatesType
}

interface States {
    skipping: boolean
    inFight: boolean
    move: boolean
    rollCube: boolean
    alreadyMove: boolean
    inEvent: boolean
    anotherMove: boolean
}

type CoordinatesType = {
    locationId: number
    hexId: number
}

interface Inventory {
    helmet: ArmorType | null
    bodyArmor: ArmorType | null
    weapon: WeaponType | null
    weaponFirstLevelModifier: WeaponModifierType | null
    weaponSecondLevelModifier: WeaponModifierType | null
    weaponThirdLevelModifier: WeaponModifierType | null
    grenades: GrenadeType[]
    healBoxes: HealBoxType[]
    stimulators: HealBoxType[]
    teleport: TeleportType | null
    artifact: ActiveArtifactType | null
    otherItems: OtherItemType[]
}

type PlayerEffectsType = {
    healBoost: number
    mapMoveModifier: number
    damageBoost: number
    armorBoost: number
    seedMoney: number
    maxHp: number
    secrecyBoost: number
    locationMoveModifier: number
}
type OrderType = {
    title: string
    description: string
    targetLocations: string[]
    receptionPlace: string
    isCompleted: boolean
    reward: number
    orderEffect: PlayerEffectsType
}
type ActiveArtifactType = {
    title: string
    mapMoveEffect: number
    healEffect: number
    count: number
    cost: number
}
type TeleportType = {
    title: string
    coordinates: number
    cost: number
}
type OtherItemType = {
    title: string
    effect: number
    cost: number
}
type HealBoxType = {
    title: string
    healEffect: number
    count: number
    cost: number
}
type GrenadeType = {
    title: string
    damage: number
    damageBoost: number
    damageModifier: number
    count: number
    cost: number
}
type WeaponModifierType = {
    title: string
    damageModifier: number
    compatibility: string[]
    cost: number
}
type WeaponType = {
    title: string
    damage: number
    damageBoost: number
    cost: number
}
type ArmorType = {
    title: string
    def: number
    cost: number
}

type ActionsType = GeneratePlayerType | ShowInitPlayersInfoType | SetPlayersType | SetEventsType

type GeneratePlayerType = {
    type: typeof CREATE_PLAYERS
    players: number[]
}
type ShowInitPlayersInfoType = {
    type: typeof SHOW_PLAYERS
}

type SetPlayersType = {
    type: typeof SET_PLAYERS
    players: Player[]
}

type SetEventsType = {
    type: typeof SET_EVENTS
    event: any
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

let initialState: PlayersInitialState = {
    players: [
        {
            id: 1,
            userId: 1,
            name: "Мажор",
            hp: 30,
            reputation: 0,
            numberOfMoves: 0,
            order: null,
            money: 1500,
            states: {
                skipping: false,
                inFight: false,
                move: false,
                rollCube: false,
                alreadyMove: false,
                inEvent: false,
                anotherMove: false,
            },
            effects: {
                healBoost: 0,
                mapMoveModifier: 0,
                damageBoost: 0,
                armorBoost: 0,
                seedMoney: 1500,
                maxHp: 30,
                secrecyBoost: 0,
                locationMoveModifier: 0,
            },
            inventory: {
                helmet: null,
                bodyArmor: null,
                weapon: null,
                weaponFirstLevelModifier: null,
                weaponSecondLevelModifier: null,
                weaponThirdLevelModifier: null,
                grenades: [],
                healBoxes: [],
                stimulators: [],
                teleport: null,
                artifact: null,
                otherItems: [],
            },
            coordinates: {
                locationId: 4,
                hexId: 19,
            },
        }
    ],
    initialPlayersInfo: [
        {
            id: 1,
            name: "Мажор",
            effects: {
                healBoost: 0,
                mapMoveModifier: 0,
                damageBoost: 0,
                armorBoost: 0,
                seedMoney: 1500,
                maxHp: 30,
                secrecyBoost: 0
            }
        }
    ],
    playersIsReady: false,
    currentEvent: {
        id: 0,
        title: "",
        text: "",
        description: "",
        type: "simpleCard",
    },
}

const playersReducer = (state = initialState, action: ActionsType): PlayersInitialState => {
    switch (action.type) {
        case CREATE_PLAYERS:
            return {
                ...state,
                players: createAndAddPlayers(action.players),
                playersIsReady: true
            }
        case SHOW_PLAYERS:
            return {
                ...state,
                initialPlayersInfo: showInitPlayersInfo()
            }
        case SET_PLAYERS:
            return {
                ...state,
                players: action.players
            }
        case SET_EVENTS:
            return {
                ...state,
                currentEvent: action.event
            }
        default:
            return state
    }
}

export const setPlayers = (players: Player[]): SetPlayersType => (
    {
        type: SET_PLAYERS,
        players
    }
)

export const createPlayers = (players: number[]): GeneratePlayerType => (
    {
        type: CREATE_PLAYERS,
        players: players
    }
)

export const makeRoll = (playerId: number): ThunkType => {

    return (async () => {
        const response = await playersAPI.makeRoll(playerId)
        if (response.resultCode === 0) {
            updateWS()
        }
    })
}

export const passMove = (eventType: EventsType): ThunkType => {

    return (async () => {
        const response = await playersAPI.passMove()
        if (response.resultCode === 0) {
            updateWS()
            await playersAPI.nextEvent(eventType)
        }
    })
}

export const moveTo = (locationId: number, hexId: number, difficulty: number, playerId: number): ThunkType => {

    return (async () => {
        const response = await playersAPI.setCoordinates(locationId, hexId, difficulty, playerId)
        if (response.resultCode === 0) {
            updateWS()
        }
    })
}


export const setEvents = (event: any): SetEventsType => (
    {
        type: SET_EVENTS,
        event
    }
)

export const showPlayersInfo = (): ShowInitPlayersInfoType => ({type: SHOW_PLAYERS})

export const showEvent = (playerId: number): ThunkType => {

    return (async () => {
        const response = await playersAPI.showEvent(playerId)
        if (response.resultCode === 0) {
            updateWS()
        }
    })
}

export const applyEvent = (playerId: number, eventId: number, type: EventsType): ThunkType => {

    return (async () => {
        const response = await playersAPI.applyEvent(playerId, eventId, type)
        if (response.resultCode === 0) {
            updateWS()
        }
    })
}

export default playersReducer
