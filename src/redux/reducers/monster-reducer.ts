import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../redux-store";
import monsterAPI from "../../api/Game/monsterAPI";
import {updateFight, updateWS} from "../../api/Game/ws/gameWS";
import playersAPI from "../../api/Game/playersAPI";
import inventoryAPI from "../../api/Game/inventoryAPI";
import eventsAPI from "../../api/Game/eventsAPI";

const SET_MONSTER = 'SET-MONSTER'
const SET_EFFECT = 'SET-EFFECT'
const SET_QUEUE = 'SET-QUEUE'

export interface MonsterInitialState {
    id: number
    name: string
    description: string
    trophy: string
    level: number
    healPoint: number
    damage: number
    damageModifier: number
    defense: number
    trophyPrice: number
    firstMove: boolean
    paralysis: number
    regeneration: number
    numberOfAttacks: number
    monsterSet: boolean
    fightEffect: FightEffect
    fightQueue: FightQueue[]
}

interface FightEffect {
    id: number
    eventId: number
    monsterMaxAttack: boolean
    noEscape: boolean
    noStimulator: boolean
}

interface FightQueue {
    id: number
    member: "monster" | "player"
    active: boolean
    attack: boolean
}

let initialState: MonsterInitialState = {
    id: 0,
    name: "Монстр",
    description: "Описание",
    trophy: "Трофей",
    level: 0,
    healPoint: 0,
    damage: 0,
    damageModifier: 0,
    defense: 0,
    trophyPrice: 0,
    firstMove: false,
    paralysis: 0,
    regeneration: 0,
    numberOfAttacks: 0,
    monsterSet: false,
    fightEffect: {
        id: 0,
        eventId: 0,
        monsterMaxAttack: false,
        noEscape: false,
        noStimulator: false,
    },
    fightQueue: [],
}

type ActionsType = SetMonsterType | SetFightEffectType | SetFightQueueType

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

const monsterReducer = (state = initialState, action: ActionsType) => {

    switch (action.type) {
        case SET_MONSTER:
            return {
                ...state,
                ...action.monster,
                monsterSet: true,
            }
        case SET_EFFECT:
            return {
                ...state,
                fightEffect: {...action.effect},
            }
        case SET_QUEUE:
            return {
                ...state,
                fightQueue: {...action.queue},
            }

        default:
            return state;
    }
}

type SetMonsterType = {
    type: typeof SET_MONSTER
    monster: any
}

export const setMonster = (monster: any): SetMonsterType => (
    {
        type: SET_MONSTER,
        monster
    }
)

type SetFightEffectType = {
    type: typeof SET_EFFECT
    effect: any
}

export const setFightEffect = (effect: any): SetFightEffectType => (
    {
        type: SET_EFFECT,
        effect
    }
)

type SetFightQueueType = {
    type: typeof SET_QUEUE
    queue: any
}

export const setFightQueue = (queue: any): SetFightQueueType => (
    {
        type: SET_QUEUE,
        queue
    }
)

export type FightType = (playerId: number) => void

export const startFight = (level: number, playerId: number, eventId: number, type: "eventFight" | "locationFight"): ThunkType => {

    return (async () => {
        const responseSet = await monsterAPI.setMonster(level, type === "eventFight" ? eventId : 0)
        if (responseSet.resultCode === 0 || 1) {
            const responseStart = await monsterAPI.startFight(playerId)
            if (responseStart.resultCode === 0) {
                updateFight()
                updateWS()
            }
        }
    })
}

export const playerAttack = (playerId: number, grenadeId: number, isWeapon: boolean): ThunkType => {

    return (async () => {
        const responseSet = await eventsAPI.eventRoll(playerId)
        if (responseSet.resultCode === 0) {
            const responseStart = isWeapon ? await monsterAPI.playerAttack(playerId) : await inventoryAPI.useGrenade(playerId, grenadeId)
            if (responseStart.resultCode === 0) {
                updateFight()
                updateWS()
            }
        }
    })
}

export const monsterAttack = (playerId: number): ThunkType => {

    return (async () => {
        const responseSet = await eventsAPI.eventRoll(playerId)
        if (responseSet.resultCode === 0) {
            const responseStart = await monsterAPI.monsterAttack(playerId)
            if (responseStart.resultCode === 0) {
                updateFight()
                updateWS()
            }
        }
    })
}

export const nextMember = (playerId: number): ThunkType => {

    return (async () => {
        const responseSet = await monsterAPI.nextMember(playerId)
        if (responseSet.resultCode === 0) {
            updateFight()
            updateWS()
        }
    })
}

export const endFight = (playerId: number, monsterLevel: number): ThunkType => {

    return (async () => {
        const responseSet = await monsterAPI.endFight(playerId)
        if (responseSet.resultCode === 0) {
            updateFight()
            updateWS()
            if (monsterLevel === 3) {
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

export const playerDied = (playerId: number): ThunkType => {

    return (async () => {
        const responseSet = await monsterAPI.playerDied(playerId)
        if (responseSet.resultCode === 0) {
            updateFight()
            updateWS()
        }
    })
}

export const escapeFromFight = (playerId: number, rep: number): ThunkType => {

    return (async () => {
        const responseSet = await eventsAPI.eventRoll(playerId)
        if (responseSet.resultCode === 0) {
            const responseStart = await monsterAPI.escapeFromFight(playerId, rep)
            if (responseStart.resultCode === 0) {
                updateFight()
                updateWS()
            }
            if (responseStart.resultCode === 1) {
                const responseEscape = await monsterAPI.nextMember(playerId)
                if (responseEscape.resultCode === 0) {
                    updateFight()
                    updateWS()
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

export default monsterReducer
