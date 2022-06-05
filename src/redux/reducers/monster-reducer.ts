import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../redux-store";
import monsterAPI from "../../api/Game/monsterAPI";
import {getMonster, updateWS} from "../../api/Game/ws/gameWS";


const SET_MONSTER = 'SET-MONSTER'

interface MonsterState {

}

let initialState: MonsterState = {

}

type ActionsType = SetMonsterType

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

const monsterReducer = (state = initialState, action: ActionsType) => {

    switch (action.type) {
        case SET_MONSTER:
            return {
                ...state,
                initialized: action.monster,
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
        if (response.resultCode === 0) getMonster()
    })
}

export default monsterReducer
