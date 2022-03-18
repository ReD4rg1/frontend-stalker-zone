import authAPI from "../api/loginAPI"
import {ThunkAction} from "redux-thunk";
import { AppStateType } from "./redux-store";

const SET_USERS_DATA = 'SET-USERS-DATA'

interface IInitialState {
    userId: number |null
    name: string | null
    isAuth: boolean,
}

const initialState: IInitialState = {
    userId: null,
    name: null,
    isAuth: false,
}

type ActionsType = SetUsersDataType

const authReducer = (state = initialState, action: ActionsType): IInitialState => {

    switch (action.type) {
        case SET_USERS_DATA:
            return {
                ...state,
                ...action.payload,
            }

        default:
            return state;
    }
}

type SetUsersDataTypePayloadType = {
    userId: number,
    name: string,
    isAuth: boolean,
}
type SetUsersDataType = {
    type: typeof SET_USERS_DATA,
    payload: SetUsersDataTypePayloadType
}
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const setUsersData = (payload: SetUsersDataTypePayloadType): SetUsersDataType => ({
    type: SET_USERS_DATA,
    payload: {
        userId: payload.userId,
        name: payload.name,
        isAuth: payload.isAuth,
    },
})

export const getAuth = (): ThunkType => {
    return (async (dispatch) => {
        let response = await authAPI.getAuth()
        if (response.resultCode === 0) {
            let {userId, name} = response.data.data
            dispatch(setUsersData({userId, name, isAuth: true}));
        }
    });
}

type ValuesType = {
    name: string
    password: string
    rememberMe: boolean
}
type SetStatusObjectType = {
    messageEmail: string
    messagePassword: string
}
type LoginPropsType = {
    values: ValuesType,
    setStatus: (object: SetStatusObjectType) => void,
    resetForm: () => void,
    setSubmitting: (submitting: boolean) => void
}

export const signUp = (props: LoginPropsType): ThunkType => {

    return (async (dispatch) => {
        let response = await authAPI.signUp(props.values.name, props.values.password)
        if (response.resultCode === 0) {
            dispatch(getAuth());
            props.setSubmitting(false);
            props.resetForm();
        } else {
            props.setSubmitting(false);
            props.setStatus({
                messageEmail: response.messages[0],
                messagePassword: response.messages[1]
            });
        }
    });
}

export const login = (props: LoginPropsType): ThunkType => {

    return (async (dispatch) => {
        let response = await authAPI.login(props.values.name, props.values.password, props.values.rememberMe)
        if (response.resultCode === 0) {
            dispatch(getAuth());
            props.setSubmitting(false);
            props.resetForm();
        } else {
            props.setSubmitting(false);
            props.setStatus({
                messageEmail: response.messages[0],
                messagePassword: response.messages[1]
            });
        }
    });
}

export const logout = (): ThunkType => {

    return (async (dispatch) => {
        let response = await authAPI.logout()
        if (response.resultCode === 0) {
            dispatch(getAuth());
        }
    });
}

export default authReducer;