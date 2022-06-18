import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../redux-store";
import playersAPI from "../../api/Game/playersAPI";
import {updateFight, updateWS} from "../../api/Game/ws/gameWS";
import eventsAPI from "../../api/Game/eventsAPI";
import inventoryAPI, {ItemTypes, Shop} from "../../api/Game/inventoryAPI";
import {findMyPlayer} from "../utils";
import {grenadesNames, medkitsNames, stimsNames, weaponsNames} from "../../consts/multiplayerSession";
import monsterAPI from "../../api/Game/monsterAPI";

const SET_PLAYERS = "SET-PLAYERS"
const SET_EVENTS = "SET-EVENTS"
const SET_SHOP = "SET-SHOP"

export interface PlayersInitialState {
    players: Player[]
    myPlayer: Player
    initialPlayersInfo: IInitialPlayerInfo[]
    playersIsReady: boolean
    currentEvent: CurrentEvent
    shop: Shop
    shopLoaded: boolean
    endGameAlerted: boolean
}

export interface CurrentEvent {
    id: number
    title: string
    text: string
    description: string
    type: EventsType
    possibilitySkip: boolean
    locationId: number
    hexId: number
    rollCube: number
    monsterLevel: number
}

export type EventsType = "simpleCard" | "throwCard" | "moveCard" | "monsterCard"

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
    armor: number
    reputation: number
    numberOfMoves: number
    order: OrderType | null
    effects: PlayerEffectsType
    money: number
    states: States
    inventory: Inventory
    backpack: Backpack
    coordinates: CoordinatesType
    locationCoordinate: LocationCoordinatesType
}

interface States {
    skipping: boolean
    inFight: boolean
    move: boolean
    rollCube: boolean
    alreadyMove: boolean
    inEvent: boolean
    inLocation: boolean
    anotherMove: boolean
    alreadyThrowCube: boolean
    eventComplete: boolean
    paralyze: boolean
    endGame: boolean
}

type CoordinatesType = {
    locationId: number
    hexId: number
    locationName: string
    locationLevel: number
}

type LocationCoordinatesType = {
    id: number
    playerId: number
    level: number
    position: number
}

interface Inventory {
    helmet: ArmorType | null
    bodyArmor: ArmorType | null
    weapon: WeaponType | null
    weaponFirstLevelModifier: WeaponModifierType | null
    weaponSecondLevelModifier: WeaponModifierType | null
    weaponThirdLevelModifier: WeaponModifierType | null
    grenades: GrenadeType[]
    medkits: MedkitsType[]
    stimulants: StimsType[]
    teleport: TeleportType | null
    artifact: ActiveArtifactType | null
    mapModifier: OtherItemType | null
    locationModifier: OtherItemType | null
    trapModifier: OtherItemType | null
    stealthModifier: OtherItemType | null
    compassDetail: number
}

interface Backpack {
    helmets: ArmorType[]
    bodyArmors: ArmorType[]
    weapons: WeaponType[]
    weaponFirstLevelModifiers: WeaponModifierType[]
    weaponSecondLevelModifiers: WeaponModifierType[]
    weaponThirdLevelModifiers: WeaponModifierType[]
    grenades: GrenadeType[]
    stimulants: StimsType[]
    teleports: TeleportType[]
    artifacts: ActiveArtifactType[]
    mapModifiers: OtherItemType[]
    locationModifiers: OtherItemType[]
    trapModifiers: OtherItemType[]
    stealthModifiers: OtherItemType[]
    trophies: TrophiesType[]
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
    id: number
    title: string
    text: string
    description: string
    firstPlace: string
    secondPlace: string | 0
    base: number
    laboratory: number
    village: number
    progress: number
    maxProgress: number
}
type ActiveArtifactType = {
    id: number
    name: string
    effect: string
    price: number
}
type TeleportType = {
    id: number
    name: string
    location: string
    price: number
}
type OtherItemType = {
    id: number
    name: string
    effect: string
    price: number
}
type TrophiesType = {
    id: number
    name: string
    price: number
}
type MedkitsType = {
    id: number
    name: medkitsNames
    effect: string
    price: number
}
type StimsType = {
    id: number
    name: stimsNames
    effect: string
    price: number
}
type GrenadeType = {
    id: number
    name: grenadesNames
    damage: number
    damageBoost: number
    damageModifier: number
    price: number
}
type WeaponModifierType = {
    id: number
    name: string
    damageModifier: number
    weaponName: string
    price: number
}
type WeaponType = {
    id: number
    name: weaponsNames
    damage: number
    damageBoost: number
    price: number
}
type ArmorType = {
    id: number
    name: string
    defence: number
    price: number
}

type ActionsType = SetPlayersType | SetEventsType | SetShopType

type SetPlayersType = {
    type: typeof SET_PLAYERS
    players: Player[]
    userId: number
}

type SetEventsType = {
    type: typeof SET_EVENTS
    event: any
}

type SetShopType = {
    type: typeof SET_SHOP
    shop: Shop
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

let initialPlayer: Player = {
    id: 1,
    userId: 1,
    name: "Мажор",
    hp: 30,
    armor: 0,
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
        inLocation: false,
        anotherMove: false,
        alreadyThrowCube: false,
        eventComplete: false,
        paralyze: false,
        endGame: false,
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
        medkits: [],
        stimulants: [],
        teleport: null,
        artifact: null,
        mapModifier: null,
        locationModifier: null,
        trapModifier: null,
        stealthModifier: null,
        compassDetail: 0,
    },
    backpack: {
        helmets: [],
        bodyArmors: [],
        weapons: [],
        weaponFirstLevelModifiers: [],
        weaponSecondLevelModifiers: [],
        weaponThirdLevelModifiers: [],
        grenades: [],
        stimulants: [],
        teleports: [],
        artifacts: [],
        mapModifiers: [],
        locationModifiers: [],
        trapModifiers: [],
        stealthModifiers: [],
        trophies: [],
    },
    coordinates: {
        locationId: 4,
        hexId: 19,
        locationName: '',
        locationLevel: 0,
    },
    locationCoordinate: {
        id: 0,
        playerId: 0,
        level: 0,
        position: 0,
    }
}

let initialState: PlayersInitialState = {
    players: [initialPlayer],
    myPlayer: initialPlayer,
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
        possibilitySkip: false,
        locationId: 0,
        hexId: 0,
        rollCube: 2,
        monsterLevel: 1,
    },
    shop: {
        armors: [],
        weapon: [],
        weaponModifiers: [],
        equipments: [],
        grenade: [],
    },
    shopLoaded: false,
    endGameAlerted: false,
}

const playersReducer = (state = initialState, action: ActionsType): PlayersInitialState => {
    switch (action.type) {
        case SET_PLAYERS:
            action.players.forEach((player) => {
                if (player.states.endGame && !state.endGameAlerted) {
                    alert(`Игрок ${player.name} победил!`)
                    return {
                        ...state,
                        players: action.players,
                        myPlayer: findMyPlayer(action.players, action.userId),
                        endGameAlerted: true,
                    }
                }
            })
            return {
                ...state,
                players: action.players,
                myPlayer: findMyPlayer(action.players, action.userId)
            }
        case SET_EVENTS:
            return {
                ...state,
                currentEvent: action.event
            }
        case SET_SHOP:
            return {
                ...state,
                shop: {
                    armors: [...action.shop.armors],
                    weapon: [...action.shop.weapon],
                    weaponModifiers: [...action.shop.weaponModifiers],
                    equipments: [...action.shop.equipments],
                    grenade: [...action.shop.grenade],
                }
            }
        default:
            return state
    }
}

export const setPlayers = (players: Player[], userId: number): SetPlayersType => (
    {
        type: SET_PLAYERS,
        players,
        userId,
    }
)

export const makeRoll = (playerId: number): ThunkType => {

    return (async () => {
        const response = await playersAPI.makeRoll(playerId)
        if (response.resultCode === 0) updateWS()
    })
}

export const passMove = (eventType: EventsType): ThunkType => {

    return (async () => {
        const response = await playersAPI.passMove()
        if (response.resultCode === 0) {
            updateWS()
            await eventsAPI.nextEvent(eventType)
        }
    })
}

export const moveTo = (locationId: number, hexId: number, difficulty: number, playerId: number, locationName: string): ThunkType => {

    return (async () => {
        const response = await playersAPI.setCoordinates(locationId, hexId, difficulty, playerId, locationName)
        if (response.resultCode === 0) updateWS()
    })
}


export const setEvents = (event: CurrentEvent): SetEventsType => (
    {
        type: SET_EVENTS,
        event
    }
)

export const showEvent = (playerId: number): ThunkType => {

    return (async () => {
        const response = await eventsAPI.showEvent(playerId)
        if (response.resultCode === 0) updateWS()
    })
}

export const applyEvent = (playerId: number, eventId: number, type: EventsType): ThunkType => {

    return (async () => {
        const response = await eventsAPI.applyEvent(playerId, eventId, type)
        if (response.resultCode === 0) updateWS()
    })
}

export const eventRoll = (playerId: number): ThunkType => {
    return (async () => {
        const response = await eventsAPI.eventRoll(playerId)
        if (response.resultCode === 0) updateWS()
    })
}

export const setShop = (shop: Shop): SetShopType => (
    {
        type: SET_SHOP,
        shop
    }
)

export const getShop = (): ThunkType => {
    return (async (dispatch) => {
        const shop = await inventoryAPI.getShop()
        dispatch(setShop(shop))
    })
}

export const setItem = (playerId: number, itemId: number, price: number, type: ItemTypes): ThunkType => {
    return (async () => {
        console.log('itemId: ',itemId,' type: ', type)
        const response = await inventoryAPI.setItem(playerId, itemId, price, type)
        if (response.resultCode === 0) updateWS()
    })
}

export const removeItem = (playerId: number, itemId: number, price: number,type: ItemTypes): ThunkType => {
    return (async () => {
        const response = await inventoryAPI.removeItem(playerId, itemId, price, type)
        if (response.resultCode === 0) updateWS()
    })
}

export const sellItem = (playerId: number, itemId: number, price: number, type: ItemTypes): ThunkType => {
    return (async () => {
        const response = await inventoryAPI.sellItem(playerId, itemId, price, type)
        if (response.resultCode === 0) updateWS()
    })
}

export const setItemFromBackpack = (playerId: number, itemId: number, type: ItemTypes): ThunkType => {
    return (async () => {
        const response = await inventoryAPI.setFromBackpackItem(playerId, itemId, type)
        if (response.resultCode === 0) updateWS()
    })
}

export const useMedkit = (playerId: number, medkitId: number): ThunkType => {
    return (async () => {
        const response = await inventoryAPI.useMedkit(playerId, medkitId)
        if (response.resultCode === 0) {
            updateWS()
            alert("Вы использовали аптечку")
        }
    })
}

export const useStimulator = (playerId: number, stimulatorId: number): ThunkType => {
    return (async () => {
        const response = await inventoryAPI.useStimulator(playerId, stimulatorId)
        if (response.resultCode === 0) {
            updateWS()
            alert("Вы использовали стимулятор")
        }
    })
}

export const getArtifact = (playerId: number): ThunkType => {
    return (async () => {
        const responseDetail = await inventoryAPI.getDetail(playerId)
        if (responseDetail.resultCode === 0) {
            updateWS()
            alert("Вы получили деталь компаса!")
        } else if (responseDetail.resultCode === 1) {
            const responseArtifact = await inventoryAPI.getArtifact(playerId)
            if (responseArtifact.resultCode === 0) {
                updateWS()
                alert("Вы получили артефакт!")
            }
        }
    })
}

export const setOrder = (playerId: number): ThunkType => {
    return (async () => {
        const response = await playersAPI.setOrder(playerId)
        if (response.resultCode === 0) {
            updateWS()
            alert("Вы взяли заказ!")
        }
    })
}

export const passOrder = (playerId: number, place: "base" | "village" | "laboratory"): ThunkType => {
    return (async () => {
        const response = await playersAPI.passOrder(playerId, place)
        if (response.resultCode === 0) {
            updateWS()
            alert("Вы сдали заказ!")
        }
    })
}

export const endGame = (playerId: number): ThunkType => {
    return (async () => {
        const response = await playersAPI.endGame(playerId)
        if (response.resultCode === 0) {
            updateWS()
        }
    })
}

export const locationEnter = (playerId: number, level: number, position: number): ThunkType => {
    return (async () => {
        const response = await playersAPI.locationEnter(playerId)
        if (response.resultCode === 0) {
            updateWS()
            const responseMove = await playersAPI.locationMove(playerId, level, position)
            if (responseMove.resultCode === 0) {
                updateWS()
            }
            const responsePass = await playersAPI.passMove()
            if (responsePass.resultCode === 0) {
                updateWS()
                updateFight()
            }
        }
    })
}

export const locationMove = (playerId: number, level: number, position: number): ThunkType => {
    return (async () => {
        const response = await playersAPI.locationMove(playerId, level, position)
        if (response.resultCode === 0) {
            updateWS()
            if (position < 8) {
                const responseSet = await monsterAPI.setMonster(level, 0)
                if (responseSet.resultCode === 0 || 1) {
                    const responseStart = await monsterAPI.startFight(playerId)
                    if (responseStart.resultCode === 0) {
                        updateFight()
                        updateWS()
                    }
                }
            }
        }
    })
}

export const locationPassMove = (): ThunkType => {
    return (async () => {
        const response = await playersAPI.passMove()
        if (response.resultCode === 0) {
            updateWS()
        }
    })
}

export const locationOut = (playerId: number, getArtifact: boolean): ThunkType => {
    return (async () => {
        const response = await playersAPI.locationOut(playerId)
        if (response.resultCode === 0) {
            updateWS()
            if (getArtifact) {
                const responseDetail = await inventoryAPI.getDetail(playerId)
                if (responseDetail.resultCode === 0) {
                    updateWS()
                    alert("Вы получили деталь компаса!")
                } else if (responseDetail.resultCode === 1) {
                    const responseArtifact = await inventoryAPI.getArtifact(playerId)
                    if (responseArtifact.resultCode === 0) {
                        updateWS()
                        alert("Вы получили артефакт!")
                    }
                }
            }
            const responsePass = await playersAPI.passMove()
            if (responsePass.resultCode === 0) {
                updateWS()
                updateFight()
            }
        }
    })
}

export default playersReducer
