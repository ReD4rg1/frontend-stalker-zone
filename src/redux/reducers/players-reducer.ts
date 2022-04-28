import {createAndAddPlayers, showInitPlayersInfo} from "../generators/create-players";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../redux-store";

const CREATE_PLAYERS = "CREATE-PLAYERS"
const SHOW_PLAYERS = "SHOW-PLAYERS"
const SET_PLAYERS = "SET-PLAYERS"

export interface PlayersInitialState {
    players: Array<Player>
    initialPlayersInfo: Array<IInitialPlayerInfo>
    playersIsReady: boolean
}

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
    name: string
    hp: number
    reputation: number
    numberOfMoves: number
    order: OrderType | null
    effects: PlayerEffectsType
    money: number
    skipping: boolean
    move: boolean
    inventory: Inventory
    coordinates: CoordinatesType
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
    targetLocations: Array<string>
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
    compatibility: Array<string>
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

type ActionsType = GeneratePlayerType | ShowInitPlayersInfoType | SetPlayersType

type GeneratePlayerType = {
    type: typeof CREATE_PLAYERS
    players: Array<number>
}
type ShowInitPlayersInfoType = {
    type: typeof SHOW_PLAYERS
}

type SetPlayersType = {
    type: typeof SET_PLAYERS
    players: Player[]
}


type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

let initialState: PlayersInitialState = {
    players: [
        {
            id: 1,
            name: "Мажор",
            hp: 30,
            reputation: 0,
            numberOfMoves: 0,
            order: null,
            money: 1500,
            skipping: false,
            move: false,
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
    playersIsReady: false
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
        default:
            return state
    }
}

export const setPlayers = (players: Player[]):SetPlayersType => (
    {
        type: SET_PLAYERS,
        players
    }
)

export const createPlayers = (players: Array<number>):GeneratePlayerType => (
    {
        type: CREATE_PLAYERS,
        players: players
    }
)

export const showPlayersInfo = ():ShowInitPlayersInfoType => ({type: SHOW_PLAYERS})

export default playersReducer
