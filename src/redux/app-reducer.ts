import {getAuth} from "./auth-reducer";
import {ThunkDispatch} from "redux-thunk";
import {EmptyObject} from "redux";
import {AppStateType} from "./redux-store";

const INIT_SUCCESS = 'INIT-SUCCESS'

interface IInitialState {
    initialized: boolean
}

let initialState: IInitialState = {
    initialized: false,
};

type ActionsType = InitializedType

const appReducer = (state = initialState, action: ActionsType) => {

    switch (action.type) {
        case INIT_SUCCESS:
            return {
                ...state,
                initialized: action.initialized,
            }

        default:
            return state;
    }
}

type InitializedType = {
    type: typeof INIT_SUCCESS
    initialized: boolean
}

export const initialized = (initialized: boolean): InitializedType => ({
    type: INIT_SUCCESS,
    initialized: initialized,
});



export const initialize = () => {
    return ((dispatch: ThunkDispatch<EmptyObject & AppStateType, unknown, ActionsType>) => {
        dispatch(getAuth()).then(() => dispatch(initialized(true)));
    });
}

export default appReducer;