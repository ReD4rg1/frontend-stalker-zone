import {createAndAddPlayers, showInitPlayersInfo} from "./create-players"

const CREATE_PLAYERS = "CREATE-PLAYERS"
const SHOW_PLAYERS = "SHOW-PLAYERS"

type InitialStateType = {
    players: Array<IPlayer>
    initialPlayersInfo: Array<IInitialPlayerInfo>
}

interface IInitialPlayerInfo {
    playerId: number,
    playerName: string,
    playerEffects: {
        healBoost: number,
        mapMoveModifier: number,
        damageBoost: number,
        armorBoost: number,
        seedMoney: number,
        maxHp: number,
        secrecyBoost: number
    }
}

export interface IPlayer {
    playerId: number
    playerName: string
    playerHP: number
    playerReputation: number
    playerPowerReserve: number
    playerActiveOrder: OrderType | null
    playerEffects: PlayerEffectsType
    playerMoney: number
    isSkipping: boolean
    inventory: IInventory
}

interface IInventory {
    helmet: ArmorType | null
    bodyArmor: ArmorType | null
    weapon: WeaponType | null
    weaponFirstLevelModifier: WeaponModifierType | null
    weaponSecondLevelModifier: WeaponModifierType | null
    weaponThirdLevelModifier: WeaponModifierType | null
    grenade: GrenadeType | null
    healBox: HealBoxType | null
    stimulator: HealBoxType | null
    secrecy: OtherItemType | null
    mapMovesModifier: OtherItemType | null
    locationMovesModifier: OtherItemType | null
    teleport: TeleportType | null
    Artifact: ActiveArtifactType | null
}

type PlayerEffectsType = {
    healBoost: number
    mapMoveModifier: number
    damageBoost: number
    armorBoost: number
    seedMoney: number
    maxHp: number
    secrecyBoost: number
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

let initialState: InitialStateType = {
    players: [
        {
            playerId: 1,
            playerName: "Мажор",
            playerHP: 30,
            playerReputation: 0,
            playerPowerReserve: 0,
            playerActiveOrder: null,
            playerMoney: 1500,
            isSkipping: false,
            playerEffects: {
                healBoost: 0,
                mapMoveModifier: 0,
                damageBoost: 0,
                armorBoost: 0,
                seedMoney: 1500,
                maxHp: 30,
                secrecyBoost: 0
            },
            inventory: {
                helmet: null,
                bodyArmor: null,
                weapon: null,
                weaponFirstLevelModifier: null,
                weaponSecondLevelModifier: null,
                weaponThirdLevelModifier: null,
                grenade: null,
                healBox: null,
                stimulator: null,
                secrecy: null,
                mapMovesModifier: null,
                locationMovesModifier: null,
                teleport: null,
                Artifact: null,
            }
        }
    ],
    initialPlayersInfo: [
        {
            playerId: 1,
            playerName: "Мажор",
            playerEffects: {
                healBoost: 0,
                mapMoveModifier: 0,
                damageBoost: 0,
                armorBoost: 0,
                seedMoney: 1500,
                maxHp: 30,
                secrecyBoost: 0
            }
        }
    ]
}

const playersReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case CREATE_PLAYERS:
            return {
                ...state,
                players: createAndAddPlayers(action.players)
            }
        case SHOW_PLAYERS:
            return {
                ...state,
                initialPlayersInfo: showInitPlayersInfo()
            }
        default:
            return state
    }
};

type GeneratePlayerType = {
    type: typeof CREATE_PLAYERS
    players: Array<number>
}

export const createPlayers = (players: Array<number>):GeneratePlayerType => (
    {
        type: CREATE_PLAYERS,
        players: players
    }
)

type ShowInitPlayersInfoType = {
    type: typeof SHOW_PLAYERS
}

export const showPlayersInfo = ():ShowInitPlayersInfoType => ({type: SHOW_PLAYERS})

export default playersReducer