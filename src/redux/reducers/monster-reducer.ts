import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../redux-store";
import monsterAPI from "../../api/Game/monsterAPI";
import {getMonster} from "../../api/Game/ws/gameWS";


const SET_MONSTER = 'SET-MONSTER'

interface MonsterState {
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
}

let initialState: MonsterState = {
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
}

type ActionsType = SetMonsterType

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

const monsterReducer = (state = initialState, action: ActionsType) => {

    switch (action.type) {
        case SET_MONSTER:
            return {
                ...state,
                ...action.monster,
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

export const requestMonster = (level: number): ThunkType => {

    return (async () => {
        const response = await monsterAPI.setMonster(level)
        if (response.resultCode === 0 || 1) getMonster()
    })
}

export default monsterReducer
